
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Type for dashboard statistics
export interface DashboardStats {
  totalStudents: number;
  totalTrialRequests: number;
  newTrials: number;
  completedTrials: number;
  // Add more statistics as needed
}

// Hook to fetch dashboard statistics
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async (): Promise<DashboardStats> => {
      // Count total students (profiles with role 'student')
      const { data: students, error: studentsError } = await supabase
        .from("profiles")
        .select("id")
        .eq("role", "student");
      
      if (studentsError) {
        throw new Error(studentsError.message);
      }
      
      // Count total trial requests
      const { data: trials, error: trialsError } = await supabase
        .from("free_trial_requests")
        .select("id, status");
      
      if (trialsError) {
        throw new Error(trialsError.message);
      }
      
      // Count new trials (status = 'new')
      const newTrials = trials.filter(trial => trial.status === 'new').length;
      
      // Count completed trials (status = 'completed')
      const completedTrials = trials.filter(trial => trial.status === 'completed').length;
      
      return {
        totalStudents: students.length,
        totalTrialRequests: trials.length,
        newTrials,
        completedTrials,
      };
    },
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};

export default useDashboardStats;
