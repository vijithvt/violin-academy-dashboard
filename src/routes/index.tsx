
import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import StudentDashboard from "@/pages/StudentDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminLogin from "@/pages/AdminLogin";
import PublicStudentRegistration from "@/pages/PublicStudentRegistration";
import AdmissionForm from "@/pages/AdmissionForm";
import Blogs from "@/pages/Blogs";
import StudentDashboardLayout from "@/components/student/StudentDashboardLayout";
import BeginnerGuide from "@/pages/BeginnerGuide";
import AdminSimpleStudentRegistration from "@/pages/AdminSimpleStudentRegistration";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <NotFound />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/dashboard/student",
    element: (
      <StudentDashboardLayout>
        <StudentDashboard />
      </StudentDashboardLayout>
    ),
  },
  {
    path: "/dashboard/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/admission",
    element: <AdmissionForm />,
  },
  {
    path: "/blogs",
    element: <Blogs />,
  },
  {
    path: "/register/:trialId",
    element: <PublicStudentRegistration />,
  },
  {
    path: "/dashboard/admin/register-student",
    element: <PublicStudentRegistration />,
  },
  {
    path: "/dashboard/admin/register-student-simple",
    element: <AdminSimpleStudentRegistration />,
  },
  {
    path: "/beginner-guide",
    element: <BeginnerGuide />,
  },
]);

export default router;
