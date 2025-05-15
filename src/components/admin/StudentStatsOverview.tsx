
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useSupabase } from "@/context/SupabaseContext";
import { Users } from "lucide-react";

interface StudentStats {
  totalStudents: number;
  activeStudents: number;
}

const StudentStatsOverview = () => {
  const { supabase } = useSupabase();
  const [stats, setStats] = useState<StudentStats>({
    totalStudents: 0,
    activeStudents: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total student count
        const { data: roleData, error: roleError } = await supabase.rpc('count_profiles_by_role');
        
        if (roleError) {
          console.error("Error fetching role counts:", roleError);
          return;
        }
        
        // Find student count from the result
        const studentCount = roleData?.find(r => r.role === 'student')?.count || 0;
        
        // Get active students (those with practice sessions in the last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const { data: activeData, error: activeError } = await supabase
          .from('practice_sessions')
          .select('user_id', { count: 'exact', head: true })
          .gte('date', thirtyDaysAgo.toISOString().split('T')[0])
          .limit(1);
        
        if (activeError) {
          console.error("Error fetching active students:", activeError);
        }
        
        // Count distinct users with practice sessions
        const { count: activeCount, error: countError } = await supabase
          .from('practice_sessions')
          .select('user_id', { count: 'exact', head: true, distinct: true })
          .gte('date', thirtyDaysAgo.toISOString().split('T')[0]);
          
        setStats({
          totalStudents: studentCount,
          activeStudents: activeCount || 0
        });
        
      } catch (error) {
        console.error("Error fetching student stats:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, [supabase]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Users className="mr-2 h-5 w-5 text-indigo-600" />
          Student Overview
        </CardTitle>
        <CardDescription>Statistics about your students</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="text-xs text-indigo-600 font-medium uppercase tracking-wider">
              Total Students
            </div>
            <div className="text-3xl font-bold text-indigo-900 mt-1">
              {loading ? "..." : stats.totalStudents}
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-xs text-green-600 font-medium uppercase tracking-wider">
              Active Students
            </div>
            <div className="text-3xl font-bold text-green-900 mt-1">
              {loading ? "..." : stats.activeStudents}
            </div>
            <div className="text-xs text-green-600 mt-1">Past 30 days</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentStatsOverview;
