
-- Add trial_request_id column to student_profiles table if it doesn't exist already
ALTER TABLE public.student_profiles 
ADD COLUMN IF NOT EXISTS trial_request_id UUID REFERENCES public.free_trial_requests(id);

-- Add an index on trial_request_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_student_profiles_trial_request_id 
ON public.student_profiles(trial_request_id);
