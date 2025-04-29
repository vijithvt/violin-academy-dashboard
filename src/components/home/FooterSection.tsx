
import { Youtube, Instagram, Facebook } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-maroon-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-serif font-bold">Vijith Violinist</h3>
            <p className="text-maroon-200">Carnatic Classical Violin Academy</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="https://youtube.com/@vijithviolinist" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-300 transition-colors">
              <Youtube className="h-6 w-6" />
            </a>
            <a href="https://instagram.com/violinwithvijith" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-300 transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="https://facebook.com/vijithviolinist" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-300 transition-colors">
              <Facebook className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 border-t border-maroon-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
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
