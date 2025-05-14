
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "@/context/SupabaseContext";
import { Loader2 } from "lucide-react";
import StudentDashboardLayout from "@/components/student/StudentDashboardLayout";
import PracticeHoursTracker from "@/components/student/PracticeHoursTracker";
import ComingSoonCard from "@/components/student/ComingSoonCard";

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

  return (
    <StudentDashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PracticeHoursTracker />
        <ComingSoonCard title="Lesson Progress" icon="book" />
        <ComingSoonCard title="Attendance" icon="calendar-check" />
        <ComingSoonCard title="Practice Tips" icon="bulb" />
        <ComingSoonCard title="Student Points" icon="award" />
      </div>
    </StudentDashboardLayout>
  );
};

export default StudentDashboard;
