import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminDashboardLayout = ({ children, title }: AdminDashboardLayoutProps) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/admin-login");
  };

  const navigateTo = (path: string, tab: string) => {
    setActiveTab(tab);
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const NavItem = ({ 
    icon: Icon, 
    label, 
    path, 
    tabName 
  }: { 
    icon: React.ElementType; 
    label: string; 
    path: string; 
    tabName: string;
  }) => (
    <button
      onClick={() => navigateTo(path, tabName)}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md w-full transition-colors",
        activeTab === tabName 
          ? "bg-indigo-100 text-indigo-700 font-medium" 
          : "text-gray-600 hover:bg-gray-100"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-indigo-900">Admin Dashboard</h2>
        <p className="text-sm text-gray-500">Welcome, {currentUser?.email}</p>
      </div>
      
      <div className="p-4 flex flex-col gap-1 flex-1">
        <NavItem 
          icon={LayoutDashboard} 
          label="Dashboard" 
          path="/dashboard" 
          tabName="dashboard" 
        />
        <NavItem 
          icon={Users} 
          label="Trial Requests" 
          path="/dashboard" 
          tabName="trials" 
        />
        <NavItem 
          icon={Users} 
          label="Student Profiles" 
          path="/dashboard/students" 
          tabName="students" 
        />
        <NavItem 
          icon={Calendar} 
          label="Schedule" 
          path="/dashboard/schedule" 
          tabName="schedule" 
        />
        <NavItem 
          icon={Settings} 
          label="Settings" 
          path="/dashboard/settings" 
          tabName="settings" 
        />
      </div>
      
      <div className="p-4 border-t mt-auto">
        <Button 
          variant="outline" 
          className="w-full flex items-center gap-2" 
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 border-r bg-white shadow-sm">
        <SidebarContent />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-4">
          <div className="flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  {isMobileMenuOpen ? <X /> : <Menu />}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-semibold text-gray-800 ml-4 md:ml-0">{title}</h1>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
