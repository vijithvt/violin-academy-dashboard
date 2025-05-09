
import { useState, useEffect } from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import FreeTrialTable from "@/components/admin/FreeTrialTable";
import NotAuthorized from "@/components/admin/NotAuthorized";
import { useAdminCheck } from "@/api/adminService";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentProfilesTable from "@/components/admin/StudentProfilesTable";
import PointsManagement from "@/components/admin/PointsManagement";
import AttendanceModule from "@/components/admin/attendance/AttendanceModule";
import FeesModule from "@/components/admin/fees/FeesModule";

const Dashboard = () => {
  const { isAdmin, loading, checkAdminStatus } = useAdminCheck();
  const [activeTab, setActiveTab] = useState("trials");

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
    <AdminDashboardLayout title="Admin Dashboard">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Manage trial requests, student profiles, attendance, fees, and more.
          </p>
        </div>
        
        <Tabs defaultValue="trials" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="trials">Trial Requests</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="points">Points</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="fees">Fees</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="trials" className="mt-6">
            <FreeTrialTable />
          </TabsContent>
          
          <TabsContent value="students" className="mt-6">
            <StudentProfilesTable />
          </TabsContent>
          
          <TabsContent value="points" className="mt-6">
            <PointsManagement />
          </TabsContent>
          
          <TabsContent value="attendance" className="mt-6">
            <AttendanceModule />
          </TabsContent>
          
          <TabsContent value="fees" className="mt-6">
            <FeesModule />
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
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  );
};

export default Dashboard;
