
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import FreeTrialForm from "./FreeTrialForm";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);
  const [isTrialDialogOpen, setIsTrialDialogOpen] = useState(false);
  
  useEffect(() => {
    // Add animation trigger after initial render
    const timer = setTimeout(() => setIsVisible(true), 100);
    const animationTimer = setTimeout(() => setPlayAnimation(true), 800);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(animationTimer);
    };
  }, []);

  return (
    <>
      <section id="home" className="relative min-h-[90vh] flex items-center bg-gradient-to-r from-maroon-900 via-maroon-800 to-amber-900 text-white overflow-hidden pt-16 md:pt-0">
        {/* Background overlay with animated pattern */}
        <div className="absolute inset-0 opacity-20 bg-[url('/placeholder.svg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Animated decorative elements */}
        <div 
          className={`absolute right-0 top-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl transition-all duration-1000 ease-in-out ${playAnimation ? 'scale-110 opacity-80' : 'opacity-30'}`}
          style={{
            animation: 'pulse 8s ease-in-out infinite alternate'
          }}
        ></div>
        <div 
          className={`absolute left-20 bottom-10 w-80 h-80 bg-maroon-500/20 rounded-full blur-3xl transition-all duration-1500 ease-in-out ${playAnimation ? 'scale-125 opacity-80' : 'opacity-30'}`}
          style={{
            animation: 'pulse 10s ease-in-out infinite alternate-reverse'
          }}
        ></div>
        
        {/* Musical notes animation */}
        {playAnimation && (
          <>
            <div className="absolute top-[20%] right-[15%] text-amber-300 opacity-80 text-xl"
              style={{ animation: 'float-up 15s ease-in-out infinite' }}
            >♪</div>
            <div className="absolute top-[40%] right-[25%] text-amber-300 opacity-60 text-2xl"
              style={{ animation: 'float-up 12s ease-in-out infinite 2s' }}
            >♫</div>
            <div className="absolute top-[60%] right-[10%] text-amber-300 opacity-70 text-3xl"
              style={{ animation: 'float-up 18s ease-in-out infinite 1s' }}
            >♩</div>
            <div className="absolute top-[30%] left-[10%] text-amber-300 opacity-50 text-2xl"
              style={{ animation: 'float-up 14s ease-in-out infinite 3s' }}
            >♪</div>
          </>
        )}
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight mt-16 md:mt-0">
                Master the Art of <span className="text-amber-400 relative">
                  Carnatic Violin
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-amber-500 transform scale-x-0 origin-left transition-transform duration-1000 ease-out" 
                    style={{ transform: isVisible ? 'scaleX(1)' : 'scaleX(0)' }}></span>
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 font-light text-gray-200 max-w-xl">
                From beginner to Advanced level – Learn the authentic techniques of South Indian classical violin tradition
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => setIsTrialDialogOpen(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-6 rounded-full shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-105"
                >
                  Book a Free Trial <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
                {/* Watch Demo button removed as requested */}
              </div>
            </div>
            
            <div className={`flex justify-center transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative">
                {/* Featured image with animation */}
                <div className="w-full h-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 transition-all duration-500 hover:shadow-amber-500/30 hover:shadow-xl">
                  <img 
                    src="/lovable-uploads/392d5b68-5127-4b00-a0ab-8cee901d24b0.png" 
                    alt="Vijith Violinist" 
                    className="w-full h-full object-cover transition-transform duration-3000 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-maroon-900/50"></div>
                </div>
                
                {/* Decorative elements with animation */}
                <div 
                  className="absolute -top-4 -right-4 w-24 h-24 bg-amber-500 rounded-full opacity-30 blur-md"
                  style={{ animation: 'pulse 5s ease-in-out infinite' }}
                ></div>
                <div 
                  className="absolute -bottom-6 -left-6 w-32 h-32 bg-maroon-500 rounded-full opacity-30 blur-md"
                  style={{ animation: 'pulse 6s ease-in-out infinite 1s' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator with animation */}
        <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-sm text-gray-300 mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white rounded-full animate-bounce mt-2"></div>
          </div>
        </div>

        {/* Add keyframes for custom animations */}
        <style>
          {`
          @keyframes float-up {
            0% { transform: translateY(0); opacity: 0.5; }
            50% { opacity: 0.9; }
            100% { transform: translateY(-100px); opacity: 0; }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.1); opacity: 0.5; }
            100% { transform: scale(1); opacity: 0.3; }
          }
          `}
        </style>
      </section>

      {/* Free Trial Dialog */}
      <Dialog open={isTrialDialogOpen} onOpenChange={setIsTrialDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <FreeTrialForm onClose={() => setIsTrialDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HeroSection;
