
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to home page after a short delay
    const timer = setTimeout(() => {
      navigate("/home");
    }, 500);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-maroon-800">Welcome to Violin Academy</h1>
        <p className="text-xl text-gray-600 mb-8">Redirecting you to the home page...</p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => navigate("/home")}>Go to Home</Button>
          <Button variant="outline" onClick={() => navigate("/admin-login")}>Admin Login</Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
