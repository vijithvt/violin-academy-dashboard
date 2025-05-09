
import { Award, Globe, Music, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const AboutSection = () => {
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
    
    const currentElement = document.getElementById("about-section");
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-amber-50 to-maroon-50 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
      <div 
        className="absolute -top-24 -right-24 w-48 h-48 bg-maroon-200 rounded-full blur-3xl opacity-40"
        style={{ animation: 'float 8s ease-in-out infinite alternate' }}
      ></div>
      <div 
        className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-200 rounded-full blur-3xl opacity-40"
        style={{ animation: 'float 10s ease-in-out infinite alternate-reverse' }}
      ></div>
      
      <div className="container mx-auto px-4" id="about-section">
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 transform",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <h2 className="text-4xl font-serif font-bold text-maroon-900 mb-3">
            Meet Your Teacher
          </h2>
          <p className="text-lg text-gray-600 mb-4">Learn from an experienced performer and dedicated educator</p>
          <div className="h-1 w-24 bg-amber-400 mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className={cn(
            "lg:w-1/3 transition-all duration-1000 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border-4 border-white shadow-2xl w-full max-w-md mx-auto hover:shadow-amber-500/20 hover:shadow-xl transition-all duration-500">
                <img 
                  src="/lovable-uploads/392d5b68-5127-4b00-a0ab-8cee901d24b0.png" 
                  alt="Vijith VT" 
                  className="w-full h-full object-cover transition-transform duration-2000 hover:scale-105"
                />
              </div>
              
              {/* Decorative elements */}
              <div 
                className="absolute -top-4 -right-4 w-32 h-32 bg-amber-400 rounded-full opacity-20 blur-md"
                style={{ animation: 'pulse 6s ease-in-out infinite' }}
              ></div>
              <div 
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-maroon-500 rounded-full opacity-20 blur-md"
                style={{ animation: 'pulse 8s ease-in-out infinite 1s' }}
              ></div>
            </div>
          </div>
          
          <div className={cn(
            "lg:w-2/3 transition-all duration-1000 delay-300 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-maroon-900 mb-6">
              About Vijith V T
            </h2>
            
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-maroon-100 transition-all duration-300 hover:shadow-xl hover:border-maroon-200">
                <h3 className="text-xl font-serif font-bold text-maroon-800 mb-4 flex items-center">
                  <Music className="w-6 h-6 text-amber-500 mr-3" />
                  Musical Journey
                </h3>
                <p className="text-gray-700">
                  Vijith V T began his Carnatic violin journey under Shri Divakaran and later trained at the Tharangani School of Music (founded by Padma Bhushan Dr. K. J. Yesudas) under Shri Rajagopal Rajappa. Advanced training with Vid. S. R. Mahadeva Sarma (A-Top Grade Artist, AIR) helped shape his unique style blending the Parur M.S. Gopalakrishnan and Lalgudi Bani traditions.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-maroon-100 h-full transition-all duration-300 hover:shadow-xl hover:border-maroon-200">
                  <h3 className="text-xl font-serif font-bold text-maroon-800 mb-3 flex items-center">
                    <Award className="w-6 h-6 text-amber-500 mr-3" />
                    Performer & Educator
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Teaching since 2018: Students from India, USA, Thailand & Bangalore</li>
                    <li>Faculty collaborator at leading music academies worldwide</li>
                    <li>Best Classical Violin Teacher Award recipient (Presented by Swara Ragam Academy for outstanding music education, 2022)</li>
                  </ul>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-maroon-100 h-full transition-all duration-300 hover:shadow-xl hover:border-maroon-200">
                  <h3 className="text-xl font-serif font-bold text-maroon-800 mb-3 flex items-center">
                    <BookOpen className="w-6 h-6 text-amber-500 mr-3" />
                    Teaching Approach
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Monthly student assessments in partnership with academies</li>
                    <li>Structured curriculum aligned with university-level standards</li>
                    <li>Custom student dashboard for tracking progress & practice</li>
                    <li>Educational resources covering violin technique and theory</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add keyframes for custom animations */}
      <style>
        {`
        @keyframes float {
          0% { transform: translateY(0); }
          100% { transform: translateY(-20px); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.3; }
          100% { transform: scale(1); opacity: 0.2; }
        }
        `}
      </style>
    </section>
  );
};

export default AboutSection;
