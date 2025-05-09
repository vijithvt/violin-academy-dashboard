
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook to fetch the total points for a specific student
 * 
 * @param userId The ID of the student to fetch points for
 * @returns Object containing the total points, loading state and any error
 */
const useTotalStudentPoints = (userId?: string) => {
  return useQuery({
    queryKey: ["totalPoints", userId],
    queryFn: async () => {
      if (!userId) return 0;

      const { data, error } = await supabase
        .rpc("get_total_points", { user_id_param: userId });

      if (error) {
        throw new Error(error.message);
      }

      return data as number;
    },
    enabled: !!userId
  });
};

export default useTotalStudentPoints;
