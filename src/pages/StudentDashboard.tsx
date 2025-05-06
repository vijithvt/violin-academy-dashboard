
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "@/context/SupabaseContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, BookOpen, Clock, Award, ListTodo, MessageSquareQuote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ProgressData {
  lesson: string;
  status: string;
}

const StudentDashboard = () => {
  const { user, logout } = useSupabase();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  
  // Stats for the dashboard - these would come from Supabase in a real implementation
  const [stats, setStats] = useState({
    lessonsCompleted: 0,
    progressPercentage: 0,
    practiceHours: 0,
    studentPoints: 0,
    pendingTasks: 0
  });

  // Demo quotes - in a real implementation, these could come from a database
  const quotes = [
    { text: "Music gives a soul to the universe, wings to the mind, flight to the imagination and life to everything.", author: "Plato" },
    { text: "Music expresses that which cannot be put into words and that which cannot remain silent.", author: "Victor Hugo" },
    { text: "Music is the language of the spirit. It opens the secret of life bringing peace, abolishing strife.", author: "Kahlil Gibran" },
    { text: "After silence, that which comes nearest to expressing the inexpressible is music.", author: "Aldous Huxley" }
  ];
  
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    // Rotate quotes every 10 seconds
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 10000);
    
    return () => clearInterval(quoteInterval);
  }, [quotes.length]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        // Fetch progress data from Supabase
        const { data, error } = await supabase
          .from('progress')
          .select('*')
          .eq('user_id', user.id);
          
        if (error) throw error;
        
        if (data) {
          setProgressData(data);
          
          // Calculate dashboard stats
          const completed = data.filter(item => item.status === 'Completed').length;
          const progressPercent = data.length > 0 ? Math.round((completed / data.length) * 100) : 0;
          
          setStats({
            lessonsCompleted: completed,
            progressPercentage: progressPercent,
            practiceHours: 4, // Demo data
            studentPoints: 120, // Demo data
            pendingTasks: 2 // Demo data
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  
  // Extract first name from email for welcome message
  const firstName = user?.email?.split('@')[0] || "Student";

  // Demo lessons data - would come from database in real implementation
  const demoLessons = [
    { id: 1, title: "Basic Violin Positions", status: "Completed", date: "2025-04-10" },
    { id: 2, title: "Bow Handling Techniques", status: "Completed", date: "2025-04-17" },
    { id: 3, title: "Introduction to Sa-Pa", status: "In Progress", date: "2025-04-24" },
    { id: 4, title: "Basic Carnatic Ragas", status: "Not Started", date: "2025-05-01" },
    { id: 5, title: "Simple Geetham Practice", status: "Not Started", date: "2025-05-08" }
  ];
  
  // Demo tasks
  const demoTasks = [
    { id: 1, title: "Submit Sarali Varisai recording", dueDate: "2025-05-10" },
    { id: 2, title: "Practice Janta Varisai for 30 mins daily", dueDate: "2025-05-15" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-serif font-bold text-maroon-800">Vijith Violinist</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/beginner-guide")}>
              Learning Guide
            </Button>
            <span className="text-maroon-700 hidden md:block">Welcome, <span className="font-medium">{firstName}</span>!</span>
            <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center">
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-maroon-900 mb-6">
          Student Dashboard
        </h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-maroon-50 to-white border-maroon-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-maroon-700" />
                Lessons Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-maroon-800">{stats.lessonsCompleted}</p>
              <p className="text-sm text-gray-500">of 12 total lessons</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-maroon-50 to-white border-maroon-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-maroon-700" />
                Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={stats.progressPercentage} className="h-2" />
                <p className="text-3xl font-bold text-maroon-800">{stats.progressPercentage}%</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-maroon-50 to-white border-maroon-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Clock className="h-5 w-5 mr-2 text-maroon-700" />
                Weekly Practice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-maroon-800">{stats.practiceHours}h</p>
              <p className="text-sm text-gray-500">Goal: 5 hours</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-maroon-50 to-white border-maroon-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Award className="h-5 w-5 mr-2 text-maroon-700" />
                Student Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-maroon-800">{stats.studentPoints}</p>
              <p className="text-sm text-gray-500">Silver rank</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-maroon-50 to-white border-maroon-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <ListTodo className="h-5 w-5 mr-2 text-maroon-700" />
                Pending Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-maroon-800">{stats.pendingTasks}</p>
              <p className="text-sm text-gray-500">Due this week</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Daily Quote */}
        <Card className="bg-gradient-to-r from-maroon-800 to-amber-800 text-white mb-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <MessageSquareQuote className="h-6 w-6 mr-2" />
              Music Quote of the Day
            </CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="italic text-lg">"{quotes[currentQuote].text}"</blockquote>
            <p className="text-right text-amber-100 mt-2">— {quotes[currentQuote].author}</p>
          </CardContent>
        </Card>
        
        {/* Tabs for different sections */}
        <Tabs defaultValue="lessons" className="space-y-4">
          <TabsList className="bg-amber-100">
            <TabsTrigger value="lessons" className="data-[state=active]:bg-amber-200">My Lessons</TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:bg-amber-200">Pending Tasks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lessons" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lesson Progress</CardTitle>
                <CardDescription>
                  Track your progress through the curriculum
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {demoLessons.map((lesson) => (
                    <div 
                      key={lesson.id} 
                      className="p-4 rounded-md border flex justify-between items-center"
                      style={{
                        borderColor: 
                          lesson.status === "Completed" ? "rgb(34, 197, 94)" : 
                          lesson.status === "In Progress" ? "rgb(234, 179, 8)" : 
                          "rgb(203, 213, 225)"
                      }}
                    >
                      <div>
                        <h3 className="font-medium">{lesson.title}</h3>
                        <p className="text-sm text-gray-500">Scheduled: {lesson.date}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        lesson.status === "Completed" ? "bg-green-100 text-green-800" : 
                        lesson.status === "In Progress" ? "bg-yellow-100 text-yellow-800" : 
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {lesson.status}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tasks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tasks Due</CardTitle>
                <CardDescription>
                  Assignments that need your attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {demoTasks.map((task) => (
                    <div key={task.id} className="p-4 rounded-md border border-amber-200 bg-amber-50">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{task.title}</h3>
                        <span className="text-sm text-maroon-700 font-medium">Due: {task.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StudentDashboard;
