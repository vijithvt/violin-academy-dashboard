
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface DashboardStats {
  students: number;
  teachers: number;
  newRegistrations: number;
  newTrials: number;
}

// Hook to fetch dashboard statistics
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async (): Promise<DashboardStats> => {
      try {
        // Get profiles count by role
        const { data: roleData, error: roleError } = await supabase.rpc('count_profiles_by_role');
        
        if (roleError) throw new Error(roleError.message);
        
        // Get new registrations this month
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        
        const { count: newRegistrations, error: regError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', startOfMonth.toISOString());
        
        if (regError) throw new Error(regError.message);
        
        // Get new trial requests this month
        const { count: newTrials, error: trialError } = await supabase
          .from('free_trial_requests')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', startOfMonth.toISOString());
        
        if (trialError) throw new Error(trialError.message);
        
        // Get counts by role
        const studentCount = roleData.find(r => r.role === 'student')?.count || 0;
        const teacherCount = roleData.find(r => r.role === 'teacher')?.count || 0;
        
        return {
          students: Number(studentCount),
          teachers: Number(teacherCount),
          newRegistrations: Number(newRegistrations || 0),
          newTrials: Number(newTrials || 0),
        };
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        throw error;
      }
    }
  });
};

// Also export as default
export default useDashboardStats;
