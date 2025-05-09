
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { Loader2 } from 'lucide-react';

const StudentProtectedRoute = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Checking authorization...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user role is student
  const isStudent = user?.user_metadata?.role === 'student';
  if (!isStudent) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default StudentProtectedRoute;
