
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "@/context/SupabaseContext";
import { supabase } from "@/integrations/supabase/client";
import { useTotalStudentPoints } from "@/api/adminService";
import { 
  motion, 
  AnimatePresence,
  useAnimation,
  Variants
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
  Music,
  LayoutDashboard,
  BookMarked,
  CheckCircle,
  List,
  LucideIcon,
  Trophy,
  ArrowRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { 
    y: -5, 
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 }
  }
};

interface ProgressData {
  lesson: string;
  status: string;
}

interface MenuItem {
  name: string;
  icon: LucideIcon;
  path: string;
}

const menuItems: MenuItem[] = [
  { name: "Overview", icon: LayoutDashboard, path: "overview" },
  { name: "My Lessons", icon: BookOpen, path: "lessons" },
  { name: "Progress & Points", icon: Award, path: "progress" },
  { name: "Weekly Practice", icon: Clock, path: "practice" },
  { name: "Pending Tasks", icon: List, path: "tasks" },
  { name: "Syllabus", icon: BookMarked, path: "syllabus" }
];

const StudentDashboard = () => {
  const { user, logout } = useSupabase();
  const navigate = useNavigate();
  const controls = useAnimation();
  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [activeSection, setActiveSection] = useState("overview");
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
    { id: 1, title: "Submit Sarali Varisai recording", dueDate: "2025-05-10", isUrgent: true },
    { id: 2, title: "Practice Janta Varisai for 30 mins daily", dueDate: "2025-05-15", isUrgent: false }
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
        controls.start("visible");
      }
    };

    fetchUserData();
    controls.start("visible");
  }, [user, points, controls]);

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

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return renderOverview();
      case "lessons":
        return renderLessons();
      case "progress":
        return renderProgress();
      case "practice":
        return renderPractice();
      case "tasks":
        return renderTasks();
      case "syllabus":
        return renderSyllabus();
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => {
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Stats Overview */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-xl shadow-sm border border-indigo-100 p-4"
          >
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
          </motion.div>

          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-xl shadow-sm border border-indigo-100 p-4"
          >
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
          </motion.div>

          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-xl shadow-sm border border-indigo-100 p-4"
          >
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
          </motion.div>

          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-xl shadow-sm border border-indigo-100 p-4"
          >
            <div className="flex items-center mb-2">
              <Calendar className="h-5 w-5 text-red-600 mr-2" />
              <h3 className="text-sm font-medium text-gray-500">Pending Tasks</h3>
            </div>
            <p className="text-2xl font-bold">{stats.pendingTasks}</p>
            <p className="text-xs text-gray-500 mt-1">Due this week</p>
          </motion.div>
        </motion.div>

        {/* Main Content Area - Lessons and Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lessons Column (2/3 width) */}
          <motion.div 
            variants={itemVariants}
            className="col-span-1 lg:col-span-2 space-y-6"
          >
            <motion.div 
              variants={cardVariants}
              whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)" }}
              className="bg-white rounded-xl shadow-sm border border-indigo-100 overflow-hidden"
            >
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
                {fullSyllabus.slice(0, 4).map((lesson) => (
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
                <button 
                  onClick={() => setActiveSection("lessons")}
                  className="text-sm text-indigo-600 font-medium flex items-center"
                >
                  View all lessons
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </motion.div>
            
            {/* Quote of the Day */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)" }}
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
            {/* Top Students */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)" }}
              className="bg-gradient-to-br from-maroon-50 to-white border border-maroon-100 rounded-xl shadow-md p-4"
            >
              <div className="flex items-center mb-4">
                <Trophy className="h-5 w-5 text-maroon-600 mr-2" />
                <h2 className="text-lg font-serif font-bold text-maroon-900">Top Students</h2>
              </div>
              
              <div className="space-y-3">
                {[
                  { rank: 1, name: "Ananya S", points: 540 },
                  { rank: 2, name: "Rohan M", points: 485 },
                  { rank: 3, name: "Sofia T", points: 410 }
                ].map((student) => (
                  <div key={student.rank} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3
                        ${student.rank === 1 ? "bg-amber-500" : 
                          student.rank === 2 ? "bg-gray-400" : 
                          student.rank === 3 ? "bg-amber-700" : "bg-maroon-300"}`
                      }>
                        {student.rank}
                      </div>
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback className="bg-amber-100 text-amber-800">
                          {getInitials(student.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{student.name}</span>
                    </div>
                    <span className="font-bold text-maroon-800">{student.points}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Your Stats */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)" }}
              className="bg-white rounded-xl shadow-sm border border-indigo-100 p-4"
            >
              <h2 className="flex items-center text-lg font-serif font-bold mb-4">
                <User className="h-5 w-5 text-indigo-600 mr-2" />
                Your Stats
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Points:</span>
                  <span className="font-bold text-xl">{points}</span>
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
            </motion.div>
            
            {/* Pending Tasks */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)" }}
              className="bg-white rounded-xl shadow-sm border border-indigo-100 overflow-hidden"
            >
              <div className="border-b px-4 py-3">
                <h2 className="text-lg font-serif font-bold flex items-center">
                  <List className="h-5 w-5 mr-2 text-indigo-600" />
                  Pending Tasks
                </h2>
              </div>
              
              <div>
                {demoTasks.map((task) => (
                  <motion.div 
                    key={task.id}
                    whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                    className="px-4 py-3 border-b last:border-0"
                  >
                    <div className="flex items-start">
                      <div className="mt-1">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{task.title}</p>
                        <p className={`text-xs mt-1 ${task.isUrgent ? "text-red-500 font-medium" : "text-gray-500"}`}>
                          Due: {formatDate(task.dueDate)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="px-4 py-3 bg-indigo-50">
                <button 
                  onClick={() => setActiveSection("tasks")}
                  className="text-sm text-indigo-600 font-medium flex items-center"
                >
                  View all tasks
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  // These render functions would be implemented with real content
  const renderLessons = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-serif font-bold flex items-center">
        <BookOpen className="h-6 w-6 mr-2 text-indigo-600" />
        My Lessons
      </motion.h2>

      <motion.div variants={itemVariants} className="space-y-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-indigo-100">
          <div className="border-b border-indigo-100 bg-indigo-50 px-6 py-4">
            <h3 className="text-lg font-serif font-semibold text-indigo-900">
              LEVEL 1 – AARAMBHA (Beginner)
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {fullSyllabus.filter(lesson => lesson.level === 1).map((lesson) => (
              <motion.div 
                key={lesson.id}
                whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                className="px-6 py-4 flex justify-between items-center"
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
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-indigo-100">
          <div className="border-b border-indigo-100 bg-indigo-50 px-6 py-4">
            <h3 className="text-lg font-serif font-semibold text-indigo-900">
              LEVEL 2 – MADHYAMA (Intermediate)
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {fullSyllabus.filter(lesson => lesson.level === 2).map((lesson) => (
              <motion.div 
                key={lesson.id}
                whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                className="px-6 py-4 flex justify-between items-center"
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
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
  
  const renderProgress = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-serif font-bold flex items-center">
        <Award className="h-6 w-6 mr-2 text-indigo-600" />
        Progress & Points
      </motion.h2>
      
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-indigo-100">
          <h3 className="text-lg font-serif font-semibold mb-4 text-indigo-900">Your Achievement Points</h3>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-4xl font-bold">{stats.studentPoints}</div>
              <div className="text-sm text-gray-500">total points earned</div>
            </div>
            <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center">
              <Award className="w-10 h-10 text-indigo-600" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Progress to next level</span>
                <span className="text-sm font-medium">{points}/200</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${Math.min(points/200*100, 100)}%` }}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span>Current level: <span className="font-semibold">{getStudentLevel(points).split(" ")[0]}</span></span>
              <span>Next: <span className="font-semibold">200 points</span></span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border border-indigo-100">
          <h3 className="text-lg font-serif font-semibold mb-4 text-indigo-900">Performance Summary</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Lessons Completed</span>
                <span className="font-medium">{stats.lessonsCompleted}/{fullSyllabus.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${stats.progressPercentage}%` }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Practice Consistency</span>
                <span className="font-medium">80%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "80%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Technique Score</span>
                <span className="font-medium">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "65%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
  
  const renderPractice = () => (
    <div>Practice content coming soon...</div>
  );
  
  const renderTasks = () => (
    <div>Tasks content coming soon...</div>
  );
  
  const renderSyllabus = () => (
    <div>Syllabus content coming soon...</div>
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50">
        <Sidebar className="border-r border-gray-200">
          <SidebarHeader className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold">Violin Academy</h2>
              <SidebarTrigger className="sm:hidden" />
            </div>
          </SidebarHeader>

          <SidebarContent>
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-indigo-100 text-indigo-800">
                    {firstName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{firstName}</p>
                  <p className="text-xs text-gray-500">{getStudentLevel(points)}</p>
                </div>
              </div>
            </div>

            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path} active={activeSection === item.path}>
                  <SidebarMenuButton onClick={() => setActiveSection(item.path)}>
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-red-500" onClick={handleLogout}>
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="ml-0 sm:ml-64 p-6">
          <div className="mb-6">
            <h1 className="font-serif text-3xl font-bold">Welcome back, {firstName}!</h1>
            <p className="text-gray-500">
              Here's your learning progress and upcoming lessons.
            </p>
          </div>

          {renderContent()}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default StudentDashboard;

