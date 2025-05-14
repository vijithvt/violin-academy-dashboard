
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { StudentProfile } from "../types";

/**
 * Hook to fetch student profiles with optional role filtering
 * @param roleFilter - Filter profiles by role (default: "all")
 * @returns Query object with student profiles data
 */
export const useStudentProfiles = (roleFilter: string = "all") => {
  return useQuery({
    queryKey: ["studentProfiles", roleFilter],
    queryFn: async () => {
      try {
        let query = supabase
          .from("profiles")
          .select("*");
        
        // Apply role filter if not "all"
        if (roleFilter && roleFilter !== "all") {
          query = query.eq("role", roleFilter);
        }
        
        // Order by name
        query = query.order("name", { ascending: true });
        
        const { data, error } = await query;
        
        if (error) {
          console.error("Error fetching student profiles:", error);
          throw new Error(error.message);
        }
        
        if (!data) {
          return [] as StudentProfile[];
        }
        
        return data as StudentProfile[];
      } catch (error: any) {
        console.error("Exception in useStudentProfiles:", error);
        throw new Error(error.message || "Failed to fetch student profiles");
      }
    },
    retry: 1,
    staleTime: 30000, // 30 seconds cache
  });
};

// Also export as default
export default useStudentProfiles;
