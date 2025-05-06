
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "@/context/SupabaseContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, BookOpen, Clock, Award, ListTodo, MessageSquareQuote, Book } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import TopStudents from "@/components/student/TopStudents";
import LessonProgression from "@/components/student/LessonProgression";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ProgressData {
  lesson: string;
  status: string;
}

const StudentDashboard = () => {
  const { user, logout } = useSupabase();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  
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

  // Complete syllabus with all lessons
  const fullSyllabus = [
    // Level 1 - AARAMBHA (Beginner)
    { id: 1, title: "Basic Violin Positions", level: 1, status: "Completed", date: "2025-04-10" },
    { id: 2, title: "Bow Handling Techniques", level: 1, status: "Completed", date: "2025-04-17" },
    { id: 3, title: "Introduction to Sa-Pa", level: 1, status: "In Progress", date: "2025-04-24" },
    { id: 4, title: "Sarali Varisai Practice", level: 1, status: "Not Started", date: "2025-05-01" },
    { id: 5, title: "Basic Janta Varisai", level: 1, status: "Not Started", date: "2025-05-08" },
    { id: 6, title: "Thattu Varisai Introduction", level: 1, status: "Not Started", date: "2025-05-15" },
    
    // Level 2 - MADHYAMA (Intermediate)
    { id: 7, title: "Basic Gamakas", level: 2, status: "Not Started", date: "2025-07-10" },
    { id: 8, title: "2nd Position Playing", level: 2, status: "Not Started", date: "2025-07-17" },
    { id: 9, title: "String Crossing Dexterity", level: 2, status: "Not Started", date: "2025-07-24" },
    { id: 10, title: "Simple Geethams", level: 2, status: "Not Started", date: "2025-07-31" },
    
    // Level 3 - UTTHAMA (Advanced)
    { id: 11, title: "Advanced Gamakas", level: 3, status: "Not Started", date: "2026-01-10" },
    { id: 12, title: "Raga Delineation", level: 3, status: "Not Started", date: "2026-01-17" },
    { id: 13, title: "Alapana Basics", level: 3, status: "Not Started", date: "2026-01-24" },
    { id: 14, title: "Varnams", level: 3, status: "Not Started", date: "2026-01-31" },
    { id: 15, title: "Simple Krithis", level: 3, status: "Not Started", date: "2026-02-07" }
  ];

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
          
          // Calculate dashboard stats - in a real scenario, this might be more sophisticated
          const totalLessons = fullSyllabus.length;
          const completed = fullSyllabus.filter(item => item.status === 'Completed').length;
          const progressPercent = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
          
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

  // Demo tasks
  const demoTasks = [
    { id: 1, title: "Submit Sarali Varisai recording", dueDate: "2025-05-10" },
    { id: 2, title: "Practice Janta Varisai for 30 mins daily", dueDate: "2025-05-15" }
  ];

  // Violin tuning reference data for the Learning Guide
  const tuningReference = [
    { string: "E (1st)", note: "Madhyasthayi Pa", frequency: "A4 – 440Hz" },
    { string: "A (2nd)", note: "Madhyasthayi Sa", frequency: "D4 – 293Hz" },
    { string: "D (3rd)", note: "Mantrasthayi Pa", frequency: "A3 – 220Hz" },
    { string: "G (4th)", note: "Mantrasthayi Sa", frequency: "D3 – 146Hz" },
  ];

  // Student guidelines for the Learning Guide
  const studentGuidelines = [
    {
      title: "Be Punctual",
      description: "Join classes on time and be prepared"
    },
    {
      title: "Maintain Discipline",
      description: "Respect teacher and peers during sessions"
    },
    {
      title: "Practice Regularly",
      description: "Follow daily routine as prescribed"
    },
    {
      title: "Stay Organized",
      description: "Manage materials and notes systematically"
    },
    {
      title: "Participate Actively",
      description: "Submit recordings, join activities"
    },
    {
      title: "Use Dashboard",
      description: "Track attendance and monitor progress"
    },
    {
      title: "Honest Submissions",
      description: "Send genuine practice recordings"
    },
    {
      title: "Communicate Well",
      description: "Inform prior if absent (min. 6 hours notice)"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-serif font-bold text-maroon-800">Vijith Violinist</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mr-4">
              <TabsList className="bg-amber-100">
                <TabsTrigger value="dashboard" className="data-[state=active]:bg-amber-200">
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="learning-guide" className="data-[state=active]:bg-amber-200">
                  Learning Guide
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <span className="text-maroon-700 hidden md:block">Welcome, <span className="font-medium">{firstName}</span>!</span>
            <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center">
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {activeTab === "dashboard" ? (
          <>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-maroon-900 mb-6">
              Student Dashboard
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <Card className="bg-gradient-to-br from-maroon-50 to-white border-maroon-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-maroon-700" />
                        Lessons Completed
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-maroon-800">{stats.lessonsCompleted}</p>
                      <p className="text-sm text-gray-500">of {fullSyllabus.length} total lessons</p>
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
                    <LessonProgression lessons={fullSyllabus.slice(0, 6)} />
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
              </div>
              
              {/* Right Sidebar - Top Students */}
              <div>
                <TopStudents />
                
                <Card className="mt-6 bg-gradient-to-br from-amber-50 to-white border-amber-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Award className="h-5 w-5 mr-2 text-maroon-700" />
                      Your Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Points:</span>
                        <span className="font-bold text-maroon-800">{stats.studentPoints}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Rank:</span>
                        <span className="font-bold text-maroon-800">8th</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Level:</span>
                        <span className="font-bold text-maroon-800">Beginner</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Next milestone:</span>
                        <span className="font-bold text-maroon-800">200 pts</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        ) : (
          // Learning Guide Tab Content
          <>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-maroon-900 mb-2 flex items-center">
              <Book className="h-8 w-8 mr-3 text-maroon-800" />
              Beginner's Violin Guide
            </h1>
            <p className="text-gray-600 mb-8">Welcome to your personalized learning journey, {firstName}!</p>
            
            {/* Student Guidelines Section */}
            <Card className="border-amber-100 shadow-md mb-10">
              <CardHeader className="bg-gradient-to-r from-maroon-800 to-amber-800 text-white">
                <CardTitle className="text-xl font-serif">Student Guidelines</CardTitle>
                <CardDescription className="text-amber-100">
                  Follow these guidelines for successful learning
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {studentGuidelines.map((guideline, index) => (
                    <div key={index} className="bg-amber-50 rounded-xl shadow-sm border border-amber-100 p-5 hover:shadow-md transition-all">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                          <span className="text-amber-700 font-medium">{index + 1}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-maroon-800 mb-2">{guideline.title}</h3>
                        <p className="text-center text-gray-600 text-sm">{guideline.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <Card className="border-amber-100 shadow-md">
                <CardHeader className="bg-gradient-to-r from-maroon-800 to-amber-800 text-white">
                  <CardTitle className="text-xl font-serif">1. Introduction to Violin</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-2">🎵</span>
                      <span>It makes music when you pull a bow across the strings.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">🪵</span>
                      <span>It is made of special wood like spruce and maple.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">🎻</span>
                      <span>You play it sitting cross-legged in Indian music.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-amber-100 shadow-md">
                <CardHeader className="bg-gradient-to-r from-maroon-800 to-amber-800 text-white">
                  <CardTitle className="text-xl font-serif">2. Know Your Instrument</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex justify-center mb-4">
                    <img 
                      src="/lovable-uploads/0619c26f-3b88-4555-96d5-9006a2bc8dd7.png" 
                      alt="Violin and bow diagram" 
                      className="rounded-lg max-h-72 object-contain"
                    />
                  </div>
                  <p className="text-gray-700 mb-3 font-medium">
                    Look at your violin closely! It has:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-2">🎚️</span>
                      <span>Pegs (to tighten the strings)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">🎯</span>
                      <span>Fingerboard (where you press)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">🎼</span>
                      <span>Strings (to make notes)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">🐴</span>
                      <span>Bow (made of horsehair – very soft!)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <Card className="border-amber-100 shadow-md">
                <CardHeader className="bg-gradient-to-r from-maroon-800 to-amber-800 text-white">
                  <CardTitle className="text-xl font-serif">3. How to Hold the Violin</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Sit on a mat cross-legged.</li>
                    <li>Scroll rests on your right foot.</li>
                    <li>Back must be straight.</li>
                    <li>Balance violin between collarbone and shoulder.</li>
                  </ul>
                  <div className="flex justify-center mt-4">
                    <img 
                      src="/lovable-uploads/64ab8fd2-ed27-4e9b-b0db-65a08587711f.png" 
                      alt="How to hold the violin" 
                      className="rounded-lg max-h-72 object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-amber-100 shadow-md">
                <CardHeader className="bg-gradient-to-r from-maroon-800 to-amber-800 text-white">
                  <CardTitle className="text-xl font-serif">4. How to Hold the Bow</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Fingers curved (like holding a flower).</li>
                    <li>Bow must be tight before playing.</li>
                    <li>Grip neither too loose nor too tight.</li>
                  </ul>
                  <div className="flex justify-center mt-4">
                    <img 
                      src="/lovable-uploads/d360aa7e-fe19-4f1d-9835-3b7e14e7b9ff.png" 
                      alt="How to hold the bow" 
                      className="rounded-lg max-h-72 object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-amber-100 shadow-md">
                <CardHeader className="bg-gradient-to-r from-maroon-800 to-amber-800 text-white">
                  <CardTitle className="text-xl font-serif">5. How to Tune the Violin</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-gray-700 mb-4">
                    Use Pegs (large pitch changes) and Fine Tuners (small changes).
                  </p>
                  <p className="text-amber-700 font-medium mb-3">
                    ⚠️ Beginners should use fine tuners or get help.
                  </p>
                  
                  <Table>
                    <TableCaption>Violin Tuning Reference</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>String</TableHead>
                        <TableHead>Carnatic Note</TableHead>
                        <TableHead>Frequency</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tuningReference.map((row) => (
                        <TableRow key={row.string}>
                          <TableCell className="font-medium">{row.string}</TableCell>
                          <TableCell>{row.note}</TableCell>
                          <TableCell>{row.frequency}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card className="border-amber-100 shadow-md">
                <CardHeader className="bg-gradient-to-r from-maroon-800 to-amber-800 text-white">
                  <CardTitle className="text-xl font-serif">6. Violin Tuning Apps</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>
                      <strong>Soundcorset</strong> – Android/iOS{" "}
                      <a 
                        href="https://play.google.com/store/apps/details?id=com.soundcorset.client.android" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Download Link
                      </a>
                    </li>
                    <li>
                      <strong>Da Tuner</strong> – Android{" "}
                      <a 
                        href="https://play.google.com/store/search?q=da%20tuner" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Download Link
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
