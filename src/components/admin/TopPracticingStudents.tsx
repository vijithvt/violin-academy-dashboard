
import { useEffect, useState } from "react";
import { useSupabase } from "@/context/SupabaseContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface TopStudent {
  id: string;
  name: string;
  total_minutes: number;
  average_minutes_per_week: number;
}

const TopPracticingStudents = () => {
  const { supabase } = useSupabase();
  const [topStudents, setTopStudents] = useState<TopStudent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopStudents = async () => {
      try {
        // Get all profiles that are students
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, name')
          .eq('role', 'student');
          
        if (profilesError) {
          console.error("Error fetching profiles:", profilesError);
          return;
        }
        
        if (!profiles || profiles.length === 0) {
          setTopStudents([]);
          return;
        }
        
        // For each student, get their practice data and calculate average
        const studentsWithPractice: TopStudent[] = [];
        
        for (const profile of profiles) {
          try {
            const { data: practiceData, error: practiceError } = await supabase
              .from('practice_sessions')
              .select('minutes, date')
              .eq('user_id', profile.id);
              
            if (practiceError) {
              console.error(`Error fetching practice data for ${profile.name}:`, practiceError);
              continue;
            }
            
            const totalMinutes = practiceData?.reduce((sum, session) => sum + session.minutes, 0) || 0;
            
            // Calculate average minutes per week (past 4 weeks)
            const now = new Date();
            const fourWeeksAgo = new Date();
            fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
            
            const recentPractices = practiceData?.filter(session => {
              const sessionDate = new Date(session.date);
              return sessionDate >= fourWeeksAgo && sessionDate <= now;
            }) || [];
            
            const recentMinutes = recentPractices.reduce((sum, session) => sum + session.minutes, 0);
            const avgMinutesPerWeek = recentMinutes > 0 ? Math.round(recentMinutes / 4) : 0;
            
            if (totalMinutes > 0) {
              studentsWithPractice.push({
                id: profile.id,
                name: profile.name,
                total_minutes: totalMinutes,
                average_minutes_per_week: avgMinutesPerWeek
              });
            }
          } catch (err) {
            console.error(`Error processing practice data for ${profile.name}:`, err);
          }
        }
        
        // Sort by total practice time
        const sortedStudents = studentsWithPractice.sort((a, b) => b.total_minutes - a.total_minutes);
        setTopStudents(sortedStudents.slice(0, 5)); // Get top 5
        
      } catch (error) {
        console.error("Error fetching top students:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTopStudents();
  }, [supabase]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Trophy className="mr-2 h-5 w-5 text-amber-500" />
          Top Practicing Students
        </CardTitle>
        <CardDescription>Students with the most practice time</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : topStudents.length > 0 ? (
          <div className="space-y-4">
            {topStudents.map((student, index) => (
              <div key={student.id} className="flex items-center gap-3">
                <div className={`h-9 w-9 rounded-full flex items-center justify-center text-white font-medium ${
                  index === 0 ? "bg-amber-500" : 
                  index === 1 ? "bg-gray-400" : 
                  index === 2 ? "bg-amber-700" : "bg-indigo-400"
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{student.name}</div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{Math.floor(student.total_minutes / 60)} hours {student.total_minutes % 60} mins total</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 mt-1 rounded-full">
                    <div 
                      className="bg-indigo-500 h-full rounded-full" 
                      style={{ 
                        width: `${Math.max(5, (student.total_minutes / (topStudents[0]?.total_minutes || 1)) * 100)}%` 
                      }} 
                    />
                  </div>
                  <div className="text-xs text-right mt-0.5 text-gray-500">
                    ~{student.average_minutes_per_week} mins/week
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-gray-500">
            No practice data available yet
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TopPracticingStudents;
