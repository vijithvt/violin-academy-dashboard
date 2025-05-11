
import { CheckCircle, HelpCircle, AlertCircle, ChevronUp, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const RequirementsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
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
    
    const section = document.getElementById("requirements-section");
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const requirements = [
    {
      name: "Violin",
      description: "Main instrument",
      image: "/lovable-uploads/6f4fc66e-f728-44f8-a1da-6721b9682495.png"
    },
    {
      name: "Bow",
      description: "For sound production",
      image: "/lovable-uploads/2386dc2f-15e2-4fbc-b5af-d210ea749099.png"
    },
    {
      name: "Rosin",
      description: "Helps bow grip strings",
      image: "/lovable-uploads/25386e0b-f745-41d2-9872-a2e7cdb3a6e4.png"
    },
    {
      name: "Metronome",
      description: "For rhythm practice",
      image: "/lovable-uploads/cc04dd6a-b479-4eae-a679-718755823964.png"
    },
    {
      name: "Tambura App",
      description: "For pitch reference",
      image: "/lovable-uploads/6b8c4f2e-e217-47eb-9d47-c1a8ed576634.png"
    },
    {
      name: "Practice Journal",
      description: "To track progress",
      image: "/lovable-uploads/65a367ac-e8fa-48a2-80fa-7cbc03541542.png"
    }
  ];

  const [expanded, setExpanded] = useState<string | null>(null);
  const toggleExpand = (section: string) => {
    setExpanded(expanded === section ? null : section);
  };

  return (
    <section id="requirements" className="py-16 bg-gradient-to-r from-amber-50 to-white" id="requirements-section">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-10 text-center">
          What You Need to Start
        </h2>
        
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-1 gap-8">
            {/* Essential Materials - Now more dynamic */}
            <div className={cn(
              "bg-white p-6 rounded-xl shadow-md border border-amber-100 transition-all duration-500 transform",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}>
              <h3 className="text-xl font-bold text-maroon-800 mb-6 flex items-center cursor-pointer"
                onClick={() => toggleExpand('materials')}>
                <span className="w-8 h-8 bg-maroon-800 text-white rounded-full flex items-center justify-center mr-3">1</span>
                Essential Materials
                {expanded === 'materials' ? <ChevronUp className="ml-2 h-5 w-5" /> : <ChevronDown className="ml-2 h-5 w-5" />}
              </h3>
              <div className={cn(
                "grid grid-cols-2 sm:grid-cols-3 gap-4 transition-all duration-500",
                expanded === 'materials' ? "max-h-[1000px] opacity-100" : "max-h-[1000px] opacity-100"
              )}>
                {requirements.map((item, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "bg-amber-50 p-4 rounded-lg shadow-sm flex flex-col items-center text-center transform transition-all duration-300",
                      hoveredItem === index ? "scale-105 shadow-md bg-amber-100" : "",
                      isVisible ? `opacity-100 translate-y-0` : "opacity-0 translate-y-4"
                    )}
                    style={{ transitionDelay: `${index * 100}ms` }}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="w-24 h-24 mb-3 bg-white rounded-lg overflow-hidden flex items-center justify-center border border-amber-100">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className={cn(
                          "object-contain h-20 w-20 transition-transform duration-500",
                          hoveredItem === index ? "scale-110" : ""
                        )}
                      />
                    </div>
                    <h4 className="font-medium text-maroon-800 mb-1">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Violin Purchase Guide - Updated with more guidelines */}
            <div className={cn(
              "bg-white p-6 rounded-xl shadow-md border border-amber-100 transition-all duration-700 transform",
              isVisible ? "translate-y-0 opacity-100 delay-300" : "translate-y-10 opacity-0"
            )}>
              <h3 className="text-xl font-bold text-maroon-800 mb-6 flex items-center cursor-pointer"
                onClick={() => toggleExpand('guide')}>
                <span className="w-8 h-8 bg-maroon-800 text-white rounded-full flex items-center justify-center mr-3">2</span>
                Violin Purchase Guide
                {expanded === 'guide' ? <ChevronUp className="ml-2 h-5 w-5" /> : <ChevronDown className="ml-2 h-5 w-5" />}
              </h3>
              
              <div className={cn(
                "space-y-4 transition-all duration-500",
                expanded === 'guide' ? "max-h-[1000px] opacity-100" : "max-h-[1000px] opacity-100"
              )}>
                <Card className={cn(
                  "border-amber-100 transform transition-all duration-300",
                  isVisible ? "translate-y-0 opacity-100 delay-400" : "translate-y-5 opacity-0"
                )}>
                  <CardContent className="p-4">
                    <h4 className="font-medium flex items-center text-maroon-800 mb-2">
                      <AlertCircle className="h-4 w-4 mr-2 text-amber-600" /> Where to Buy
                    </h4>
                    <p className="text-sm text-gray-700">
                      Visit a local music store instead of buying online to check the violin setup (tuning pegs, 
                      string adjusters, bridge height) before purchase.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className={cn(
                  "border-amber-100 transform transition-all duration-300",
                  isVisible ? "translate-y-0 opacity-100 delay-500" : "translate-y-5 opacity-0"
                )}>
                  <CardContent className="p-4">
                    <h4 className="font-medium flex items-center text-maroon-800 mb-2">
                      <AlertCircle className="h-4 w-4 mr-2 text-amber-600" /> Recommended Models
                    </h4>
                    <p className="text-sm text-gray-700">
                      For age 11+, choose a full size (4/4) violin. Entry-level Chinese/Korean violins 
                      (₹6000-7000) are adequate for beginners.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className={cn(
                  "border-amber-100 transform transition-all duration-300",
                  isVisible ? "translate-y-0 opacity-100 delay-600" : "translate-y-5 opacity-0"
                )}>
                  <CardContent className="p-4">
                    <h4 className="font-medium flex items-center text-maroon-800 mb-2">
                      <HelpCircle className="h-4 w-4 mr-2 text-amber-600" /> Before Buying, Check
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>String heights and spacing - should be even and consistent</li>
                      <li>Smooth-turning tuning pegs and adjusters without slipping or sticking</li>
                      <li>Included rosin and accessories quality - avoid brittle or cracked rosin</li>
                      <li>Extra beginner strings - strings can break during initial learning</li>
                      <li>Bridge position - straight and properly fitted</li>
                      <li>Sound post installation - properly set inside the violin</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className={cn(
                  "border-amber-100 transform transition-all duration-300",
                  isVisible ? "translate-y-0 opacity-100 delay-700" : "translate-y-5 opacity-0"
                )}>
                  <CardContent className="p-4">
                    <h4 className="font-medium flex items-center text-maroon-800 mb-2">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" /> Materials & Maintenance
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>Quality rosin should be applied to bow hair every 2-3 practice sessions</li>
                      <li>Clean strings and fingerboard with a soft cloth after each practice</li>
                      <li>Store in a hard case to protect from humidity and temperature changes</li>
                      <li>Have fine tuners on all strings for easier and precise tuning</li>
                      <li>Consider getting a violin humidifier for dry seasons</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); }
          100% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </section>
  );
};

export default RequirementsSection;
