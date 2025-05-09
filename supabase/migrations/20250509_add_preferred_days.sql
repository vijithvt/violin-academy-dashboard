
-- Add preferred_days to the student_profiles table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'student_profiles'
      AND column_name = 'preferred_days'
  ) THEN
    ALTER TABLE public.student_profiles 
    ADD COLUMN preferred_days TEXT[] DEFAULT '{}'::TEXT[];
  END IF;
END
$$;
