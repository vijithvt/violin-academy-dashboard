
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupabase } from "@/context/SupabaseContext";
import { User, Users, Hourglass, UserCheck } from "lucide-react";

const StudentStatsOverview = () => {
  const { supabase } = useSupabase();
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [activeStudents, setActiveStudents] = useState<number>(0);
  const [practicingStudents, setPracticingStudents] = useState<number>(0);
  const [avgPracticeTime, setAvgPracticeTime] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total student count
        const { count: studentCount, error: countError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('role', 'student');
          
        if (countError) throw countError;
        
        if (studentCount !== null) {
          setTotalStudents(studentCount);
        }
        
        // Get count of students who practiced in the last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const { data: recentPractices, error: practiceError } = await supabase
          .from('practice_sessions')
          .select('user_id')
          .gte('date', sevenDaysAgo.toISOString())
          .eq('user_id.profiles.role', 'student');
          
        if (!practiceError && recentPractices) {
          // Get unique student IDs who have practiced
          const uniqueStudentIds = [...new Set(recentPractices.map(p => p.user_id))];
          setPracticingStudents(uniqueStudentIds.length);
        }
        
        // Get active students (logged in within last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const { data: activeUsers, error: activeError } = await supabase
          .from('profiles')
          .select('id')
          .eq('role', 'student')
          .gte('last_sign_in', thirtyDaysAgo.toISOString());
          
        if (!activeError && activeUsers) {
          setActiveStudents(activeUsers.length);
        }
        
        // Calculate average practice time per student
        const { data: allPractices, error: avgError } = await supabase
          .from('practice_sessions')
          .select('minutes');
          
        if (!avgError && allPractices && allPractices.length > 0) {
          const totalMinutes = allPractices.reduce((sum, session) => sum + session.minutes, 0);
          const avgMinutes = totalMinutes / (studentCount || 1); // Prevent division by zero
          setAvgPracticeTime(Math.round(avgMinutes));
        }
        
      } catch (error) {
        console.error("Error fetching student stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStats();
  }, [supabase]);
  
  return (
    <Card>
      <CardHeader className="bg-blue-50">
        <CardTitle className="text-blue-800 flex items-center">
          <Users className="mr-2 h-5 w-5" />
          Student Statistics Overview
        </CardTitle>
        <CardDescription>Summary of student enrollment and activity</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-full">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{isLoading ? "..." : totalStudents}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-full">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Students</p>
                <p className="text-2xl font-bold text-gray-900">{isLoading ? "..." : activeStudents}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-amber-100 rounded-full">
                <Hourglass className="h-5 w-5 text-amber-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg. Practice Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {isLoading ? "..." : `${avgPracticeTime} mins`}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-full">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Practicing Students</p>
                <p className="text-2xl font-bold text-gray-900">
                  {isLoading ? "..." : practicingStudents}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentStatsOverview;
