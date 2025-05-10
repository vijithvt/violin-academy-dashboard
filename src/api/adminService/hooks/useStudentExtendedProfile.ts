
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Interface for extended student profile data
export interface StudentExtendedProfile {
  id: string;
  name: string;
  email?: string;
  role: string;
  created_at: string;
  // Additional fields from student_profiles table
  parent_name?: string;
  mobile_number?: string;
  address?: string;
  preferred_course?: string;
  learning_level?: string;
  photo_url?: string;
}

// Hook to fetch a student's extended profile by ID
export const useStudentExtendedProfile = (id: string) => {
  return useQuery({
    queryKey: ["studentExtendedProfile", id],
    queryFn: async () => {
      // First get the basic profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
        
      if (profileError) {
        throw new Error(profileError.message);
      }
      
      // Then get the extended profile data
      const { data: extendedData, error: extendedError } = await supabase
        .from("student_profiles")
        .select("*")
        .eq("user_id", id)
        .maybeSingle();
        
      if (extendedError) {
        throw new Error(extendedError.message);
      }
      
      // Get the user email from auth
      const { data: userData, error: userError } = await supabase
        .from("auth")
        .select("email")
        .eq("id", id)
        .maybeSingle();
        
      if (userError && userError.code !== 'PGRST116') { // Ignore not found errors
        throw new Error(userError.message);
      }
      
      // Combine the data
      return {
        ...profile,
        ...(extendedData || {}),
        email: userData?.email
      } as StudentExtendedProfile;
    },
    enabled: !!id
  });
};

export default useStudentExtendedProfile;
