
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "@/context/SupabaseContext";
import { supabase } from "@/integrations/supabase/client";
import { useTotalStudentPoints } from "@/api/adminService";
import { 
  motion, 
  AnimatePresence 
} from "framer-motion";
import { 
  Sparkles, 
  GraduationCap, 
  BookOpen, 
  Award, 
  Calendar,
  Clock,
  ChevronRight,
  LogOut,
  User,
  Music
} from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.5
    }
  }
};

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
  const { data: studentPoints } = useTotalStudentPoints(user?.id);
  const points = studentPoints ?? 0;
  
  // Stats for the dashboard
  const [stats, setStats] = useState({
    lessonsCompleted: 0,
    progressPercentage: 0,
    practiceHours: 0,
    studentPoints: points,
    pendingTasks: 0
  });

  // Complete syllabus with all lessons
  const fullSyllabus = [
    // Level 1 - AARAMBHA (Beginner)
    { id: 1, title: "Basic Violin Positions", level: 1, status: "Completed" as "Completed" | "In Progress" | "Not Started", date: "2025-04-10" },
    { id: 2, title: "Bow Handling Techniques", level: 1, status: "Completed" as "Completed" | "In Progress" | "Not Started", date: "2025-04-17" },
    { id: 3, title: "Introduction to Sa-Pa", level: 1, status: "In Progress" as "Completed" | "In Progress" | "Not Started", date: "2025-04-24" },
    { id: 4, title: "Sarali Varisai Practice", level: 1, status: "Not Started" as "Completed" | "In Progress" | "Not Started", date: "2025-05-01" },
    { id: 5, title: "Basic Janta Varisai", level: 1, status: "Not Started" as "Completed" | "In Progress" | "Not Started", date: "2025-05-08" },
    { id: 6, title: "Thattu Varisai Introduction", level: 1, status: "Not Started" as "Completed" | "In Progress" | "Not Started", date: "2025-05-15" },
    
    // Level 2 - MADHYAMA (Intermediate)
    { id: 7, title: "Basic Gamakas", level: 2, status: "Not Started" as "Completed" | "In Progress" | "Not Started", date: "2025-07-10" },
    { id: 8, title: "2nd Position Playing", level: 2, status: "Not Started" as "Completed" | "In Progress" | "Not Started", date: "2025-07-17" },
    { id: 9, title: "String Crossing Dexterity", level: 2, status: "Not Started" as "Completed" | "In Progress" | "Not Started", date: "2025-07-24" },
    { id: 10, title: "Simple Geethams", level: 2, status: "Not Started" as "Completed" | "In Progress" | "Not Started", date: "2025-07-31" },
    
    // Level 3 - UTTHAMA (Advanced)
    { id: 11, title: "Advanced Gamakas", level: 3, status: "Not Started" as "Completed" | "In Progress" | "Not Started", date: "2026-01-10" },
    { id: 12, title: "Raga Delineation", level: 3, status: "Not Started" as "Completed" | "In Progress" | "Not Started", date: "2026-01-17" },
    { id: 13, title: "Alapana Basics", level: 3, status: "Not Started" as "Completed" | "In Progress" | "Not Started", date: "2026-01-24" },
    { id: 14, title: "Varnams", level: 3, status: "Not Started" as "Completed" | "In Progress" | "Not Started", date: "2026-01-31" },
    { id: 15, title: "Simple Krithis", level: 3, status: "Not Started" as "Completed" | "In Progress" | "Not Started", date: "2026-02-07" }
  ];

  // Demo tasks
  const demoTasks = [
    { id: 1, title: "Submit Sarali Varisai recording", dueDate: "2025-05-10" },
    { id: 2, title: "Practice Janta Varisai for 30 mins daily", dueDate: "2025-05-15" }
  ];

  // Classical music quotes for the quote of the day
  const musicQuotes = [
    { text: "Music is the divine way to tell beautiful, poetic things to the heart.", author: "Pablo Casals" },
    { text: "Indian classical music is like an ocean. The more you go into it, the more you find.", author: "Pt. Hariprasad Chaurasia" },
    { text: "Music is enough for a lifetime, but a lifetime is not enough for music.", author: "Sergei Rachmaninoff" },
    { text: "The music is not in the notes, but in the silence between.", author: "Wolfgang Amadeus Mozart" },
    { text: "Without music, life would be a mistake.", author: "Friedrich Nietzsche" }
  ];

  // Get today's quote (based on day of the month)
  const todayQuote = musicQuotes[new Date().getDate() % musicQuotes.length];

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
          const totalLessons = fullSyllabus.length;
          const completed = fullSyllabus.filter(item => item.status === 'Completed').length;
          const progressPercent = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
          
          setStats({
            lessonsCompleted: completed,
            progressPercentage: progressPercent,
            practiceHours: 4, // Demo data
            studentPoints: points, // Use real points data
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
  }, [user, points]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  
  // Extract first name from email for welcome message
  const firstName = user?.email?.split('@')[0] || "Student";

  // Get the level name based on points
  const getStudentLevel = (points: number) => {
    if (points >= 1000) return "VIDHWATH (Professional)";
    if (points >= 500) return "UTTHAMA (Advanced)";
    if (points >= 200) return "MADHYAMA (Intermediate)";
    return "AARAMBHA (Beginner)";
  };

  // Calculate next milestone
  const getNextMilestone = (points: number) => {
    if (points < 200) return 200;
    if (points < 500) return 500;
    if (points < 1000) return 1000;
    return points + 500;
  };

  // Get student rank (dummy data for now)
  const studentRank = 8;

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-amber-50 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-800 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-serif font-bold">Carnatic Violin Academy</h1>
              <p className="text-indigo-100 mt-1">
                Welcome, <span className="font-medium">{firstName}</span>
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center">
              <button 
                onClick={() => setActiveTab("dashboard")} 
                className={`px-3 py-1 mx-1 rounded-md transition-colors ${activeTab === "dashboard" ? "bg-white text-indigo-800" : "text-white hover:bg-indigo-700"}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setActiveTab("guide")} 
                className={`px-3 py-1 mx-1 rounded-md transition-colors ${activeTab === "guide" ? "bg-white text-indigo-800" : "text-white hover:bg-indigo-700"}`}
              >
                Learning Guide
              </button>
              <button 
                onClick={handleLogout}
                className="ml-4 flex items-center px-3 py-1 bg-indigo-700 hover:bg-indigo-900 rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {activeTab === "dashboard" ? (
          <AnimatePresence mode="wait">
            <motion.div
              key="dashboard"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-8"
            >
              {/* Stats Overview */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-4">
                  <div className="flex items-center mb-2">
                    <BookOpen className="h-5 w-5 text-indigo-600 mr-2" />
                    <h3 className="text-sm font-medium text-gray-500">Lessons Completed</h3>
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold">{stats.lessonsCompleted} <span className="text-sm font-normal text-gray-500">of {fullSyllabus.length}</span></p>
                    <div className="w-24 bg-gray-100 rounded-full h-2.5 mb-1">
                      <motion.div 
                        className="bg-indigo-600 h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.progressPercentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-4">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-amber-600 mr-2" />
                    <h3 className="text-sm font-medium text-gray-500">Practice Hours</h3>
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold">{stats.practiceHours}h <span className="text-sm font-normal text-gray-500">this week</span></p>
                    <div className="relative w-10 h-10">
                      <svg className="w-10 h-10" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-100" strokeWidth="3"></circle>
                        <motion.circle 
                          cx="18" cy="18" r="16" fill="none" 
                          className="stroke-current text-amber-500" 
                          strokeWidth="3"
                          strokeDasharray="100"
                          initial={{ strokeDashoffset: 100 }}
                          animate={{ strokeDashoffset: 100 - (stats.practiceHours / 5 * 100) }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          transform="rotate(-90 18 18)"
                        ></motion.circle>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                        {Math.round(stats.practiceHours / 5 * 100)}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-4">
                  <div className="flex items-center mb-2">
                    <Award className="h-5 w-5 text-purple-600 mr-2" />
                    <h3 className="text-sm font-medium text-gray-500">Your Points</h3>
                  </div>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold">{stats.studentPoints}</p>
                    <motion.div 
                      animate={{ rotate: [0, 10, -10, 10, 0] }}
                      transition={{ 
                        duration: 0.5, 
                        ease: "easeInOut",
                        repeat: 1,
                        repeatDelay: 5
                      }}
                      className="ml-2"
                    >
                      <Sparkles className="h-5 w-5 text-yellow-500" />
                    </motion.div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Next milestone: {getNextMilestone(stats.studentPoints)} points</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-4">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-5 w-5 text-red-600 mr-2" />
                    <h3 className="text-sm font-medium text-gray-500">Pending Tasks</h3>
                  </div>
                  <p className="text-2xl font-bold">{stats.pendingTasks}</p>
                  <p className="text-xs text-gray-500 mt-1">Due this week</p>
                </div>
              </motion.div>

              {/* Main Content Area - Lessons and Tasks */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Lessons Column (2/3 width) */}
                <motion.div 
                  variants={itemVariants}
                  className="col-span-1 lg:col-span-2 space-y-6"
                >
                  <div className="bg-white rounded-xl shadow-sm border border-indigo-100 overflow-hidden">
                    <div className="border-b px-6 py-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <GraduationCap className="h-5 w-5 text-indigo-600 mr-2" />
                        <h2 className="text-lg font-serif font-bold">My Lessons</h2>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {getStudentLevel(points)}
                      </span>
                    </div>
                    
                    <div className="divide-y">
                      {fullSyllabus.slice(0, 6).map((lesson) => (
                        <motion.div 
                          key={lesson.id}
                          whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                          className="px-6 py-3 flex justify-between items-center"
                        >
                          <div className="flex items-center">
                            <Music className="h-4 w-4 text-indigo-500 mr-3 flex-shrink-0" />
                            <span className="font-medium text-gray-900">{lesson.title}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-500">{formatDate(lesson.date)}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(lesson.status)}`}>
                              {lesson.status}
                            </span>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="px-6 py-3 bg-indigo-50">
                      <button className="text-sm text-indigo-600 font-medium flex items-center">
                        View all lessons
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Quote of the Day */}
                  <motion.div 
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6"
                  >
                    <h2 className="flex items-center text-lg font-serif font-bold mb-4">
                      <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
                      Quote of the Day
                    </h2>
                    <blockquote className="italic text-gray-700">
                      "{todayQuote.text}"
                    </blockquote>
                    <p className="text-right text-sm text-gray-500 mt-2">— {todayQuote.author}</p>
                  </motion.div>
                </motion.div>
                
                {/* Side Column (1/3 width) */}
                <motion.div
                  variants={itemVariants}
                  className="space-y-6"
                >
                  {/* Student Stats */}
                  <div className="bg-white rounded-xl shadow-sm border border-indigo-100 overflow-hidden">
                    <div className="border-b px-6 py-4">
                      <h2 className="flex items-center text-lg font-serif font-bold">
                        <User className="h-5 w-5 text-indigo-600 mr-2" />
                        Your Stats
                      </h2>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Points:</span>
                        <span className="font-bold text-xl">{points}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Rank:</span>
                        <span className="font-bold">{studentRank}th</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Level:</span>
                        <span className="font-bold">{getStudentLevel(points).split(" ")[0]}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Next milestone:</span>
                        <span className="font-bold">{getNextMilestone(points)} pts</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Pending Tasks */}
                  <div className="bg-white rounded-xl shadow-sm border border-indigo-100 overflow-hidden">
                    <div className="border-b px-6 py-4">
                      <h2 className="text-lg font-serif font-bold">Pending Tasks</h2>
                    </div>
                    
                    <div>
                      {demoTasks.map((task) => (
                        <motion.div 
                          key={task.id}
                          whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                          className="px-6 py-4 border-b last:border-0"
                        >
                          <div className="flex items-start">
                            <input 
                              type="checkbox" 
                              className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                            />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{task.title}</p>
                              <p className="text-xs text-gray-500 mt-1">Due: {formatDate(task.dueDate)}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key="guide"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="max-w-3xl mx-auto">
                <motion.h1 variants={itemVariants} className="text-3xl font-serif font-bold text-center mb-8">
                  Learning Guide for Carnatic Violin
                </motion.h1>
                
                <motion.p variants={itemVariants} className="text-lg text-gray-700 mb-8">
                  Welcome to your personalized learning journey, {firstName}! This guide will help you navigate through 
                  the beautiful world of Carnatic violin music, from the basics to advanced techniques.
                </motion.p>
                
                <motion.div variants={itemVariants} className="mb-10">
                  <h2 className="text-2xl font-serif font-bold mb-4">Your Learning Path</h2>
                  <div className="relative">
                    {/* Progress bar */}
                    <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-200"></div>
                    <div className="absolute left-4 top-0 w-1 bg-indigo-600" style={{ height: `${stats.progressPercentage}%` }}></div>
                    
                    {/* Levels */}
                    <div className="space-y-12">
                      {[
                        { name: "AARAMBHA (Beginner)", desc: "Fundamentals of violin holding, bowing, and basic notation", active: points < 200 },
                        { name: "MADHYAMA (Intermediate)", desc: "Exploration of ragas, gamakas, and more complex techniques", active: points >= 200 && points < 500 },
                        { name: "UTTHAMA (Advanced)", desc: "Raga improvisation, advanced gamakas, and complete compositions", active: points >= 500 && points < 1000 },
                        { name: "VIDHWATH (Professional)", desc: "Concert-level performance, advanced improvisation, and teaching", active: points >= 1000 }
                      ].map((level, index) => (
                        <div key={index} className="relative pl-12">
                          {/* Level marker */}
                          <div className={`absolute left-2.5 -translate-x-1/2 w-5 h-5 rounded-full ${level.active ? 'bg-indigo-600 ring-4 ring-indigo-100' : 'bg-gray-200'}`}></div>
                          
                          <h3 className={`text-xl font-serif font-bold ${level.active ? 'text-indigo-800' : 'text-gray-500'}`}>
                            {level.name}
                          </h3>
                          <p className="text-gray-600 mt-1">{level.desc}</p>
                          
                          {level.active && (
                            <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                              <p className="text-sm text-indigo-800">
                                <span className="font-medium">Your current level!</span> Focus on completing the lessons in this level before advancing.
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="mb-10">
                  <h2 className="text-2xl font-serif font-bold mb-4">Practice Tips</h2>
                  <div className="bg-white rounded-lg shadow-sm border border-indigo-100 p-6 space-y-4">
                    <div className="flex items-start">
                      <div className="rounded-full bg-indigo-100 p-2 mr-4">
                        <Music className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Daily Consistency</h3>
                        <p className="text-gray-600">Practice for at least 30 minutes every day, focusing on one element at a time.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="rounded-full bg-amber-100 p-2 mr-4">
                        <Clock className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Slow and Steady</h3>
                        <p className="text-gray-600">Master techniques at slow speeds before increasing tempo. Quality over speed!</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="rounded-full bg-green-100 p-2 mr-4">
                        <GraduationCap className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Record Yourself</h3>
                        <p className="text-gray-600">Record your practice sessions and listen back to identify areas for improvement.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </motion.div>
  );
};

export default StudentDashboard;
