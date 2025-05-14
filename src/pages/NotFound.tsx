
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <AlertCircle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4 text-maroon-800">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            onClick={goBack}
            className="hover:bg-amber-50"
          >
            Go Back
          </Button>
          <Button 
            onClick={goHome}
            className="bg-maroon-800 hover:bg-maroon-700"
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
