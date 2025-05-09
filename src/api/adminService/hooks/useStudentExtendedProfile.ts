
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Hook to fetch student extended profile with day-specific timings
export const useStudentExtendedProfile = (userId?: string) => {
  return useQuery({
    queryKey: ["studentExtendedProfile", userId],
    queryFn: async () => {
      if (!userId) {
        return null;
      }

      try {
        const { data, error } = await supabase
          .from("student_profiles")
          .select("*")
          .eq("user_id", userId)
          .maybeSingle();

        if (error) {
          throw new Error(error.message);
        }

        return data;
      } catch (error) {
        console.error("Error fetching student extended profile:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to load student extended profile");
      }
    },
    enabled: !!userId
  });
};

// Also export as default
export default useStudentExtendedProfile;
