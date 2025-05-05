
import { Navigate, Outlet } from "react-router-dom";
import { useSupabase } from "@/context/SupabaseContext";
import { Loader2 } from "lucide-react";

const StudentProtectedRoute = () => {
  const { user, loading } = useSupabase();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default StudentProtectedRoute;
