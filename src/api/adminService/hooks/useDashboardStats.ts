
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Hook to get dashboard statistics
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      try {
        // Get counts by role
        const { data: roleData, error: roleError } = await supabase
          .rpc('count_profiles_by_role');
          
        if (roleError) throw new Error(roleError.message);
        
        // Get new registrations this month
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        
        const { count: newRegistrations, error: newRegError } = await supabase
          .from("profiles")
          .select("*", { count: "exact" })
          .gte("created_at", startOfMonth.toISOString());
          
        if (newRegError) throw new Error(newRegError.message);
        
        // Get trial requests this month
        const { count: newTrials, error: trialsError } = await supabase
          .from("free_trial_requests")
          .select("*", { count: "exact" })
          .gte("created_at", startOfMonth.toISOString());
          
        if (trialsError) throw new Error(trialsError.message);
        
        // Format the data
        const roleCounts = roleData && Array.isArray(roleData) ? roleData.reduce((acc: Record<string, number>, item: any) => {
          if (item && item.role && item.count) {
            acc[item.role.toLowerCase()] = Number(item.count);
          }
          return acc;
        }, {} as Record<string, number>) : {};
        
        return {
          students: roleCounts.student || 0,
          teachers: roleCounts.teacher || 0,
          admins: roleCounts.admin || 0,
          newRegistrations: newRegistrations || 0,
          newTrials: newTrials || 0,
          totalUsers: Object.values(roleCounts).reduce((sum: number, count: number) => sum + count, 0)
        };
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to load dashboard statistics");
      }
    }
  });
};

export default useDashboardStats;
