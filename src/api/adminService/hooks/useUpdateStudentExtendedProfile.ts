
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Hook to update student extended profile
export const useUpdateStudentExtendedProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      userId, 
      updates 
    }: { 
      userId: string; 
      updates: Record<string, any> 
    }) => {
      const { data, error } = await supabase
        .from("student_profiles")
        .update(updates)
        .eq("user_id", userId)
        .select();
        
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["studentExtendedProfile", variables.userId] });
    }
  });
};

export default useUpdateStudentExtendedProfile;
