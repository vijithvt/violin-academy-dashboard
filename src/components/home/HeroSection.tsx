
import { ChevronRight, Play, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Add animation trigger after initial render
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center bg-gradient-to-r from-purple-900 via-purple-800 to-amber-900 text-white overflow-hidden">
      {/* Background overlay with subtle pattern */}
      <div className="absolute inset-0 opacity-20 bg-[url('/placeholder.svg')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Decorative elements */}
      <div className="absolute right-0 top-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl"></div>
      <div className="absolute left-20 bottom-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
              Master the Art of <span className="text-amber-400">Carnatic Violin</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light text-gray-200 max-w-xl">
              From beginner to Advanced level – Learn the authentic techniques of South Indian classical violin tradition
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#join">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full shadow-lg">
                  Join Now <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </a>
              <a href="#courses">
                <Button variant="outline" className="bg-transparent hover:bg-white/10 text-white border-white px-6 py-2 rounded-full">
                  <BookOpen className="h-4 w-4 mr-2" /> Explore Courses
                </Button>
              </a>
              <Button variant="ghost" className="bg-purple-700/50 hover:bg-purple-700/70 text-white rounded-full">
                <Play className="h-4 w-4 mr-2" /> Watch Demo
              </Button>
            </div>
          </div>
          
          <div className={`flex justify-center transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative">
              {/* Featured image */}
              <div className="w-full h-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <img 
                  src="/lovable-uploads/392d5b68-5127-4b00-a0ab-8cee901d24b0.png" 
                  alt="Vijith Violinist" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-500 rounded-full opacity-30 blur-md"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500 rounded-full opacity-30 blur-md"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-sm text-gray-300 mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white rounded-full animate-bounce mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
