import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "@/context/SupabaseContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Loader2, BarChart, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PracticeSummary {
  id: string;
  name: string;
  total_minutes: number;
  last_practice: string | null;
}

const AdminDashboard = () => {
  const { supabase, user } = useSupabase();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [practiceSummaries, setPracticeSummaries] = useState<PracticeSummary[]>([]);
  
  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        navigate("/admin-login");
        return;
      }
      
      try {
        // Using the secure function we just created
        const { data, error } = await supabase.rpc('is_admin_secure');
        
        if (error) {
          console.error("Error checking admin status:", error);
          throw error;
        }
        
        setIsAdmin(!!data);
        if (!data) {
          // Not an admin, redirect
          toast({
            title: "Access Denied",
            description: "You don't have permission to access this page",
            variant: "destructive"
          });
          navigate("/");
        }
      } catch (error: any) {
        console.error("Admin check exception:", error);
        toast({
          title: "Authentication Error",
          description: error.message || "Failed to verify admin status",
          variant: "destructive"
        });
        navigate("/admin-login");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAdmin();
  }, [user, navigate, supabase, toast]);
  
  // Fetch practice data for all students
  useEffect(() => {
    const fetchPracticeSummaries = async () => {
      if (!isAdmin) return;
      
      try {
        // Get all profiles that are students
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, name')
          .eq('role', 'student');
          
        if (profilesError) {
          console.error("Error fetching profiles:", profilesError);
          throw profilesError;
        }
        
        if (!profiles || profiles.length === 0) {
          setPracticeSummaries([]);
          return;
        }
        
        // For each student, get their practice data
        const summaries: PracticeSummary[] = [];
        
        for (const profile of profiles) {
          try {
            // Get total minutes
            const { data: practiceData, error: practiceError } = await supabase
              .from('practice_sessions')
              .select('minutes, date')
              .eq('user_id', profile.id)
              .order('date', { ascending: false });
              
            if (practiceError) {
              console.error(`Error fetching practice data for ${profile.name}:`, practiceError);
              continue; // Skip this user but continue with others
            }
            
            const totalMinutes = practiceData?.reduce((sum, session) => sum + session.minutes, 0) || 0;
            const lastPractice = practiceData && practiceData.length > 0 ? practiceData[0].date : null;
            
            summaries.push({
              id: profile.id,
              name: profile.name,
              total_minutes: totalMinutes,
              last_practice: lastPractice
            });
          } catch (err) {
            console.error(`Error processing practice data for ${profile.name}:`, err);
          }
        }
        
        // Sort by most practice time
        summaries.sort((a, b) => b.total_minutes - a.total_minutes);
        setPracticeSummaries(summaries);
        
      } catch (error: any) {
        console.error("Error in fetchPracticeSummaries:", error);
        toast({
          title: "Error loading data",
          description: error.message || "Failed to load practice data",
          variant: "destructive"
        });
      }
    };
    
    if (isAdmin && !isLoading) {
      fetchPracticeSummaries();
    }
  }, [isAdmin, isLoading, supabase, toast]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }
  
  if (!isAdmin) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-indigo-200">Violin Academy Management</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                onClick={() => navigate("/home")}
                className="px-4 py-2 bg-white text-indigo-700 rounded-md hover:bg-indigo-50 transition-colors"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader className="bg-indigo-50">
            <CardTitle className="flex items-center text-indigo-800">
              <BarChart className="mr-2 h-5 w-5" />
              Student Practice Hours
            </CardTitle>
            <CardDescription>
              Overview of practice time logged by all students
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            {practiceSummaries.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Practice
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Practice
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {practiceSummaries.map((student) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-indigo-500 mr-2" />
                            <div className="text-sm text-gray-900">
                              {(student.total_minutes / 60).toFixed(1)} hours ({student.total_minutes} mins)
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {student.last_practice ? new Date(student.last_practice).toLocaleDateString() : 'Never'}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No practice data available yet.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
