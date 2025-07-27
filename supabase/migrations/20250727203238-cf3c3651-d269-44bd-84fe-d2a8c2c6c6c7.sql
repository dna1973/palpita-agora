-- Critical Security Migration: Enable RLS and Implement Proper Authentication

-- Step 1: Enable Row Level Security on all tables
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poll_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_bets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_poll_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Step 2: Create user roles enum for proper authorization
CREATE TYPE public.user_role AS ENUM ('admin', 'participant');

-- Step 3: Create profiles table to replace custom users table (linked to Supabase Auth)
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'participant',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Step 4: Create security definer functions to prevent RLS recursion
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
  SELECT public.get_current_user_role() = 'admin';
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Step 5: Create comprehensive RLS policies

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin());

-- Pools policies
CREATE POLICY "Anyone can view active pools" ON public.pools
  FOR SELECT USING (status = 'open');

CREATE POLICY "Admins can manage pools" ON public.pools
  FOR ALL USING (public.is_admin());

-- Matches policies  
CREATE POLICY "Anyone can view matches in accessible pools" ON public.matches
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.pools 
      WHERE pools.id = matches.pool_id 
      AND pools.status = 'open'
    )
  );

CREATE POLICY "Admins can manage matches" ON public.matches
  FOR ALL USING (public.is_admin());

-- User bets policies
CREATE POLICY "Users can view their own bets" ON public.user_bets
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.id::text = user_bets.user_id::text
    )
  );

CREATE POLICY "Users can create their own bets" ON public.user_bets
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.id::text = user_bets.user_id::text
    )
    AND EXISTS (
      SELECT 1 FROM public.matches 
      WHERE matches.id = user_bets.match_id 
      AND matches.match_date > now()
    )
  );

CREATE POLICY "Users can update their own bets before match starts" ON public.user_bets
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.id::text = user_bets.user_id::text
    )
    AND EXISTS (
      SELECT 1 FROM public.matches 
      WHERE matches.id = user_bets.match_id 
      AND matches.match_date > now()
    )
  );

CREATE POLICY "Admins can view all bets" ON public.user_bets
  FOR SELECT USING (public.is_admin());

-- Polls policies
CREATE POLICY "Anyone can view active polls" ON public.polls
  FOR SELECT USING (
    status = 'open' 
    AND start_date <= now() 
    AND end_date > now()
  );

CREATE POLICY "Admins can manage polls" ON public.polls
  FOR ALL USING (public.is_admin());

-- Poll options policies
CREATE POLICY "Anyone can view options for accessible polls" ON public.poll_options
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.polls 
      WHERE polls.id = poll_options.poll_id 
      AND polls.status = 'open'
      AND polls.start_date <= now() 
      AND polls.end_date > now()
    )
  );

CREATE POLICY "Admins can manage poll options" ON public.poll_options
  FOR ALL USING (public.is_admin());

-- User poll votes policies
CREATE POLICY "Users can view their own votes" ON public.user_poll_votes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.id::text = user_poll_votes.user_id::text
    )
  );

CREATE POLICY "Users can create their own votes" ON public.user_poll_votes
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.id::text = user_poll_votes.user_id::text
    )
    AND EXISTS (
      SELECT 1 FROM public.polls 
      WHERE polls.id = user_poll_votes.poll_id 
      AND polls.status = 'open'
      AND polls.start_date <= now() 
      AND polls.end_date > now()
    )
  );

CREATE POLICY "Admins can view all votes" ON public.user_poll_votes
  FOR SELECT USING (public.is_admin());

-- Legacy users table policies (restrict access - should be migrated to profiles)
CREATE POLICY "Block access to legacy users table" ON public.users
  FOR ALL USING (false);

-- Step 6: Create trigger for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, email, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    new.email,
    COALESCE((new.raw_user_meta_data->>'role')::user_role, 'participant')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Step 7: Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add timestamp triggers to profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();