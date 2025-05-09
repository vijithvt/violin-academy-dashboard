
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { Loader2 } from 'lucide-react';
import { useAdminCheck } from '@/api/adminService';
import { useEffect } from 'react';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { isAdmin, loading, checkAdminStatus } = useAdminCheck();

  useEffect(() => {
    if (isAuthenticated) {
      checkAdminStatus();
    }
  }, [isAuthenticated]);

  if (isLoading || (isAuthenticated && loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Checking authorization...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  if (isAdmin === false) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
