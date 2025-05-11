
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import CourseAccordion from "./CourseAccordion";
import CourseCardsList from "./course/CourseCardsList";
import TeachingCentersList from "./course/TeachingCentersList";

const CoursesSection = () => {
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
    
    const section = document.getElementById("courses");
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="courses" className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-10 transition-all duration-1000 transform",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <div className="h-1 w-24 bg-maroon-600 mx-auto mb-6"></div>
          <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-4">
            Courses & Fee Details
          </h2>
          <p className="text-center text-gray-600 mb-6 max-w-3xl mx-auto">
            Our courses are designed to encourage lifelong learners of all age groups, develop a strong foundation in Carnatic violin techniques, and foster improvisation and performance skills.
          </p>
        </div>
        
        {/* Course Cards */}
        <CourseCardsList isVisible={isVisible} />
        
        {/* Teaching Centers */}
        <TeachingCentersList isVisible={isVisible} />
        
        {/* Course Syllabus with Animation */}
        <div className={cn(
          "transform transition-all duration-1000",
          isVisible ? "translate-y-0 opacity-100 delay-500" : "translate-y-10 opacity-0"
        )}>
          <h3 className="text-2xl font-serif font-bold text-maroon-900 mb-6 text-center">
            Course Syllabus
          </h3>
          <CourseAccordion />
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default CoursesSection;
