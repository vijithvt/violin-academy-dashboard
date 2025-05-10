
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { StudentExtendedProfile } from "./useStudentExtendedProfile";

// Hook to update a student's extended profile
export const useUpdateStudentExtendedProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      id, 
      updates 
    }: { 
      id: string; 
      updates: Partial<StudentExtendedProfile> 
    }) => {
      // First update the basic profile data
      const basicProfileData = {
        name: updates.name,
        role: updates.role
      };

      if (Object.keys(basicProfileData).length > 0) {
        const { error: profileError } = await supabase
          .from("profiles")
          .update(basicProfileData)
          .eq("id", id);
          
        if (profileError) {
          throw new Error(profileError.message);
        }
      }
      
      // Extract extended profile data
      const extendedProfileData = {
        parent_name: updates.parent_name,
        mobile_number: updates.mobile_number,
        address: updates.address,
        preferred_course: updates.preferred_course,
        learning_level: updates.learning_level,
        gender: updates.gender,
        date_of_birth: updates.date_of_birth,
        profession: updates.profession,
        preferred_timings: updates.preferred_timings,
        heard_from: updates.heard_from,
        day_specific_timings: updates.day_specific_timings,
        photo_url: updates.photo_url
      };

      // Check if this is an update to an existing student's extended profile or a new student
      const { data: existingProfile, error: checkError } = await supabase
        .from("student_profiles")
        .select("id")
        .eq("user_id", id)
        .maybeSingle();
      
      if (checkError) {
        throw new Error(checkError.message);
      }
      
      let result;
      
      if (existingProfile) {
        // Update existing profile
        const { data, error: updateError } = await supabase
          .from("student_profiles")
          .update(extendedProfileData)
          .eq("user_id", id)
          .select();
          
        if (updateError) {
          throw new Error(updateError.message);
        }
        
        result = data;
      } else {
        // Insert new profile
        const { data, error: insertError } = await supabase
          .from("student_profiles")
          .insert({ ...extendedProfileData, user_id: id })
          .select();
          
        if (insertError) {
          throw new Error(insertError.message);
        }
        
        result = data;
      }
      
      return result;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["studentExtendedProfile", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["studentProfiles"] });
    }
  });
};

// Also export as default
export default useUpdateStudentExtendedProfile;
