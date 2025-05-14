
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Redirect based on user role
    const checkUserRole = async () => {
      if (!currentUser) {
        navigate("/");
        return;
      }

      // Simple role check based on email for now
      // In a real app, you would probably check this from your database
      if (currentUser.email === "admin@example.com") {
        setUserRole("admin");
        navigate("/admin-dashboard");
      } else if (currentUser.email?.includes("teacher")) {
        setUserRole("teacher");
        navigate("/teacher-dashboard");
      } else {
        setUserRole("student");
        navigate("/student-dashboard");
      }
    };

    checkUserRole();
  }, [currentUser, navigate]);

  // Show loading while checking role
  if (!userRole) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-gray-600">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default Dashboard;
