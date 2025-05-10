
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface RoleCount {
  role: string;
  count: number;
}

interface DashboardStats {
  studentCount: number;
  teacherCount: number;
  adminCount: number;
  totalUsers: number;
  trialRequestsCount: number;
  roles: RoleCount[];
}

// Hook to fetch dashboard statistics
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      // Get profile counts by role using the database function
      const { data: roleCounts, error: roleError } = await supabase
        .rpc('count_profiles_by_role');
        
      if (roleError) {
        throw new Error(roleError.message);
      }
      
      // Get trial requests count
      const { count: trialCount, error: trialError } = await supabase
        .from('free_trial_requests')
        .select('*', { count: 'exact', head: true });
        
      if (trialError) {
        throw new Error(trialError.message);
      }
      
      // Process and return the data
      const studentCount = roleCounts.find(r => r.role === 'student')?.count || 0;
      const teacherCount = roleCounts.find(r => r.role === 'teacher')?.count || 0;
      const adminCount = roleCounts.find(r => r.role === 'admin')?.count || 0;
      
      return {
        studentCount,
        teacherCount,
        adminCount,
        totalUsers: studentCount + teacherCount + adminCount,
        trialRequestsCount: trialCount || 0,
        roles: roleCounts
      } as DashboardStats;
    }
  });
};

export default useDashboardStats;
