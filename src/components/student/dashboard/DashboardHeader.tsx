
import { useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardHeaderProps {
  firstName: string;
  activeTab: string;
  setActiveTab: (value: string) => void;
  onLogout: () => void;
}

const DashboardHeader = ({ firstName, activeTab, setActiveTab, onLogout }: DashboardHeaderProps) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl font-serif font-bold text-maroon-800">Vijith Violinist</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mr-4">
            <TabsList className="bg-amber-100">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-amber-200">
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="learning-guide" className="data-[state=active]:bg-amber-200">
                Learning Guide
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <span className="text-maroon-700 hidden md:block">Welcome, <span className="font-medium">{firstName}</span>!</span>
          <Button variant="outline" size="sm" onClick={onLogout} className="flex items-center">
            <LogOut className="h-4 w-4 mr-1" /> Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
