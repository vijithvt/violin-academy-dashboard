
import { useState, useEffect } from "react";
import { useSupabase } from "@/context/SupabaseContext";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X, Music } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface StudentDashboardLayoutProps {
  children: React.ReactNode;
}

const StudentDashboardLayout = ({ children }: StudentDashboardLayoutProps) => {
  const { user, logout, supabase } = useSupabase();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [studentName, setStudentName] = useState<string>("");
  const [studentLevel, setStudentLevel] = useState<string>("AARAMBHA (Beginner)");
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  
  useEffect(() => {
    const fetchStudentProfile = async () => {
      if (!user) return;
      
      try {
        // First check profiles table for name
        const { data: profileData } = await supabase
          .from("profiles")
          .select("name")
          .eq("id", user.id)
          .single();
          
        if (profileData?.name) {
          setStudentName(profileData.name);
        }
        
        // Then check for extended profile with level information
        const { data: extendedProfile } = await supabase
          .from("student_profiles")
          .select("learning_level")
          .eq("user_id", user.id)
          .maybeSingle();
          
        if (extendedProfile?.learning_level) {
          // Map learning level to display format
          let displayLevel = "AARAMBHA (Beginner)";
          
          switch(extendedProfile.learning_level) {
            case "beginner":
              displayLevel = "AARAMBHA (Beginner)";
              break;
            case "intermediate":
              displayLevel = "MADHYAMA (Intermediate)";
              break;
            case "advanced":
              displayLevel = "UTTHAMA (Advanced)";
              break;
            case "professional":
              displayLevel = "VIDHWATH (Professional)";
              break;
            default:
              displayLevel = "AARAMBHA (Beginner)";
          }
          
          setStudentLevel(displayLevel);
        }
      } catch (error) {
        console.error("Error fetching student profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStudentProfile();
  }, [user, supabase]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <motion.header 
        className="bg-maroon-900 text-white shadow-md" 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button 
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <Link to="/" className="font-serif text-xl font-bold flex items-center">
              <Music className="mr-2 h-5 w-5" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-100">
                Vijith's Violin Academy
              </span>
            </Link>
          </div>
          
          <Button 
            variant="ghost" 
            className="text-amber-100 hover:text-white hover:bg-maroon-800"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </motion.header>
      
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">
        {/* Sidebar - Mobile Version */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}>
            <motion.div 
              className="absolute top-0 left-0 w-64 h-full bg-maroon-800 p-4"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Student Portal</h3>
                  <button onClick={() => setSidebarOpen(false)}>
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>
                <nav className="space-y-2">
                  <Link to="/dashboard/student" className="block px-4 py-2 text-amber-100 hover:text-white hover:bg-maroon-700 rounded">
                    Dashboard
                  </Link>
                </nav>
                <div className="mt-auto pt-6">
                  <p className="text-sm text-amber-200 mb-1">Current Level:</p>
                  <p className="text-amber-100 font-medium truncate">{studentLevel}</p>
                  <div className="h-1 bg-amber-700 mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-300 w-1/4 rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        
        {/* Sidebar - Desktop Version */}
        <motion.div 
          className="hidden lg:block w-64 bg-maroon-800 rounded-lg shadow-lg p-4 flex-shrink-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-medium text-white mb-6">Student Portal</h3>
          <nav className="space-y-2">
            <Link to="/dashboard/student" className="block px-4 py-2 text-amber-100 hover:text-white hover:bg-maroon-700 rounded">
              Dashboard
            </Link>
          </nav>
          <div className="mt-8 pt-6 border-t border-maroon-700">
            <p className="text-sm text-amber-200 mb-1">Current Level:</p>
            <p className="text-amber-100 font-medium truncate">{studentLevel}</p>
            <div className="h-1 bg-amber-700 mt-2 rounded-full overflow-hidden">
              <div className="h-full bg-amber-300 w-1/4 rounded-full"></div>
            </div>
          </div>
        </motion.div>
        
        {/* Main Content */}
        <motion.div 
          className="flex-1 bg-white rounded-lg shadow-lg p-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-8 w-1 bg-maroon-800 rounded-full"></div>
              <h1 className="text-2xl font-serif font-bold text-maroon-900">
                Welcome, <span className="text-amber-800">{isLoading ? "Student" : studentName}</span>!
              </h1>
            </div>
          </motion.div>
          
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboardLayout;
