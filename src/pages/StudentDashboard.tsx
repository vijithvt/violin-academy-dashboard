
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "@/context/SupabaseContext";
import { Loader2 } from "lucide-react";
import StudentDashboardLayout from "@/components/student/StudentDashboardLayout";
import PracticeHoursTracker from "@/components/student/PracticeHoursTracker";
import ComingSoonCard from "@/components/student/ComingSoonCard";
import { motion } from "framer-motion";

const StudentDashboard = () => {
  const { user, loading } = useSupabase();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50">
        <Loader2 className="h-8 w-8 text-maroon-800 animate-spin mb-4" />
        <p className="text-maroon-800 font-medium">Loading your dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Animation variants for staggered animations
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <StudentDashboardLayout>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <PracticeHoursTracker />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ComingSoonCard title="Lesson Progress" icon="book" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ComingSoonCard title="Attendance" icon="calendar-check" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ComingSoonCard title="Practice Tips" icon="bulb" />
        </motion.div>
        <motion.div variants={itemVariants} className="md:col-span-2">
          <ComingSoonCard title="Music Theory Resources" icon="music" />
        </motion.div>
      </motion.div>
    </StudentDashboardLayout>
  );
};

export default StudentDashboard;
