
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

const Router = () => {
  const { currentUser, loading } = useAuth();

  // Function to check if the user is an admin
  const isAdminRoute = (element: JSX.Element) => {
    if (loading) {
      return <div>Loading...</div>; // Or a more appropriate loading indicator
    }

    if (!currentUser) {
      return <Navigate to="/admin-login" />;
    }

    // Here you would typically check if the user has the 'admin' role
    // For now, let's assume you have a function to check the role
    const isAdmin = currentUser.email === 'admin@example.com'; // Replace with your actual admin check

    return isAdmin ? element : <Navigate to="/" />;
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
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin/student-practice/:id" element={<StudentPracticeDetails />} />
      <Route path="/dashboard/admin/register-student" element={<StudentRegistration />} />
      <Route path="/dashboard/admin/register-student-simple" element={<AdminSimpleStudentRegistration />} />
      <Route path="/trial-requests" element={<TrialRequests />} />
    </Routes>
  );
};

export default Router;
