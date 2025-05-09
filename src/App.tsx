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
import { Toaster } from "@/components/ui/toaster"

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
            <Route element={<StudentProtectedRoute />}>
              <Route path="/dashboard/student" element={<StudentDashboard />} />
            </Route>
            
            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/students" element={<StudentsPage />} />
              <Route path="/student/:id" element={<StudentDetails />} />
              <Route path="/student/edit/:id" element={<EditStudent />} />
              <Route path="/admission" element={<AdmissionForm />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </SupabaseProvider>
  );
}

export default App;
