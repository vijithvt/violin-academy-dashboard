
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StudentExtendedProfile } from "./useStudentExtendedProfile";

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
      // Separate updates for profiles table
      const profileUpdates = {
        name: updates.name,
        role: updates.role,
      };
      
      // Separate updates for student_profiles table
      const extendedUpdates = {
        parent_name: updates.parent_name,
        mobile_number: updates.mobile_number,
        address: updates.address,
        preferred_course: updates.preferred_course,
        learning_level: updates.learning_level,
        photo_url: updates.photo_url,
      };
      
      // Update the basic profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update(profileUpdates)
        .eq("id", id);
        
      if (profileError) {
        throw new Error(profileError.message);
      }
      
      // Update or insert the extended profile
      const { error: extendedError } = await supabase
        .from("student_profiles")
        .upsert({
          user_id: id,
          ...extendedUpdates
        }, {
          onConflict: 'user_id'
        });
        
      if (extendedError) {
        throw new Error(extendedError.message);
      }
      
      return { id, ...updates };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["studentExtendedProfile", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["studentProfiles"] });
    }
  });
};

export default useUpdateStudentExtendedProfile;
