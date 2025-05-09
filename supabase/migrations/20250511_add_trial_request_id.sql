
-- Add trial_request_id column to student_profiles table
ALTER TABLE public.student_profiles
ADD COLUMN trial_request_id UUID REFERENCES public.free_trial_requests(id);
