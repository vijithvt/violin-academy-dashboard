
import { Clock, Award, Calendar, Globe, HomeIcon, Users, Calculator, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import CourseAccordion from "./CourseAccordion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect, ChangeEvent } from "react";

// Teacher's location coordinates
const TEACHER_LOCATION = {
  lat: 8.519270751001878,
  lng: 77.05175901534338
};

// Teaching centers
const TEACHING_CENTERS = [
  { 
    name: "Laya Tarang Academy of Music and Performing Arts",
    location: "Thiruvananthapuram",
    coordinates: { lat: 8.5241, lng: 76.9366 }
  },
  { 
    name: "Bharathakala Dance & Music Cultural Society",
    location: "Peyad, Thiruvananthapuram",
    coordinates: { lat: 8.5484, lng: 76.9701 }
  },
  { 
    name: "Musicintuit Academy India Pvt Ltd.",
    location: "Bengaluru",
    coordinates: { lat: 12.9716, lng: 77.5946 }
  },
  { 
    name: "Jovens Academy",
    location: "Texas, USA",
    type: "Online"
  }
];

// Function to calculate distance between two points using the Haversine formula
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return Math.round(d * 10) / 10; // Round to 1 decimal place
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI/180);
};

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
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isCalculatingLocation, setIsCalculatingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  
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

  const getUserLocation = () => {
    setIsCalculatingLocation(true);
    setLocationError("");
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          
          setUserLocation({ lat: userLat, lng: userLng });
          
          // Calculate distance from teacher's location
          const calculatedDistance = calculateDistance(
            TEACHER_LOCATION.lat, 
            TEACHER_LOCATION.lng, 
            userLat, 
            userLng
          );
          
          // Limit distance to 20km max for pricing
          const limitedDistance = Math.min(20, Math.max(1, calculatedDistance));
          setDistance(limitedDistance);
          setIsCalculatingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError("Could not get your location. Please enter distance manually.");
          setIsCalculatingLocation(false);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser");
      setIsCalculatingLocation(false);
    }
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
            {!isCalculatingLocation && (
              <button
                onClick={getUserLocation}
                className="text-xs px-2 py-1 mt-1 mb-2 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded border border-amber-200 flex items-center justify-center mx-auto"
              >
                <MapPin className="h-3 w-3 mr-1" /> Calculate from my location
              </button>
            )}
            {isCalculatingLocation && (
              <div className="text-xs text-amber-600 mt-1 mb-2">Calculating distance...</div>
            )}
            {locationError && (
              <div className="text-xs text-red-500 mt-1 mb-2">{locationError}</div>
            )}
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
        
        {/* Teaching Centers */}
        <div className={cn(
          "transform transition-all duration-1000 mb-12",
          isVisible ? "translate-y-0 opacity-100 delay-300" : "translate-y-10 opacity-0"
        )}>
          <h3 className="text-2xl font-serif font-bold text-maroon-900 mb-6 text-center">
            Teaching Centers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEACHING_CENTERS.map((center, index) => (
              <div 
                key={index} 
                className="bg-white p-4 rounded-lg shadow-md border border-amber-100 hover:shadow-lg transition-all"
                style={{ 
                  transitionDelay: `${(index + 3) * 100}ms`,
                  animation: isVisible ? `fade-in 0.5s ease-out ${(index + 3) * 0.1}s both` : 'none' 
                }}
              >
                <h4 className="font-medium text-maroon-800 mb-1">{center.name}</h4>
                <p className="text-sm text-gray-600 mb-1">{center.location}</p>
                <div className="flex items-center text-xs text-amber-700">
                  {center.type === "Online" ? (
                    <><Globe className="h-3 w-3 mr-1" /> Online Classes</>
                  ) : (
                    <><MapPin className="h-3 w-3 mr-1" /> In-person Classes</>
                  )}
                </div>
              </div>
            ))}
          </div>
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
      
      <style jsx="true">{`
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
