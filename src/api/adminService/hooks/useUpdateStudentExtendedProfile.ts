
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
      
      // Filter out any undefined values
      const filteredProfileUpdates = Object.fromEntries(
        Object.entries(profileUpdates).filter(([_, v]) => v !== undefined)
      );
      
      // Update the basic profile if there are changes
      if (Object.keys(filteredProfileUpdates).length > 0) {
        const { error: profileError } = await supabase
          .from("profiles")
          .update(filteredProfileUpdates)
          .eq("id", id);
          
        if (profileError) {
          throw new Error(profileError.message);
        }
      }
      
      // Prepare extended profile data that matches the schema
      const extendedUpdates: any = {
        parent_name: updates.parent_name,
        mobile_number: updates.mobile_number,
        address: updates.address,
        preferred_course: updates.preferred_course,
        learning_level: updates.learning_level,
        photo_url: updates.photo_url,
        gender: updates.gender,
        date_of_birth: updates.date_of_birth,
        profession: updates.profession,
        preferred_timings: updates.preferred_timings,
        heard_from: updates.heard_from,
        day_specific_timings: updates.day_specific_timings
      };
      
      // Filter out any undefined values
      const filteredExtendedUpdates = Object.fromEntries(
        Object.entries(extendedUpdates).filter(([_, v]) => v !== undefined)
      );
      
      // Only proceed with upsert if there are extended updates
      if (Object.keys(filteredExtendedUpdates).length > 0) {
        // Update or insert the extended profile
        const { error: extendedError } = await supabase
          .from("student_profiles")
          .upsert({
            user_id: id,
            ...filteredExtendedUpdates
          }, {
            onConflict: 'user_id'
          });
          
        if (extendedError) {
          throw new Error(extendedError.message);
        }
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
