
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogIn, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useMediaQuery } from "@/hooks/use-mobile";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    console.log("Current location:", location.pathname);
  }, [location]);

  // Handle scroll event to add shadow when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 shadow-sm backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <Link to="/home" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">Violin Academy</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/home" className="font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/blogs" className="font-medium hover:text-primary transition-colors">
              Blog
            </Link>
            
            {/* Login Buttons - Desktop View */}
            <div className="flex gap-3 items-center">
              {currentUser ? (
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/dashboard/student")}
                  className="flex items-center gap-2"
                >
                  <UserCircle size={18} />
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/login")}
                    className="border-amber-300 hover:bg-amber-50 text-maroon-800 flex items-center gap-2"
                  >
                    <LogIn size={18} />
                    Student Login
                  </Button>
                  <Button 
                    onClick={() => navigate("/admin-login")}
                    className="bg-maroon-800 hover:bg-maroon-700 flex items-center gap-2"
                  >
                    <UserCircle size={18} />
                    Admin Login
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {!isMenuOpen && (
              <>
                {!currentUser && (
                  <Button 
                    variant="ghost"
                    size="sm" 
                    onClick={() => navigate("/login")}
                    className="mr-2 text-maroon-800"
                  >
                    <LogIn size={18} />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/admin-login")}
                  className="mr-2 bg-maroon-800 text-white hover:bg-maroon-700"
                >
                  <UserCircle size={18} />
                </Button>
              </>
            )}
            <button
              className="text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link
                to="/home"
                className="px-2 py-1 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/blogs"
                className="px-2 py-1 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              
              <div className="pt-2 border-t border-gray-100">
                <h3 className="text-xs uppercase text-gray-500 mb-2">Account Access</h3>
                {currentUser ? (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      navigate("/dashboard/student");
                      setIsMenuOpen(false);
                    }}
                  >
                    <UserCircle className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start mb-2 border-amber-300 hover:bg-amber-50 text-maroon-800"
                      onClick={() => {
                        navigate("/login");
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      Student Login
                    </Button>
                    <Button 
                      className="w-full justify-start bg-maroon-800 hover:bg-maroon-700"
                      onClick={() => {
                        navigate("/admin-login");
                        setIsMenuOpen(false);
                      }}
                    >
                      <UserCircle className="mr-2 h-4 w-4" />
                      Admin Login
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavigationBar;
