-- Final Security Migration: Enable RLS on all tables and fix security functions

-- Enable RLS on all public tables
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poll_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_bets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_poll_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Fix security functions with proper search_path
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = '';

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
  SELECT public.get_current_user_role() = 'admin';
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = '';

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, email, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    new.email,
    COALESCE((new.raw_user_meta_data->>'role')::public.user_role, 'participant')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Complete all missing RLS policies for remaining tables

-- User bets policies
DROP POLICY IF EXISTS "Users can view their own bets" ON public.user_bets;
DROP POLICY IF EXISTS "Users can create their own bets" ON public.user_bets;
DROP POLICY IF EXISTS "Users can update their own bets before match starts" ON public.user_bets;
DROP POLICY IF EXISTS "Admins can view all bets" ON public.user_bets;

CREATE POLICY "Users can view their own bets" ON public.user_bets
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create their own bets" ON public.user_bets
  FOR INSERT WITH CHECK (
    auth.uid()::text = user_id::text
    AND EXISTS (
      SELECT 1 FROM public.matches 
      WHERE matches.id = user_bets.match_id 
      AND matches.match_date > now()
    )
  );

CREATE POLICY "Users can update their own bets before match starts" ON public.user_bets
  FOR UPDATE USING (
    auth.uid()::text = user_id::text
    AND EXISTS (
      SELECT 1 FROM public.matches 
      WHERE matches.id = user_bets.match_id 
      AND matches.match_date > now()
    )
  );

CREATE POLICY "Admins can view all bets" ON public.user_bets
  FOR SELECT USING (public.is_admin());

-- Polls policies
DROP POLICY IF EXISTS "Anyone can view active polls" ON public.polls;
DROP POLICY IF EXISTS "Admins can manage polls" ON public.polls;

CREATE POLICY "Anyone can view active polls" ON public.polls
  FOR SELECT USING (
    status = 'open' 
    AND start_date <= now() 
    AND end_date > now()
  );

CREATE POLICY "Admins can manage polls" ON public.polls
  FOR ALL USING (public.is_admin());

-- Poll options policies
DROP POLICY IF EXISTS "Anyone can view options for accessible polls" ON public.poll_options;
DROP POLICY IF EXISTS "Admins can manage poll options" ON public.poll_options;

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
DROP POLICY IF EXISTS "Users can view their own votes" ON public.user_poll_votes;
DROP POLICY IF EXISTS "Users can create their own votes" ON public.user_poll_votes;
DROP POLICY IF EXISTS "Admins can view all votes" ON public.user_poll_votes;

CREATE POLICY "Users can view their own votes" ON public.user_poll_votes
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create their own votes" ON public.user_poll_votes
  FOR INSERT WITH CHECK (
    auth.uid()::text = user_id::text
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