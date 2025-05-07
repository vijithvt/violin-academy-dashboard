
import { Award, Globe, Music, BookOpen, Calendar, Users } from "lucide-react";
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

  const achievements = [
    { year: "2005", event: "Started Violin Training" },
    { year: "2010", event: "Completed 4-year course at Tharangani School" },
    { year: "2012", event: "Advanced training with Vid. S. R. Mahadeva Sarma" },
    { year: "2018", event: "Started Teaching Career" },
    { year: "2020", event: "Best Classical Violin Teacher Award" },
    { year: "2022", event: "Founded Online Academy" }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-purple-50 to-amber-50 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-200 rounded-full blur-3xl opacity-40"></div>
      
      <div className="container mx-auto px-4" id="about-section">
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 transform",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <h2 className="text-4xl font-serif font-bold text-purple-900 mb-3">
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
              <div className="rounded-2xl overflow-hidden border-4 border-white shadow-2xl w-full max-w-md mx-auto">
                <img 
                  src="/lovable-uploads/392d5b68-5127-4b00-a0ab-8cee901d24b0.png" 
                  alt="Vijith VT" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-amber-400 rounded-full opacity-20 blur-md"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-md"></div>
              
              {/* Achievement timeline */}
              <div className="absolute -right-8 top-1/3 bottom-1/3 w-1 bg-amber-400 hidden lg:block"></div>
              
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={cn(
                    "absolute right-0 hidden lg:flex items-center",
                    index % 2 === 0 ? "translate-x-10" : "translate-x-16",
                    `top-[${(index + 1) * 14 + 10}%]`
                  )}
                  style={{ top: `${(index + 1) * 14 + 10}%` }}
                >
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <div className={cn(
                    "ml-4 bg-white p-2 rounded-md shadow-md text-center w-28",
                    index % 2 === 0 ? "" : "mt-8"
                  )}>
                    <div className="text-xs text-purple-700 font-bold">{achievement.year}</div>
                    <div className="text-xs">{achievement.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={cn(
            "lg:w-2/3 transition-all duration-1000 delay-300 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-purple-900 mb-6">
              About Vijith V T
            </h2>
            
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-100">
                <h3 className="text-xl font-serif font-bold text-purple-800 mb-4 flex items-center">
                  <Music className="w-6 h-6 text-amber-500 mr-3" />
                  Early Training
                </h3>
                <p className="text-gray-700">
                  Vijith V T began his Carnatic violin journey under Shri Divakaran and later trained at the Tharangani School of Music (founded by Padma Bhushan Dr. K. J. Yesudas) under Shri Rajagopal Rajappa, who inspired his passion for teaching. Advanced training with Vid. S. R. Mahadeva Sarma (A-Top Grade Artist, AIR) helped shape a unique style blending the Parur M.S. Gopalakrishnan and Lalgudi Bani traditions.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-100 h-full">
                  <h3 className="text-xl font-serif font-bold text-purple-800 mb-3 flex items-center">
                    <Award className="w-6 h-6 text-amber-500 mr-3" />
                    Performer & Educator
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Certified in Carnatic Classical Violin (4-year course – Tharangani School of Music)</li>
                    <li>Teaching since 2018: Students from India, USA, Thailand & Bangalore</li>
                    <li>Faculty/Collaborator at:</li>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 mt-2">
                      <li>Jovens Academy, USA</li>
                      <li>Laya Tarang Academy, Trivandrum</li>
                      <li>Bharathakala Dance & Music Cultural Society, Trivandrum</li>
                      <li>Music Intuit Academy, Bangalore</li>
                    </ul>
                  </ul>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-100 h-full">
                  <h3 className="text-xl font-serif font-bold text-purple-800 mb-3 flex items-center">
                    <Globe className="w-6 h-6 text-amber-500 mr-3" />
                    Recognition
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Best Classical Violin Teacher Award – Music Intuit Academy, Bangalore</li>
                    <li>Students consistently win top ranks at District and School Kalolsavams</li>
                    <li className="pt-2">Performances across Kerala and Karnataka</li>
                    <li>Invited speaker at music education seminars</li>
                    <li>Featured in local cultural events and music festivals</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-100">
                <h3 className="text-xl font-serif font-bold text-purple-800 mb-3 flex items-center">
                  <BookOpen className="w-6 h-6 text-amber-500 mr-3" />
                  Teaching Approach
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Monthly student assessments in partnership with academies</li>
                    <li>Structured curriculum aligned with university-level standards</li>
                  </ul>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Custom student dashboard for tracking attendance, progress & practice</li>
                    <li>Educational blog covering violin tuning, shruti, tala, and core concepts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
