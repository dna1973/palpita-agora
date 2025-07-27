-- Security Migration - Step 2: Fix existing enum and complete security setup

-- Check if profiles table exists, if not create it
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'profiles') THEN
        CREATE TABLE public.profiles (
          id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
          username text UNIQUE NOT NULL,
          email text UNIQUE NOT NULL,
          role user_role NOT NULL DEFAULT 'participant',
          created_at timestamptz NOT NULL DEFAULT now(),
          updated_at timestamptz NOT NULL DEFAULT now()
        );
        ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Create security definer functions to prevent RLS recursion
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
  SELECT public.get_current_user_role() = 'admin';
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin());

-- Drop and recreate pools policies
DROP POLICY IF EXISTS "Anyone can view active pools" ON public.pools;
DROP POLICY IF EXISTS "Admins can manage pools" ON public.pools;

CREATE POLICY "Anyone can view active pools" ON public.pools
  FOR SELECT USING (status = 'open');

CREATE POLICY "Admins can manage pools" ON public.pools
  FOR ALL USING (public.is_admin());

-- Drop and recreate matches policies
DROP POLICY IF EXISTS "Anyone can view matches in accessible pools" ON public.matches;
DROP POLICY IF EXISTS "Admins can manage matches" ON public.matches;

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

-- Create user auth trigger if it doesn't exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

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

-- Block access to legacy users table completely
DROP POLICY IF EXISTS "Block access to legacy users table" ON public.users;
CREATE POLICY "Block access to legacy users table" ON public.users
  FOR ALL USING (false);