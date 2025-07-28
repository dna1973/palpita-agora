-- Complete Database Model Migration
-- This migration completes the database model for the betting pools system

-- Step 1: Create missing enums
CREATE TYPE public.pool_status AS ENUM ('draft', 'open', 'active', 'finished');
CREATE TYPE public.match_status AS ENUM ('scheduled', 'live', 'finished', 'cancelled');
CREATE TYPE public.poll_status AS ENUM ('draft', 'open', 'closed');
CREATE TYPE public.notification_type AS ENUM ('bet_reminder', 'result_update', 'pool_invite', 'ranking_change');
CREATE TYPE public.activity_type AS ENUM ('bet_placed', 'pool_joined', 'poll_voted', 'ranking_improved');

-- Step 2: Add missing fields to existing tables

-- Add fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS avatar_url text,
ADD COLUMN IF NOT EXISTS total_points integer DEFAULT 0;

-- Update pools table structure
ALTER TABLE public.pools 
ADD COLUMN IF NOT EXISTS creator_id uuid REFERENCES public.profiles(id),
ADD COLUMN IF NOT EXISTS max_participants integer,
ADD COLUMN IF NOT EXISTS prize_amount decimal(10,2),
ADD COLUMN IF NOT EXISTS invite_code text UNIQUE,
ADD COLUMN IF NOT EXISTS scoring_rules jsonb DEFAULT '{"exact_score": 3, "correct_winner": 1, "correct_draw": 1}',
ADD COLUMN IF NOT EXISTS start_date timestamptz,
ADD COLUMN IF NOT EXISTS end_date timestamptz;

-- Update the status column type if it exists
DO $$ 
BEGIN
    -- Check if status column exists and update its type
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'pools' AND column_name = 'status') THEN
        ALTER TABLE public.pools ALTER COLUMN status TYPE pool_status USING status::text::pool_status;
    ELSE
        ALTER TABLE public.pools ADD COLUMN status pool_status DEFAULT 'draft';
    END IF;
END $$;

-- Update matches table
ALTER TABLE public.matches 
ADD COLUMN IF NOT EXISTS home_score integer,
ADD COLUMN IF NOT EXISTS away_score integer;

-- Update the status column type for matches
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'matches' AND column_name = 'status') THEN
        ALTER TABLE public.matches ALTER COLUMN status TYPE match_status USING status::text::match_status;
    ELSE
        ALTER TABLE public.matches ADD COLUMN status match_status DEFAULT 'scheduled';
    END IF;
END $$;

-- Update polls table
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'polls' AND column_name = 'status') THEN
        ALTER TABLE public.polls ALTER COLUMN status TYPE poll_status USING status::text::poll_status;
    ELSE
        ALTER TABLE public.polls ADD COLUMN status poll_status DEFAULT 'draft';
    END IF;
END $$;

-- Update user_bets table
ALTER TABLE public.user_bets 
ADD COLUMN IF NOT EXISTS points_earned integer DEFAULT 0;

-- Step 3: Create new tables

-- Pool participants table
CREATE TABLE IF NOT EXISTS public.pool_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pool_id uuid NOT NULL REFERENCES public.pools(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  joined_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(pool_id, user_id)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type notification_type NOT NULL,
  read boolean DEFAULT false,
  data jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Activities table
CREATE TABLE IF NOT EXISTS public.activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type activity_type NOT NULL,
  description text NOT NULL,
  data jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Step 4: Enable RLS on new tables
ALTER TABLE public.pool_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS policies for new tables

-- Pool participants policies
CREATE POLICY "Users can view participants of pools they're in" ON public.pool_participants
  FOR SELECT USING (
    pool_id IN (
      SELECT pool_id FROM public.pool_participants WHERE user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM public.pools WHERE pools.id = pool_participants.pool_id AND pools.creator_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM public.pools WHERE pools.id = pool_participants.pool_id AND pools.status = 'open'
    )
  );

CREATE POLICY "Users can join pools" ON public.pool_participants
  FOR INSERT WITH CHECK (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.pools 
      WHERE pools.id = pool_participants.pool_id 
      AND (pools.status = 'open' OR pools.status = 'draft')
    )
  );

CREATE POLICY "Users can leave pools they joined" ON public.pool_participants
  FOR DELETE USING (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.pools 
      WHERE pools.id = pool_participants.pool_id 
      AND pools.status IN ('draft', 'open')
    )
  );

CREATE POLICY "Pool creators can manage participants" ON public.pool_participants
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.pools 
      WHERE pools.id = pool_participants.pool_id 
      AND pools.creator_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all participants" ON public.pool_participants
  FOR ALL USING (public.is_admin());

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "System can create notifications" ON public.notifications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage all notifications" ON public.notifications
  FOR ALL USING (public.is_admin());

-- Activities policies
CREATE POLICY "Users can view their own activities" ON public.activities
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can view activities of pools they participate in" ON public.activities
  FOR SELECT USING (
    type IN ('pool_joined', 'bet_placed', 'ranking_improved')
    AND EXISTS (
      SELECT 1 FROM public.pool_participants 
      WHERE pool_participants.user_id = auth.uid()
      AND (
        activities.data->>'pool_id' IS NULL 
        OR activities.data->>'pool_id' = pool_participants.pool_id::text
      )
    )
  );

CREATE POLICY "System can create activities" ON public.activities
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage all activities" ON public.activities
  FOR ALL USING (public.is_admin());

-- Step 6: Update existing RLS policies for enhanced functionality

-- Enhanced pools policies
DROP POLICY IF EXISTS "Anyone can view active pools" ON public.pools;
DROP POLICY IF EXISTS "Admins can manage pools" ON public.pools;

CREATE POLICY "Users can view public pools and their own pools" ON public.pools
  FOR SELECT USING (
    status = 'open' 
    OR creator_id = auth.uid()
    OR id IN (
      SELECT pool_id FROM public.pool_participants WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create pools" ON public.pools
  FOR INSERT WITH CHECK (creator_id = auth.uid());

CREATE POLICY "Pool creators can update their pools" ON public.pools
  FOR UPDATE USING (creator_id = auth.uid());

CREATE POLICY "Pool creators can delete their draft pools" ON public.pools
  FOR DELETE USING (creator_id = auth.uid() AND status = 'draft');

CREATE POLICY "Admins can manage all pools" ON public.pools
  FOR ALL USING (public.is_admin());

-- Enhanced matches policies
DROP POLICY IF EXISTS "Anyone can view matches in accessible pools" ON public.matches;
DROP POLICY IF EXISTS "Admins can manage matches" ON public.matches;

CREATE POLICY "Users can view matches of accessible pools" ON public.matches
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.pools 
      WHERE pools.id = matches.pool_id 
      AND (
        pools.status = 'open' 
        OR pools.creator_id = auth.uid()
        OR pools.id IN (
          SELECT pool_id FROM public.pool_participants WHERE user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Pool creators can manage matches in their pools" ON public.matches
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.pools 
      WHERE pools.id = matches.pool_id 
      AND pools.creator_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all matches" ON public.matches
  FOR ALL USING (public.is_admin());

-- Step 7: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pool_participants_pool_id ON public.pool_participants(pool_id);
CREATE INDEX IF NOT EXISTS idx_pool_participants_user_id ON public.pool_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(user_id, read);
CREATE INDEX IF NOT EXISTS idx_activities_user_id ON public.activities(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_type ON public.activities(type);
CREATE INDEX IF NOT EXISTS idx_pools_status ON public.pools(status);
CREATE INDEX IF NOT EXISTS idx_pools_creator_id ON public.pools(creator_id);
CREATE INDEX IF NOT EXISTS idx_matches_pool_id ON public.matches(pool_id);
CREATE INDEX IF NOT EXISTS idx_matches_status ON public.matches(status);
CREATE INDEX IF NOT EXISTS idx_matches_date ON public.matches(match_date);
CREATE INDEX IF NOT EXISTS idx_user_bets_user_id ON public.user_bets(user_id);
CREATE INDEX IF NOT EXISTS idx_user_bets_match_id ON public.user_bets(match_id);

-- Step 8: Create functions for common operations

-- Function to generate unique invite codes
CREATE OR REPLACE FUNCTION public.generate_invite_code()
RETURNS text AS $$
DECLARE
  code text;
  exists boolean;
BEGIN
  LOOP
    -- Generate a random 8-character code
    code := upper(substring(md5(random()::text) from 1 for 8));
    
    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM public.pools WHERE invite_code = code) INTO exists;
    
    -- If code doesn't exist, return it
    IF NOT exists THEN
      RETURN code;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate user points
CREATE OR REPLACE FUNCTION public.calculate_user_total_points(user_uuid uuid)
RETURNS integer AS $$
DECLARE
  total_points integer;
BEGIN
  SELECT COALESCE(SUM(points_earned), 0) 
  INTO total_points
  FROM public.user_bets 
  WHERE user_id = user_uuid;
  
  RETURN total_points;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update user total points
CREATE OR REPLACE FUNCTION public.update_user_total_points()
RETURNS trigger AS $$
BEGIN
  -- Update total points for the user
  UPDATE public.profiles 
  SET total_points = public.calculate_user_total_points(NEW.user_id)
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically update user total points when bets are updated
DROP TRIGGER IF EXISTS update_user_points_trigger ON public.user_bets;
CREATE TRIGGER update_user_points_trigger
  AFTER INSERT OR UPDATE OF points_earned ON public.user_bets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_user_total_points();

-- Function to automatically set invite code on pool creation
CREATE OR REPLACE FUNCTION public.set_pool_invite_code()
RETURNS trigger AS $$
BEGIN
  -- Only set invite code if it's not already set
  IF NEW.invite_code IS NULL THEN
    NEW.invite_code := public.generate_invite_code();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically set invite code
DROP TRIGGER IF EXISTS set_invite_code_trigger ON public.pools;
CREATE TRIGGER set_invite_code_trigger
  BEFORE INSERT ON public.pools
  FOR EACH ROW
  EXECUTE FUNCTION public.set_pool_invite_code();

-- Step 9: Add updated_at triggers to new tables
CREATE TRIGGER update_pool_participants_updated_at
  BEFORE UPDATE ON public.pool_participants
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add updated_at column and trigger to pools if not exists
ALTER TABLE public.pools ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();
CREATE TRIGGER update_pools_updated_at
  BEFORE UPDATE ON public.pools
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add updated_at column and trigger to matches if not exists  
ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();
CREATE TRIGGER update_matches_updated_at
  BEFORE UPDATE ON public.matches
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add updated_at column and trigger to user_bets if not exists
ALTER TABLE public.user_bets ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();
CREATE TRIGGER update_user_bets_updated_at
  BEFORE UPDATE ON public.user_bets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add updated_at column and trigger to polls if not exists
ALTER TABLE public.polls ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();
CREATE TRIGGER update_polls_updated_at_table
  BEFORE UPDATE ON public.polls
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();