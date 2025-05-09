
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import FreeTrialTable from "@/components/admin/FreeTrialTable";
import NotAuthorized from "@/components/admin/NotAuthorized";
import { useAdminCheck, useDashboardStats } from "@/api/adminService";
import { Loader2, UserPlus, BookOpen, Users, GraduationCap, School, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentProfilesTable from "@/components/admin/StudentProfilesTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const { isAdmin, loading, checkAdminStatus } = useAdminCheck();
  const [activeTab, setActiveTab] = useState("trials");
  const { data: stats, isLoading: statsLoading } = useDashboardStats();

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
    <AdminDashboardLayout title="Admin Dashboard">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Manage trial requests, student profiles, attendance, and more.
          </p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
              <Users className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  stats?.students || 0
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Enrolled students
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-white border-green-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Teachers
              </CardTitle>
              <GraduationCap className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  stats?.teachers || 0
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Active teachers
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                New Registrations
              </CardTitle>
              <UserPlus className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  stats?.newRegistrations || 0
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Trial Requests
              </CardTitle>
              <Award className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  stats?.newTrials || 0
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-4">
          <Link to="/student-registration">
            <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
              <UserPlus className="h-4 w-4" />
              Register New Student
            </Button>
          </Link>
          <Link to="/dashboard/students">
            <Button variant="outline" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Manage Student Progress
            </Button>
          </Link>
        </div>
        
        <Tabs defaultValue="trials" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="overflow-x-auto flex w-full">
            <TabsTrigger value="trials">Trial Requests</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            {/* Comment out unimplemented features */}
            {/* <TabsTrigger value="points">Points</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="fees">Fees</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger> */}
          </TabsList>
          
          <TabsContent value="trials" className="mt-6">
            <FreeTrialTable />
          </TabsContent>
          
          <TabsContent value="students" className="mt-6">
            <StudentProfilesTable />
          </TabsContent>
          
          {/* Comment out unimplemented features */}
          {/* <TabsContent value="points" className="mt-6">
            <PointsManagement />
          </TabsContent>
          
          <TabsContent value="attendance" className="mt-6">
            <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg border">
              <p className="text-gray-500">Coming soon: Attendance management features</p>
            </div>
          </TabsContent>
          
          <TabsContent value="fees" className="mt-6">
            <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg border">
              <p className="text-gray-500">Coming soon: Fee management features</p>
            </div>
          </TabsContent>
          
          <TabsContent value="schedule" className="mt-6">
            <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg border">
              <p className="text-gray-500">Coming soon: Class schedule management</p>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="mt-6">
            <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg border">
              <p className="text-gray-500">Coming soon: Performance tracking features</p>
            </div>
          </TabsContent> */}
        </Tabs>
      </div>
    </AdminDashboardLayout>
  );
};

export default Dashboard;
