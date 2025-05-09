
-- Function to count profiles by role
CREATE OR REPLACE FUNCTION public.count_profiles_by_role()
RETURNS TABLE(role TEXT, count BIGINT)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT role, COUNT(*) as count
  FROM profiles
  GROUP BY role;
$$;
