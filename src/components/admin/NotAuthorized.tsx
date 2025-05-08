
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

const NotAuthorized = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <ShieldAlert className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this area. This dashboard is restricted to administrators only.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
          >
            Return to Home
          </Button>
          <Button
            onClick={() => navigate("/admin-login")}
          >
            Login as Admin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotAuthorized;
