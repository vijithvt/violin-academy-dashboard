
import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import AdminLogin from '@/pages/AdminLogin';
import NotFound from '@/pages/NotFound';
import Index from '@/pages/Index';
import StudentDashboard from '@/pages/StudentDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import PublicStudentRegistration from '@/pages/PublicStudentRegistration';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
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
    element: <StudentDashboard />,
  },
  {
    path: "/dashboard/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/dashboard/admin/register-student",
    element: <PublicStudentRegistration />,
  },
  {
    path: "/register/:trialId",
    element: <PublicStudentRegistration />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
