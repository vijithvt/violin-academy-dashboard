
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StudentExtendedProfile } from "./useStudentExtendedProfile";
import { Json } from "@/integrations/supabase/types";

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
      // Only include fields that are actually in the student_profiles table
      const extendedUpdates: Record<string, any> = {
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
        // For existing profiles, we need to check if the record exists first
        const { data: existingProfile } = await supabase
          .from('student_profiles')
          .select('id')
          .eq('user_id', id)
          .maybeSingle();

        if (existingProfile) {
          // Update existing profile
          const { error: updateError } = await supabase
            .from("student_profiles")
            .update(filteredExtendedUpdates)
            .eq("user_id", id);
            
          if (updateError) {
            throw new Error(updateError.message);
          }
        } else {
          // Insert new profile with all required fields
          // We need to ensure all required fields are present for new inserts
          const requiredFields = {
            address: "",
            date_of_birth: new Date().toISOString().split('T')[0],
            gender: "Other",
            heard_from: "Unknown",
            learning_level: "Beginner",
            mobile_number: "",
            parent_name: "",
            preferred_course: "",
            preferred_timings: [],
            profession: "",
            ...filteredExtendedUpdates,
            user_id: id
          };

          const { error: insertError } = await supabase
            .from("student_profiles")
            .insert(requiredFields);
            
          if (insertError) {
            throw new Error(insertError.message);
          }
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
