
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import StudentProgressManagement from "@/components/admin/StudentProgressManagement";
import NotAuthorized from "@/components/admin/NotAuthorized";
import { useAdminCheck } from "@/api/adminService";
import { Loader2, ChevronLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const StudentProgress = () => {
  const { studentId } = useParams();
  const { isAdmin, loading, checkAdminStatus } = useAdminCheck();
  const [studentData, setStudentData] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [progressData, setProgressData] = useState<{
    level: number;
    currentModule: string;
    progressPercentage: number;
    teacherNotes?: string;
    lastUpdated?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAdminStatus();
  }, [checkAdminStatus]);

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!studentId) return;

      try {
        // Fetch student profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", studentId)
          .single();

        if (profileError) throw profileError;

        // Fetch student progress
        const { data: progressData, error: progressError } = await supabase
          .from("student_progress")
          .select("*")
          .eq("user_id", studentId)
          .maybeSingle(); // Use maybeSingle instead of single to handle no results case

        if (!profileError) {
          setStudentData({
            id: profileData.id,
            name: profileData.name,
          });
        }

        if (!progressError && progressData) {
          setProgressData({
            level: progressData.level,
            currentModule: progressData.current_module,
            progressPercentage: progressData.progress_percentage,
            teacherNotes: progressData.teacher_notes,
            lastUpdated: progressData.last_updated
          });
        }
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError("Failed to load student data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  const handleProgressUpdate = async () => {
    if (!studentId) return;
    
    try {
      const { data, error } = await supabase
        .from("student_progress")
        .select("*")
        .eq("user_id", studentId)
        .maybeSingle();
        
      if (error) throw error;
      
      if (data) {
        setProgressData({
          level: data.level,
          currentModule: data.current_module,
          progressPercentage: data.progress_percentage,
          teacherNotes: data.teacher_notes,
          lastUpdated: data.last_updated
        });
      }
    } catch (err) {
      console.error("Error refreshing progress data:", err);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">
          {loading ? "Checking authorization..." : "Loading student data..."}
        </span>
      </div>
    );
  }

  if (isAdmin === false) {
    return <NotAuthorized />;
  }

  if (error) {
    return (
      <AdminDashboardLayout title="Student Progress">
        <div className="bg-red-50 text-red-800 p-4 rounded-md">
          {error}
        </div>
        <div className="mt-4">
          <Link to="/dashboard/students">
            <Button variant="outline" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to Students
            </Button>
          </Link>
        </div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout title="Student Progress">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Student Progress</h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{studentData?.name}</span>
            </div>
          </div>
          <Link to="/dashboard/students">
            <Button variant="outline" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to Students
            </Button>
          </Link>
        </div>
        
        {!progressData ? (
          <div className="bg-amber-50 text-amber-800 p-4 rounded-md">
            No progress data available for this student. Use the form below to initialize their progress tracking.
          </div>
        ) : null}
        
        <StudentProgressManagement 
          studentId={studentId!} 
          initialData={progressData || undefined}
          onUpdate={handleProgressUpdate}
        />
      </div>
    </AdminDashboardLayout>
  );
};

export default StudentProgress;
