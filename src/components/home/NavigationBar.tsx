
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogIn, Menu, X, Music, BookOpen, Users, Calendar, Home, Info, Phone, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuTrigger, 
  NavigationMenuContent,
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center z-20">
          <Link to="/" className="flex items-center space-x-2">
            <Music className={`h-7 w-7 ${isScrolled ? 'text-purple-700' : 'text-white'}`} />
            <span className={`text-xl font-serif font-bold ${isScrolled ? 'text-purple-800' : 'text-white'}`}>
              Vijith Violinist
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <NavigationMenu className={isScrolled ? 'text-gray-800' : 'text-white'}>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <a href="/#home" className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-white/10`}>
                  <Home className="h-4 w-4 mr-1" /> Home
                </a>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <a href="/#about" className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-white/10`}>
                  <Info className="h-4 w-4 mr-1" /> About
                </a>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/10">
                  <BookOpen className="h-4 w-4 mr-1" /> Courses
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-4 grid gap-3">
                    <div className="p-4 hover:bg-gray-50 rounded-md">
                      <h3 className="text-sm font-medium mb-1">1-to-1 Online Violin Class</h3>
                      <p className="text-xs text-gray-500">Personalized instruction tailored to your pace</p>
                    </div>
                    <div className="p-4 hover:bg-gray-50 rounded-md">
                      <h3 className="text-sm font-medium mb-1">Online Group Class</h3>
                      <p className="text-xs text-gray-500">Learn alongside peers in an interactive setting</p>
                    </div>
                    <div className="p-4 hover:bg-gray-50 rounded-md">
                      <h3 className="text-sm font-medium mb-1">Home Tuition</h3>
                      <p className="text-xs text-gray-500">In-person classes at your location</p>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <a href="/#join" className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-white/10`}>
                  <Users className="h-4 w-4 mr-1" /> Join
                </a>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/blogs" className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-white/10`}>
                  <Calendar className="h-4 w-4 mr-1" /> Blogs
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <a href="/#contact" className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-white/10`}>
                  <Phone className="h-4 w-4 mr-1" /> Contact
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center space-x-2">
            <Link to="/login">
              <Button 
                variant={isScrolled ? "ghost" : "outline"} 
                size="sm" 
                className={isScrolled ? "hover:bg-purple-50" : "text-white border-white hover:bg-white/10"}
              >
                <LogIn className="h-4 w-4 mr-1" /> Student Login
              </Button>
            </Link>
            <Link to="/admin-login">
              <Button 
                variant={isScrolled ? "outline" : "ghost"}
                size="sm" 
                className={isScrolled ? "border-purple-300 hover:bg-purple-50" : "text-white bg-white/10 hover:bg-white/20"}
              >
                <GraduationCap className="h-4 w-4 mr-1" /> Admin
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile Navigation Trigger */}
        <div className="lg:hidden">
          <Button variant="ghost" size="sm" onClick={toggleMobileMenu} className={isScrolled ? "text-purple-800" : "text-white"}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-purple-900/95 z-40 lg:hidden pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col space-y-6">
              <a href="/#home" className="text-white text-lg font-medium flex items-center" onClick={toggleMobileMenu}>
                <Home className="h-5 w-5 mr-3" /> Home
              </a>
              <a href="/#about" className="text-white text-lg font-medium flex items-center" onClick={toggleMobileMenu}>
                <Info className="h-5 w-5 mr-3" /> About
              </a>
              <a href="/#courses" className="text-white text-lg font-medium flex items-center" onClick={toggleMobileMenu}>
                <BookOpen className="h-5 w-5 mr-3" /> Courses
              </a>
              <a href="/#join" className="text-white text-lg font-medium flex items-center" onClick={toggleMobileMenu}>
                <Users className="h-5 w-5 mr-3" /> Join
              </a>
              <Link to="/blogs" className="text-white text-lg font-medium flex items-center" onClick={toggleMobileMenu}>
                <Calendar className="h-5 w-5 mr-3" /> Blogs
              </Link>
              <a href="/#contact" className="text-white text-lg font-medium flex items-center" onClick={toggleMobileMenu}>
                <Phone className="h-5 w-5 mr-3" /> Contact
              </a>
              
              <div className="pt-6 flex flex-col space-y-3">
                <Link to="/login" onClick={toggleMobileMenu}>
                  <Button className="w-full bg-white text-purple-900 hover:bg-gray-100">
                    <LogIn className="h-4 w-4 mr-2" /> Student Login
                  </Button>
                </Link>
                <Link to="/admin-login" onClick={toggleMobileMenu}>
                  <Button variant="outline" className="w-full border-white text-white hover:bg-white/10">
                    <GraduationCap className="h-4 w-4 mr-2" /> Admin
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavigationBar;
