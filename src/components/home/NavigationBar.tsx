
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const NavigationBar = () => {
  return (
    <header className="sticky top-0 z-10 bg-white bg-opacity-95 shadow-sm backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xl font-serif font-bold text-maroon-800">Vijith Violinist</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="/#home" className="text-gray-800 hover:text-maroon-700 font-medium">Home</a>
          <a href="/#about" className="text-gray-800 hover:text-maroon-700 font-medium">About</a>
          <a href="/#courses" className="text-gray-800 hover:text-maroon-700 font-medium">Courses</a>
          <Link to="/blogs" className="text-gray-800 hover:text-maroon-700 font-medium">Blogs</Link>
          <a href="/#join" className="text-gray-800 hover:text-maroon-700 font-medium">Join</a>
          <div className="flex items-center space-x-2">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <LogIn className="h-4 w-4" /> Student Login
              </Button>
            </Link>
            <Link to="/admin-login">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                Admin
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile Navigation - Simple dropdown for now */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm">
            Menu
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;
