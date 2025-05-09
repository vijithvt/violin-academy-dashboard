
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, Music, Users, Award } from "lucide-react";

const TeacherSection = () => {
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
    
    const currentElement = document.getElementById("teacher-section");
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
    <section id="meet-teacher" className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4" id="teacher-section">
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-12 transition-all duration-1000 transform",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <h2 className="text-4xl font-serif font-bold text-maroon-900 mb-3">
            Meet Your Teacher
          </h2>
          <p className="text-lg text-gray-600">Learn from an experienced and passionate violin maestro</p>
          <div className="h-1 w-24 bg-amber-400 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          <div className={cn(
            "transition-all duration-1000 transform",
            isVisible ? "translate-x-0 opacity-100" : "translate-x-[-50px] opacity-0"
          )}>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img 
                src="/lovable-uploads/f762e275-6a46-45d4-98e1-75635c3d1091.png" 
                alt="Violin Teacher" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className={cn(
            "space-y-6 transition-all duration-1000 delay-300 transform",
            isVisible ? "translate-x-0 opacity-100" : "translate-x-[50px] opacity-0"
          )}>
            <h3 className="text-2xl font-serif font-bold text-maroon-800">
              Acharya Ramanujan
            </h3>
            
            <p className="text-gray-700 leading-relaxed">
              With over 15 years of experience teaching classical violin, Acharya Ramanujan is an award-winning instructor dedicated to preserving traditional techniques while making learning accessible to modern students.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start">
                <div className="rounded-full bg-amber-100 p-2 mr-3">
                  <Award className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-medium text-maroon-800">Award-Winning</h4>
                  <p className="text-sm text-gray-600">Best Classical Teacher 2022</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="rounded-full bg-amber-100 p-2 mr-3">
                  <Calendar className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-medium text-maroon-800">15+ Years</h4>
                  <p className="text-sm text-gray-600">Teaching Experience</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="rounded-full bg-amber-100 p-2 mr-3">
                  <Music className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-medium text-maroon-800">Performance</h4>
                  <p className="text-sm text-gray-600">International Concert Artist</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="rounded-full bg-amber-100 p-2 mr-3">
                  <Users className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-medium text-maroon-800">Students</h4>
                  <p className="text-sm text-gray-600">Trained 200+ Violinists</p>
                </div>
              </div>
            </div>

            <Button className="bg-maroon-700 hover:bg-maroon-800 text-white mt-4">
              Book a Trial Lesson
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherSection;
