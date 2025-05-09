
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UseTotalStudentPointsResult {
  data: number;
  loading: boolean;
  error: Error | null;
}

/**
 * Custom hook to fetch the total points for a specific student
 * 
 * @param userId The ID of the student to fetch points for
 * @returns Object containing the total points, loading state and any error
 */
export const useTotalStudentPoints = (userId?: string): UseTotalStudentPointsResult => {
  const [data, setData] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If no user ID is provided, return early with 0 points
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchTotalPoints() {
      try {
        setLoading(true);
        // Use the Supabase RPC function to get total points
        const { data, error } = await supabase
          .rpc('get_total_points', { user_id_param: userId });

        if (error) {
          throw new Error(error.message);
        }

        // Set the total points (data will be a number)
        setData(data || 0);
      } catch (err) {
        console.error("Error fetching total student points:", err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    }

    fetchTotalPoints();
  }, [userId]);

  return { data, loading, error };
};

export default useTotalStudentPoints;
