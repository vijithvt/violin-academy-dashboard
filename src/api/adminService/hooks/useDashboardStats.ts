
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Type for dashboard statistics
export interface DashboardStats {
  totalStudents: number;
  totalTrialRequests: number;
  newTrials: number;
  completedTrials: number;
  students: number;
  teachers: number;
  newRegistrations: number;
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
      
      // Count total teachers (profiles with role 'teacher')
      const { data: teachers, error: teachersError } = await supabase
        .from("profiles")
        .select("id")
        .eq("role", "teacher");
      
      if (teachersError) {
        throw new Error(teachersError.message);
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
      
      // Get new registrations this month
      const currentDate = new Date();
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString();
      
      const { data: newRegistrations, error: newRegistrationsError } = await supabase
        .from("profiles")
        .select("id")
        .gte("created_at", firstDayOfMonth);
      
      if (newRegistrationsError) {
        throw new Error(newRegistrationsError.message);
      }
      
      return {
        totalStudents: students.length,
        totalTrialRequests: trials.length,
        newTrials,
        completedTrials,
        students: students.length,
        teachers: teachers.length,
        newRegistrations: newRegistrations.length,
      };
    },
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};

export default useDashboardStats;
