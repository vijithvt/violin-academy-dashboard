
import { useEffect, useState } from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import StudentProfilesTable from "@/components/admin/StudentProfilesTable";
import NotAuthorized from "@/components/admin/NotAuthorized";
import { useAdminCheck } from "@/api/adminService";
import { useStudentProfiles } from "@/api/adminService/profileService";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const StudentsPage = () => {
  const { isAdmin, loading: authLoading, checkAdminStatus } = useAdminCheck();
  const { toast } = useToast();
  const { data: profiles, isLoading, isError, error } = useStudentProfiles();
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  useEffect(() => {
    if (isError && error) {
      toast({
        title: "Error loading student profiles",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive"
      });
    }
  }, [isError, error, toast]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    window.location.reload();
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">
          {authLoading ? "Checking authorization..." : "Loading student profiles..."}
        </span>
      </div>
    );
  }

  if (isAdmin === false) {
    return <NotAuthorized />;
  }

  return (
    <AdminDashboardLayout title="Student Profiles">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Student Profiles</h2>
            <p className="text-muted-foreground">
              Manage student, teacher, and admin profiles.
            </p>
          </div>
          <Link to="/student-registration">
            <Button className="bg-green-600 hover:bg-green-700">Add New Student</Button>
          </Link>
        </div>
        
        {isError ? (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mt-4">
            <h3 className="text-red-800 font-medium">Failed to load student profiles</h3>
            <p className="text-red-600 mt-1">
              {error instanceof Error ? error.message : "An error occurred while loading data"}
            </p>
            <Button onClick={handleRetry} variant="outline" className="mt-2">
              Retry Loading
            </Button>
          </div>
        ) : (
          <StudentProfilesTable />  
        )}
      </div>
    </AdminDashboardLayout>
  );
};

export default StudentsPage;
