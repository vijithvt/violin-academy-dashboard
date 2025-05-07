
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LearningProcessSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  
  const learningSteps = [
    {
      title: "Join class",
      description: "Select your preferred mode and schedule",
      icon: "🎵"
    },
    {
      title: "Attend sessions",
      description: "Regular practice with instructor guidance",
      icon: "🎻"
    },
    {
      title: "Submit recordings",
      description: "Monthly video submissions for assessment",
      icon: "📱"
    },
    {
      title: "Get feedback",
      description: "Personalized tips and improvement areas",
      icon: "💬"
    },
    {
      title: "Track progress",
      description: "Monitor your growth on student dashboard",
      icon: "📈"
    },
    {
      title: "Earn certificates",
      description: "Receive recognition for level completion",
      icon: "🏆"
    }
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateSteps();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    
    const currentElement = document.getElementById("learning-process-section");
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);
  
  const animateSteps = () => {
    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex >= learningSteps.length) {
        clearInterval(interval);
        // Set to null to remove highlight after all steps are shown
        setTimeout(() => setActiveStep(null), 1000);
        return;
      }
      setActiveStep(stepIndex);
      stepIndex += 1;
    }, 800);
  };

  return (
    <section id="learning-process-section" className="py-20 bg-gradient-to-b from-amber-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-repeat opacity-5"></div>
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 transform",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <h2 className="text-4xl font-serif font-bold text-purple-900 mb-3">
            Your Learning Journey
          </h2>
          <p className="text-lg text-gray-600 mb-4">A structured path to master Carnatic violin at your own pace</p>
          <div className="h-1 w-24 bg-amber-400 mx-auto"></div>
        </div>
        
        <div className={cn(
          "relative max-w-4xl mx-auto transition-all duration-1000 delay-300 transform",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          {/* Timeline line */}
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-purple-600 via-purple-500 to-amber-500 hidden md:block"></div>
          
          {/* Timeline items */}
          <div className="space-y-12">
            {learningSteps.map((step, index) => (
              <div 
                key={index} 
                className={cn(
                  "flex md:items-start transition-all duration-500 transform",
                  activeStep === index ? "scale-105" : "",
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10",
                  { "transition-delay-100": index === 0 },
                  { "transition-delay-200": index === 1 },
                  { "transition-delay-300": index === 2 },
                  { "transition-delay-400": index === 3 },
                  { "transition-delay-500": index === 4 },
                  { "transition-delay-600": index === 5 }
                )}
              >
                <div 
                  className={cn(
                    "flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl z-10 shadow-md transition-all duration-300",
                    activeStep === index 
                      ? "bg-gradient-to-br from-purple-600 to-amber-500 text-white scale-110"
                      : "bg-white text-purple-800 border border-purple-100"
                  )}
                >
                  {step.icon}
                </div>
                
                <div className="ml-6">
                  <div className={cn(
                    "bg-white p-5 rounded-xl shadow-md border border-purple-100 transition-all duration-300",
                    activeStep === index ? "bg-gradient-to-br from-purple-50 to-amber-50" : ""
                  )}>
                    <h3 className="text-xl font-semibold text-purple-900">{step.title}</h3>
                    <p className="text-gray-600 mt-1">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningProcessSection;
