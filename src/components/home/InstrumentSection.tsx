
import { ChevronRight, Music, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const InstrumentSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    const section = document.getElementById("instrument-section");
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const features = [
    {
      icon: <Music className="w-8 h-8 text-purple-600" />,
      title: "Authentic Technique",
      description: "Learn proper finger positioning, bowing techniques, and posture for Carnatic violin"
    },
    {
      icon: <Award className="w-8 h-8 text-amber-500" />,
      title: "Traditional Approach",
      description: "Study classical ragas and compositions passed down through generations"
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-600" />,
      title: "Structured Learning",
      description: "Progress through a systematic curriculum designed for all skill levels"
    }
  ];

  return (
    <section id="instrument-section" className="py-20 relative overflow-hidden">
      {/* Background with subtle pattern and parallax effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-purple-50 to-amber-50 opacity-70"
        style={{
          backgroundSize: '200% 200%',
          animation: 'gradient 15s ease infinite'
        }}
      ></div>
      <div 
        className="absolute inset-0 bg-[url('/placeholder.svg')] bg-repeat opacity-5"
        style={{
          animation: 'slow-drift 30s linear infinite'
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 transform",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <div className="h-1 w-24 bg-purple-600 mx-auto mb-8 rounded-full"></div>
          <h2 className="text-4xl font-serif font-bold text-purple-900 mb-4">
            Learn Carnatic Classical Violin
          </h2>
          <p className="text-lg text-gray-700">
            Discover the rich tradition and expressive capabilities of one of India's most beloved classical instruments
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={cn(
                "bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-100 transition-all duration-500",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
                "hover:translate-y-[-8px] hover:shadow-xl hover:border-purple-200"
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="rounded-full bg-amber-50 w-16 h-16 flex items-center justify-center mb-4 mx-auto transition-all duration-300 hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-purple-800 mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className={cn(
          "flex justify-center transition-all duration-1000 transform",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          "delay-500"
        )}>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-full shadow-lg transition-all duration-300 hover:shadow-purple-500/30 hover:shadow-xl transform hover:scale-105">
            Explore Lessons <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Add keyframes for custom animations */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes slow-drift {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-5px) translateY(-5px); }
          100% { transform: translateX(0) translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default InstrumentSection;
