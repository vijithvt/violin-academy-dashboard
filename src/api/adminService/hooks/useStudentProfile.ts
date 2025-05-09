
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StudentProfile } from "../types";

// Hook to fetch a single student profile
export const useStudentProfile = (id?: string) => {
  return useQuery({
    queryKey: ["studentProfile", id],
    queryFn: async () => {
      if (!id) {
        return null;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (error) {
          throw new Error(error.message);
        }

        return data as StudentProfile;
      } catch (error) {
        console.error("Error fetching student profile:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to load student profile");
      }
    },
    enabled: !!id
  });
};

export default useStudentProfile;
