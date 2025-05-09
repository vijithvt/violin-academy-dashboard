
import { useEffect } from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import StudentProfilesTable from "@/components/admin/StudentProfilesTable";
import NotAuthorized from "@/components/admin/NotAuthorized";
import { useAdminCheck } from "@/api/adminService";
import { Loader2 } from "lucide-react";

const StudentsPage = () => {
  const { isAdmin, loading, checkAdminStatus } = useAdminCheck();

  useEffect(() => {
    checkAdminStatus();
  }, []);

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
    <AdminDashboardLayout title="Student Profiles">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Student Profiles</h2>
          <p className="text-muted-foreground">
            Manage student, teacher, and admin profiles.
          </p>
        </div>
        
        <StudentProfilesTable />
      </div>
    </AdminDashboardLayout>
  );
};

export default StudentsPage;
