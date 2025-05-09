
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { StudentProfile } from "../types";

// Hook to fetch all student profiles with optional role filtering
export const useStudentProfiles = (roleFilter: string = "all") => {
  return useQuery({
    queryKey: ["studentProfiles", roleFilter],
    queryFn: async () => {
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
        throw new Error(error.message);
      }
      
      return data as StudentProfile[];
    }
  });
};

// Also export as default
export default useStudentProfiles;
