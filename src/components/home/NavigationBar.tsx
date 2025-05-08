
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Music, BookOpen, Home, Info, Phone, ChevronDown } from "lucide-react";
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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import FreeTrialForm from "./FreeTrialForm";

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTrialDialogOpen, setIsTrialDialogOpen] = useState(false);

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

  const handleOpenTrialDialog = () => {
    setIsTrialDialogOpen(true);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-maroon-900/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center z-20">
            <Link to="/" className="flex items-center space-x-2">
              <Music className="h-7 w-7 text-white" />
              <span className="text-xl font-serif font-bold text-white">
                Vijith Violinist
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation - Simplified */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu className="text-white">
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <a href="/#home" className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-white/10`}>
                    <Home className="h-4 w-4 mr-1" /> Home
                  </a>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-white/10">
                    <BookOpen className="h-4 w-4 mr-1" /> Courses
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4 grid gap-3">
                      <div className="p-4 hover:bg-maroon-50 rounded-md">
                        <h3 className="text-sm font-medium mb-1">1-to-1 Online Violin Class</h3>
                        <p className="text-xs text-gray-500">Personalized instruction tailored to your pace</p>
                      </div>
                      <div className="p-4 hover:bg-maroon-50 rounded-md">
                        <h3 className="text-sm font-medium mb-1">Online Group Class</h3>
                        <p className="text-xs text-gray-500">Learn alongside peers in an interactive setting</p>
                      </div>
                      <div className="p-4 hover:bg-maroon-50 rounded-md">
                        <h3 className="text-sm font-medium mb-1">Home Tuition</h3>
                        <p className="text-xs text-gray-500">In-person classes at your location</p>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <a href="/#about" className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-white/10`}>
                    <Info className="h-4 w-4 mr-1" /> About
                  </a>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <a href="/#contact" className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-white/10`}>
                    <Phone className="h-4 w-4 mr-1" /> Contact
                  </a>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Button 
              onClick={handleOpenTrialDialog}
              className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-105"
            >
              Book a Free Trial
            </Button>
          </div>
          
          {/* Mobile Navigation Trigger */}
          <div className="lg:hidden flex items-center space-x-3">
            <Button 
              onClick={handleOpenTrialDialog}
              size="sm" 
              className="bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
            >
              Free Trial
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleMobileMenu} className="text-white">
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
        
        {/* Mobile Navigation Menu - Simplified */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-maroon-900/98 z-40 lg:hidden pt-20">
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col space-y-6">
                <a href="/#home" className="text-white text-lg font-medium flex items-center" onClick={toggleMobileMenu}>
                  <Home className="h-5 w-5 mr-3" /> Home
                </a>
                <a href="/#courses" className="text-white text-lg font-medium flex items-center" onClick={toggleMobileMenu}>
                  <BookOpen className="h-5 w-5 mr-3" /> Courses
                </a>
                <a href="/#about" className="text-white text-lg font-medium flex items-center" onClick={toggleMobileMenu}>
                  <Info className="h-5 w-5 mr-3" /> About
                </a>
                <a href="/#contact" className="text-white text-lg font-medium flex items-center" onClick={toggleMobileMenu}>
                  <Phone className="h-5 w-5 mr-3" /> Contact
                </a>
                
                <div className="pt-6">
                  <Button 
                    onClick={handleOpenTrialDialog}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    Book a Free Trial
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      
      {/* Free Trial Dialog */}
      <Dialog open={isTrialDialogOpen} onOpenChange={setIsTrialDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <FreeTrialForm onClose={() => setIsTrialDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NavigationBar;
