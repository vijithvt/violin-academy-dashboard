
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { StudentProfile } from "../types";

// Hook to fetch a single student profile by ID
export const useStudentProfile = (id: string) => {
  return useQuery({
    queryKey: ["studentProfile", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
        
      if (error) {
        throw new Error(error.message);
      }
      
      return data as StudentProfile;
    },
    enabled: !!id
  });
};

export default useStudentProfile;
