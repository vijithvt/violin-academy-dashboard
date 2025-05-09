
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StudentProfile } from "../types";

// Hook to fetch all student profiles
export const useStudentProfiles = (roleFilter: string = "all") => {
  return useQuery({
    queryKey: ["studentProfiles", roleFilter],
    queryFn: async () => {
      try {
        let query = supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false });

        if (roleFilter !== "all") {
          query = query.eq("role", roleFilter);
        }

        const { data, error } = await query;

        if (error) {
          console.error("Supabase error:", error);
          throw new Error(`Error loading profiles: ${error.message}`);
        }

        if (!data) {
          throw new Error("No profiles data returned");
        }

        return data as StudentProfile[];
      } catch (error) {
        console.error("Error fetching student profiles:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to load student profiles");
      }
    },
    retry: 2,
    retryDelay: 1500
  });
};

export default useStudentProfiles;
