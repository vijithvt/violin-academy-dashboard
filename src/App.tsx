
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SupabaseProvider } from './providers/SupabaseProvider';
import { AuthProvider } from './providers/AuthProvider';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Blogs from './pages/Blogs';
import BeginnerGuide from './pages/BeginnerGuide';
import StudentDashboard from './pages/StudentDashboard';
import Dashboard from './pages/Dashboard';
import StudentsPage from './pages/StudentsPage';
import StudentDetails from './pages/StudentDetails';
import EditStudent from './pages/EditStudent';
import AdmissionForm from './pages/AdmissionForm';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/auth/ProtectedRoute';
import StudentProtectedRoute from './components/auth/StudentProtectedRoute';
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <SupabaseProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/beginner-guide" element={<BeginnerGuide />} />
            
            {/* Protected Student Routes */}
            <Route path="/dashboard/student" element={
              <StudentProtectedRoute>
                <StudentDashboard />
              </StudentProtectedRoute>
            } />
            
            {/* Protected Admin Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/students" element={
              <ProtectedRoute>
                <StudentsPage />
              </ProtectedRoute>
            } />
            <Route path="/student/:id" element={
              <ProtectedRoute>
                <StudentDetails />
              </ProtectedRoute>
            } />
            <Route path="/student/edit/:id" element={
              <ProtectedRoute>
                <EditStudent />
              </ProtectedRoute>
            } />
            <Route path="/admission" element={
              <ProtectedRoute>
                <AdmissionForm />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </SupabaseProvider>
  );
}

export default App;
