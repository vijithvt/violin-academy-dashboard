
import { useState, useEffect } from "react";
import {
  Check,
  ShoppingCart, 
  Music, 
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const RequirementsSection = () => {
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
    
    const currentElement = document.getElementById("requirements-section");
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  // Requirements data
  const requirements = [
    {
      title: "Instrument",
      description: "Quality student violin (3/4 or 4/4 size based on student age)",
      icon: <Music className="h-5 w-5 text-amber-500" />
    },
    {
      title: "Accessories",
      description: "Shoulder rest, rosin, extra strings, and a digital tuner",
      icon: <ShoppingCart className="h-5 w-5 text-amber-500" />
    },
    {
      title: "Practice Space",
      description: "Quiet room with good lighting and a sturdy chair without armrests",
      icon: <Check className="h-5 w-5 text-amber-500" />
    },
    {
      title: "Time Commitment",
      description: "20-30 minutes daily practice (beginners), 45-60 minutes (advanced)",
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />
    }
  ];

  return (
    <section id="requirements" className="py-20 bg-gradient-to-b from-white to-amber-50 relative">
      {/* Decorative elements */}
      <div
        className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-amber-50 to-transparent pointer-events-none"
      ></div>
      
      <div className="container mx-auto px-4" id="requirements-section">
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-12 transition-all duration-1000 transform",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <h2 className="text-4xl font-serif font-bold text-maroon-900 mb-3">
            Before You Start
          </h2>
          <p className="text-lg text-gray-600">What you'll need to begin your musical journey</p>
          <div className="h-1 w-24 bg-amber-400 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {requirements.map((req, index) => (
            <div 
              key={index}
              className={cn(
                "bg-white rounded-xl shadow-md p-6 border border-amber-100 transition-all duration-1000 delay-300 transform hover:shadow-xl",
                isVisible ? `translate-y-0 opacity-100` : `translate-y-10 opacity-0`
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start">
                <div className="rounded-full bg-amber-100 p-3 mr-5 flex-shrink-0">
                  {req.icon}
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-maroon-800 mb-2">{req.title}</h3>
                  <p className="text-gray-600">{req.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={cn(
          "text-center mt-12 transition-all duration-1000 delay-700 transform",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <Button className="bg-maroon-700 hover:bg-maroon-800 text-white">
            View Violin Purchase Guide
          </Button>
          <p className="mt-4 text-sm text-gray-500 max-w-lg mx-auto">
            Don't have an instrument yet? We provide guidance on selecting the right violin for your needs and budget.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RequirementsSection;
