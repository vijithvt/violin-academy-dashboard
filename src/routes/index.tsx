
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import StudentPracticeDetails from "@/components/admin/StudentPracticeDetails";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import StudentDashboard from "@/pages/StudentDashboard";
import TeacherDashboard from "@/pages/TeacherDashboard";
import { useAuth } from "@/context/AuthContext";
import StudentRegistration from "@/pages/StudentRegistration";
import StudentRegistrationSimple from "@/pages/StudentRegistrationSimple";
import TrialRequests from "@/pages/TrialRequests";
import StudentProgress from "@/pages/StudentProgress";
import AdminSimpleStudentRegistration from "@/pages/AdminSimpleStudentRegistration";
import { useSupabase } from "@/context/SupabaseContext";
import { useState, useEffect } from "react";
import NotAuthorized from "@/components/admin/NotAuthorized";

const Router = () => {
  const { user, loading: supabaseLoading } = useSupabase();
  const { currentUser, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  
  // Check if current user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        setIsCheckingAdmin(false);
        return;
      }
      
      try {
        const { data, error } = await supabase.rpc('is_admin_secure');
        
        if (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
        } else {
          setIsAdmin(!!data);
        }
      } catch (err) {
        console.error("Admin check failed:", err);
        setIsAdmin(false);
      } finally {
        setIsCheckingAdmin(false);
      }
    };
    
    if (!supabaseLoading) {
      checkAdminStatus();
    }
  }, [user, supabase, supabaseLoading]);

  // Combined loading state
  const isLoading = supabaseLoading || authLoading || isCheckingAdmin;
  
  // Admin route protection component
  const AdminProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (isLoading) {
      return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }
    
    if (!user) {
      return <Navigate to="/admin-login" />;
    }
    
    if (isAdmin === false) {
      return <NotAuthorized />;
    }
    
    return children;
  };

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

      {/* Auth routes - redirects if not logged in */}
      <Route
        path="/dashboard"
        element={
          currentUser ? (
            <Dashboard />
          ) : (
            <Navigate to="/" replace state={{ message: "Please login to access the dashboard." }} />
          )
        }
      />
      <Route
        path="/student-registration"
        element={
          currentUser ? (
            <StudentRegistration />
          ) : (
            <Navigate to="/" replace state={{ message: "Please login to access the dashboard." }} />
          )
        }
      />
      <Route
        path="/student-registration-simple"
        element={
          currentUser ? (
            <StudentRegistrationSimple />
          ) : (
            <Navigate to="/" replace state={{ message: "Please login to access the dashboard." }} />
          )
        }
      />
      <Route
        path="/student-progress/:studentId"
        element={
          currentUser ? (
            <StudentProgress />
          ) : (
            <Navigate to="/" replace state={{ message: "Please login to access the dashboard." }} />
          )
        }
      />

      {/* Student routes - accessible only to students */}
      <Route
        path="/student-dashboard"
        element={
          currentUser ? (
            <StudentDashboard />
          ) : (
            <Navigate to="/" replace state={{ message: "Please login as a student." }} />
          )
        }
      />

      {/* Teacher routes - accessible only to teachers */}
      <Route
        path="/teacher-dashboard"
        element={
          currentUser ? (
            <TeacherDashboard />
          ) : (
            <Navigate to="/" replace state={{ message: "Please login as a teacher." }} />
          )
        }
      />

      {/* Admin routes */}
      <Route path="/admin-login" element={<AdminLogin />} />
      
      {/* Fixed admin dashboard routes */}
      <Route 
        path="/admin-dashboard" 
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/admin" 
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin/student-practice/:id" 
        element={
          <AdminProtectedRoute>
            <StudentPracticeDetails />
          </AdminProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/admin/register-student" 
        element={
          <AdminProtectedRoute>
            <StudentRegistration />
          </AdminProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/admin/register-student-simple" 
        element={
          <AdminProtectedRoute>
            <AdminSimpleStudentRegistration />
          </AdminProtectedRoute>
        } 
      />
      <Route 
        path="/trial-requests" 
        element={
          <AdminProtectedRoute>
            <TrialRequests />
          </AdminProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default Router;
