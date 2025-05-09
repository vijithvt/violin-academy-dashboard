
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "@/context/SupabaseContext";
import { supabase } from "@/integrations/supabase/client";
import DashboardHeader from "@/components/student/dashboard/DashboardHeader";
import DashboardContent from "@/components/student/dashboard/DashboardContent";
import LearningGuideContent from "@/components/student/dashboard/LearningGuideContent";
import { useTotalStudentPoints } from "@/api/adminService";

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
  
  // Stats for the dashboard - these would come from Supabase in a real implementation
  const [stats, setStats] = useState({
    lessonsCompleted: 0,
    progressPercentage: 0,
    practiceHours: 0,
    studentPoints: 0,
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
            studentPoints: studentPoints || 0, // Use real points data
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
  }, [user, studentPoints]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  
  // Extract first name from email for welcome message
  const firstName = user?.email?.split('@')[0] || "Student";

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <DashboardHeader 
        firstName={firstName} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-8">
        {activeTab === "dashboard" ? (
          <DashboardContent 
            stats={{...stats, studentPoints: studentPoints || 0}} 
            syllabus={fullSyllabus} 
            tasks={demoTasks}
          />
        ) : (
          <LearningGuideContent firstName={firstName} />
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
