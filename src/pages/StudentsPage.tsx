import { useEffect, useState } from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import StudentProfilesTable from "@/components/admin/StudentProfilesTable";
import NotAuthorized from "@/components/admin/NotAuthorized";
import { useAdminCheck } from "@/api/adminService/hooks/useAdminCheck";
import { useStudentProfiles } from "@/api/adminService";
import { Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const StudentsPage = () => {
  const { isAdmin, loading: authLoading, checkAdminStatus } = useAdminCheck();
  const { toast } = useToast();
  const { data: profiles, isLoading, isError, error, refetch } = useStudentProfiles();
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    checkAdminStatus();
  }, [checkAdminStatus]);

  useEffect(() => {
    if (isError && error) {
      toast({
        title: "Error loading student profiles",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive"
      });
    }
  }, [isError, error, toast]);

  const handleRetry = async () => {
    setIsRetrying(true);
    setRetryCount(prev => prev + 1);
    
    try {
      await refetch();
      toast({
        title: "Retry successful",
        description: "Student profiles have been refreshed",
      });
    } catch (err) {
      toast({
        title: "Retry failed",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    } finally {
      setIsRetrying(false);
    }
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
          <div className="bg-red-50 border border-red-200 rounded-md p-6 mt-4">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="text-red-600 h-6 w-6" />
              <h3 className="text-red-800 font-medium text-lg">Failed to load student profiles</h3>
            </div>
            <p className="text-red-600 mb-4">
              {error instanceof Error ? error.message : "An error occurred while loading student data"}
            </p>
            <Button 
              onClick={handleRetry} 
              variant="outline" 
              className="bg-white border-red-300 hover:bg-red-50"
              disabled={isRetrying}
            >
              {isRetrying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Retrying...
                </>
              ) : (
                `Retry Loading${retryCount > 0 ? ` (${retryCount})` : ''}`
              )}
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
