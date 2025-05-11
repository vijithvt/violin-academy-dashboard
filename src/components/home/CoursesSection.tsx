
import { Clock, Award, Calendar, Globe, HomeIcon, Users, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import CourseAccordion from "./CourseAccordion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect, ChangeEvent } from "react";

type CourseCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  fee: string;
  time: string;
  highlights?: string[];
  isHomeTuition?: boolean;
};

const CourseCard = ({ title, description, icon, fee, time, highlights, isHomeTuition }: CourseCardProps) => {
  const [distance, setDistance] = useState<number>(5);
  const [travelCost, setTravelCost] = useState<number>(100);
  const [totalFee, setTotalFee] = useState<number>(2100);
  
  useEffect(() => {
    if (isHomeTuition) {
      const calculatedTravelCost = distance * 10 * 2; // Rs 10 per km, round trip
      setTravelCost(calculatedTravelCost);
      setTotalFee(2000 + calculatedTravelCost);
    }
  }, [distance, isHomeTuition]);
  
  const handleDistanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newDistance = Math.min(20, Math.max(1, Number(e.target.value)));
    setDistance(newDistance);
  };

  return (
    <Card className="bg-white border border-amber-100 rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden transform hover:-translate-y-1 duration-300">
      <CardHeader className="pb-2 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-amber-50 rounded-full">
            {icon}
          </div>
        </div>
        <CardTitle className="text-xl text-maroon-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center pb-3">
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="text-amber-700 font-medium">{fee}</div>
        <div className="text-gray-500 text-sm mt-1 flex items-center justify-center">
          <Clock className="h-4 w-4 mr-1" /> {time}
        </div>
        
        {isHomeTuition && (
          <div className="mt-3 border-t pt-3 border-dashed border-amber-200">
            <div className="text-xs text-gray-600 mb-1 flex items-center justify-center">
              <Calculator className="h-3 w-3 mr-1" /> Travel Cost Calculator
            </div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <label htmlFor="distance" className="text-xs text-gray-600">Distance (km):</label>
              <input 
                id="distance"
                type="number" 
                value={distance} 
                onChange={handleDistanceChange}
                min="1"
                max="20"
                className="w-16 h-6 text-xs border border-amber-200 rounded px-1"
              />
            </div>
            <div className="text-xs text-gray-600 flex flex-col gap-1 mt-2">
              <div className="flex justify-between">
                <span>Tuition Fee:</span>
                <span>₹2000</span>
              </div>
              <div className="flex justify-between">
                <span>Travel Cost ({distance}km x ₹10 x 2):</span>
                <span>₹{travelCost}</span>
              </div>
              <div className="flex justify-between font-medium text-maroon-800 border-t border-amber-100 pt-1 mt-1">
                <span>Total Fee:</span>
                <span>₹{totalFee}</span>
              </div>
            </div>
          </div>
        )}
        
        {highlights && highlights.length > 0 && (
          <div className="mt-3 border-t pt-3 border-dashed border-amber-200">
            <ul className="text-left text-xs space-y-1">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-center">
                  <span className="text-green-500 mr-1">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

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
    
    const section = document.getElementById("courses-section");
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const courseCards = [
    {
      title: "1-to-1 Online Violin Class",
      description: "Personalized instruction tailored to your learning pace",
      icon: <Globe className="w-12 h-12 text-amber-600" />,
      fee: "₹2000 per month",
      time: "4 classes per month",
    },
    {
      title: "Online Group Class",
      description: "Learn alongside peers in an interactive setting",
      icon: <Users className="w-12 h-12 text-amber-600" />,
      fee: "₹700 per month",
      time: "Tue & Thu, 9-10 PM IST"
    },
    {
      title: "Home Tuition",
      description: "In-person classes at your location (Trivandrum only)",
      icon: <HomeIcon className="w-12 h-12 text-amber-600" />,
      fee: "₹2000 + travel per month",
      time: "4 classes per month",
      isHomeTuition: true
    }
  ];

  return (
    <section id="courses" className="py-16 bg-amber-50" id="courses-section">
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
        
        {/* Course Cards with Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {courseCards.map((course, index) => (
            <div 
              key={index} 
              className={cn(
                "transform transition-all duration-700",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <CourseCard {...course} />
            </div>
          ))}
        </div>
        
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
      
      <style jsx>{`
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
      `}</style>
    </section>
  );
};

export default CoursesSection;
