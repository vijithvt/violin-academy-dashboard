
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { SupabaseProvider } from "@/context/SupabaseContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import StudentProtectedRoute from "@/components/StudentProtectedRoute";

// Pages
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import AdmissionForm from "./pages/AdmissionForm";
import NotFound from "./pages/NotFound";
import StudentDetails from "./pages/StudentDetails";
import EditStudent from "./pages/EditStudent";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import StudentsPage from "./pages/StudentsPage";
import StudentRegistration from "./pages/StudentRegistration"; // Add the new page
import StudentProgress from "./pages/StudentProgress"; // Add the new page

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SupabaseProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Home page is now the root route */}
              <Route path="/" element={<Home />} />
              
              {/* Public routes */}
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected routes for admin */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/students" element={<StudentsPage />} />
                <Route path="/admission" element={<AdmissionForm />} />
                <Route path="/student/:id" element={<StudentDetails />} />
                <Route path="/edit-student/:id" element={<EditStudent />} />
                <Route path="/student-registration" element={<StudentRegistration />} /> 
                <Route path="/student-progress/:studentId" element={<StudentProgress />} />
              </Route>
              
              {/* Protected routes for students */}
              <Route element={<StudentProtectedRoute />}>
                <Route path="/student-dashboard" element={<StudentDashboard />} />
              </Route>
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SupabaseProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
