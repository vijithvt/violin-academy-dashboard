
import { useState } from "react";
import { useSupabase } from "@/context/SupabaseContext";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface StudentDashboardLayoutProps {
  children: React.ReactNode;
}

const StudentDashboardLayout = ({ children }: StudentDashboardLayoutProps) => {
  const { user, logout } = useSupabase();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="bg-maroon-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button 
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <Link to="/" className="font-serif text-xl font-bold">Vijith Violinist</Link>
          </div>
          
          <Button 
            variant="ghost" 
            className="text-amber-100 hover:text-white hover:bg-maroon-800"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">
        {/* Sidebar - Mobile Version */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}>
            <div className="absolute top-0 left-0 w-64 h-full bg-maroon-800 p-4" onClick={e => e.stopPropagation()}>
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Student Dashboard</h3>
                  <button onClick={() => setSidebarOpen(false)}>
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>
                <nav className="space-y-2">
                  <Link to="/student-dashboard" className="block px-4 py-2 text-amber-100 hover:text-white hover:bg-maroon-700 rounded">
                    Dashboard
                  </Link>
                </nav>
                <div className="mt-auto pt-6">
                  <p className="text-sm text-amber-200 mb-1">Logged in as:</p>
                  <p className="text-amber-100 font-medium truncate">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Sidebar - Desktop Version */}
        <div className="hidden lg:block w-64 bg-maroon-800 rounded-lg shadow-lg p-4 flex-shrink-0">
          <h3 className="text-lg font-medium text-white mb-6">Student Dashboard</h3>
          <nav className="space-y-2">
            <Link to="/student-dashboard" className="block px-4 py-2 text-amber-100 hover:text-white hover:bg-maroon-700 rounded">
              Dashboard
            </Link>
          </nav>
          <div className="mt-8 pt-6 border-t border-maroon-700">
            <p className="text-sm text-amber-200 mb-1">Logged in as:</p>
            <p className="text-amber-100 font-medium truncate">{user?.email}</p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-serif font-bold text-maroon-900 mb-6">Student Dashboard</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardLayout;
