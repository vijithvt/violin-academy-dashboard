
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import StudentRegistrationForm from "@/components/admin/StudentRegistrationForm";
import NotAuthorized from "@/components/admin/NotAuthorized";
import { useAdminCheck } from "@/api/adminService";
import { Loader2, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const StudentRegistration = () => {
  const { isAdmin, loading, checkAdminStatus } = useAdminCheck();

  useEffect(() => {
    checkAdminStatus();
  }, [checkAdminStatus]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Checking authorization...</span>
      </div>
    );
  }

  if (isAdmin === false) {
    return <NotAuthorized />;
  }

  return (
    <AdminDashboardLayout title="Register New Student">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Register New Student</h2>
            <p className="text-muted-foreground">
              Create a new student account with complete details
            </p>
          </div>
          <Link to="/dashboard/students">
            <Button variant="outline" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to Students
            </Button>
          </Link>
        </div>
        
        <StudentRegistrationForm />
      </div>
    </AdminDashboardLayout>
  );
};

export default StudentRegistration;
