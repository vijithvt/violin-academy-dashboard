
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

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
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">Violin Academy</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/blogs" className="font-medium hover:text-primary transition-colors">
              Blog
            </Link>
            
            {/* Login/Dashboard Buttons */}
            <div className="flex gap-2 items-center">
              {currentUser ? (
                <Button 
                  onClick={() => navigate(currentUser ? "/dashboard" : "/admin-login")}
                >
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/login")}
                  >
                    Student Login
                  </Button>
                  <Button 
                    onClick={() => navigate("/admin-login")}
                  >
                    Admin Login
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
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
              
              {currentUser ? (
                <Button 
                  onClick={() => {
                    navigate("/dashboard");
                    setIsMenuOpen(false);
                  }}
                >
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}
                  >
                    Student Login
                  </Button>
                  <Button 
                    onClick={() => {
                      navigate("/admin-login");
                      setIsMenuOpen(false);
                    }}
                  >
                    Admin Login
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavigationBar;
