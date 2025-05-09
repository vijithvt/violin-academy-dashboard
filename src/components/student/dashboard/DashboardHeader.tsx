
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  Upload, 
  Calendar, 
  BookOpen, 
  CheckSquare, 
  Settings, 
  LogOut 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DashboardHeader = ({ 
  title, 
  subtitle, 
  activeTab, 
  onTabChange 
}: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  
  const handlePracticeLogUpload = () => {
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      // Show success message or update UI
    }, 1500);
  };

  return (
    <header className="p-6 bg-white border-b">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-maroon-900">{title}</h1>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button 
              onClick={handlePracticeLogUpload}
              disabled={isUploading}
              className="bg-maroon-700 hover:bg-maroon-800"
            >
              {isUploading ? (
                <>
                  <span className="mr-2">Uploading...</span>
                  <span className="animate-spin">↻</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Weekly Practice
                </>
              )}
            </Button>
          </div>
        </div>
        
        <nav className="flex overflow-x-auto space-x-2 pb-2">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            className={activeTab === "overview" ? "bg-maroon-700 hover:bg-maroon-800" : ""}
            onClick={() => onTabChange("overview")}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === "schedule" ? "default" : "ghost"}
            className={activeTab === "schedule" ? "bg-maroon-700 hover:bg-maroon-800" : ""}
            onClick={() => onTabChange("schedule")}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
          <Button
            variant={activeTab === "learning" ? "default" : "ghost"}
            className={activeTab === "learning" ? "bg-maroon-700 hover:bg-maroon-800" : ""}
            onClick={() => onTabChange("learning")}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Learning Guide
          </Button>
          <Button
            variant={activeTab === "tasks" ? "default" : "ghost"}
            className={activeTab === "tasks" ? "bg-maroon-700 hover:bg-maroon-800" : ""}
            onClick={() => onTabChange("tasks")}
          >
            <CheckSquare className="w-4 h-4 mr-2" />
            Tasks
          </Button>
          <Button
            variant={activeTab === "settings" ? "default" : "ghost"}
            className={activeTab === "settings" ? "bg-maroon-700 hover:bg-maroon-800" : ""}
            onClick={() => onTabChange("settings")}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="text-red-600"
            onClick={() => navigate("/login")}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default DashboardHeader;
