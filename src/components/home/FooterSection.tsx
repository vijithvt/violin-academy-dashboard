
import { Youtube, Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const FooterSection = () => {
  return (
    <footer id="contact" className="bg-maroon-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Vijith Violinist</h3>
            <p className="text-maroon-200 mb-4">
              Carnatic Classical Violin Academy providing authentic South Indian violin instruction through personalized training programs.
            </p>
            <div className="flex space-x-4">
              <a href="https://youtube.com/@vijithviolinist" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-amber-300 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/violinwithvijith" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-amber-300 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com/vijithviolinist" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-amber-300 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-amber-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-maroon-100">Phone</p>
                  <p className="text-white">+91 9496315903</p>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-amber-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-maroon-100">Email</p>
                  <p className="text-white">vijithviolinist@gmail.com</p>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-maroon-100">WhatsApp</p>
                  <p className="text-white">+91 8301815324</p>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#home" className="text-maroon-200 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="/#courses" className="text-maroon-200 hover:text-white transition-colors">Courses</a>
              </li>
              <li>
                <a href="/#about" className="text-maroon-200 hover:text-white transition-colors">About</a>
              </li>
              <li>
                <a href="/login" className="text-maroon-200 hover:text-white transition-colors">Student Login</a>
              </li>
            </ul>
          </div>
          
          {/* Free Trial */}
          <div>
            <h3 className="text-lg font-medium mb-4">Start Learning Today</h3>
            <p className="text-maroon-200 mb-4">
              Experience the rich tradition of Carnatic violin with a free trial class. No obligations, just pure music.
            </p>
            <Button 
              asChild
              className="bg-amber-500 hover:bg-amber-600 text-white transition-all duration-300 hover:shadow-amber-700/30 hover:shadow-lg"
            >
              <a href="#free-trial">Book a Free Trial</a>
            </Button>
          </div>
        </div>
        
        <div className="mt-12 border-t border-maroon-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-maroon-300">
            &copy; {new Date().getFullYear()} Vijith Violinist's Carnatic Classical Violin Academy. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="text-maroon-300 hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#" className="text-maroon-300 hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
