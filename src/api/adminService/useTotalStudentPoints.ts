
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useTotalStudentPoints = (userId?: string) => {
  const [points, setPoints] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTotalPoints = async () => {
      if (!userId) {
        setPoints(0);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Using the RPC function get_total_points to calculate the sum
        const { data, error } = await supabase
          .rpc('get_total_points', { user_id_param: userId });

        if (error) {
          throw error;
        }

        setPoints(data || 0);
      } catch (err) {
        console.error('Error fetching total points:', err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchTotalPoints();
  }, [userId]);

  return {
    data: points,
    loading,
    error
  };
};
