
import { Clock, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import CourseAccordion from "./CourseAccordion";

type CourseCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  fee: string;
  time: string;
};

const CourseCard = ({ title, description, icon, fee, time }: CourseCardProps) => {
  return (
    <div className="bg-white border border-amber-100 rounded-xl shadow-md hover:shadow-lg transition-all p-6 text-center">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-maroon-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="text-amber-700 font-medium">{fee}</div>
      <div className="text-gray-500 text-sm mt-1 flex items-center justify-center">
        <Clock className="h-4 w-4 mr-1" /> {time}
      </div>
    </div>
  );
};

const CoursesSection = () => {
  const courseCards = [
    {
      title: "1-to-1 Online Violin Class",
      description: "Personalized instruction tailored to your learning pace",
      icon: <Globe className="w-12 h-12 text-amber-600" />,
      fee: "₹2000 per month",
      time: "4 classes per month"
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
      time: "4 classes per month"
    },
    {
      title: "Monthly Video Feedback",
      description: "Submit recordings and receive detailed assessment",
      icon: <Calendar className="w-12 h-12 text-amber-600" />,
      fee: "Included with classes",
      time: "Monthly submissions"
    }
  ];

  return (
    <section id="courses" className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-4 text-center">
          Courses & Fee Details
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
          Our courses are designed to encourage lifelong learners of all age groups, develop a strong foundation in Carnatic violin techniques, and foster improvisation and performance skills.
        </p>
        
        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courseCards.slice(0, 3).map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
        
        {/* Fourth Course Card centered */}
        <div className="mt-8 max-w-sm mx-auto">
          <CourseCard {...courseCards[3]} />
        </div>
        
        {/* Fee Information */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-maroon-800 mb-4 text-center">Fee Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-amber-50 rounded-lg text-center">
              <p className="text-gray-700 mb-1">Per Class Fee</p>
              <p className="text-lg font-semibold text-amber-700">₹300</p>
            </div>
            
            <div className="p-4 bg-amber-50 rounded-lg text-center">
              <p className="text-gray-700 mb-1">Yearly Payment Discount</p>
              <p className="text-lg font-semibold text-green-600">16% off</p>
            </div>
            
            <div className="p-4 bg-amber-50 rounded-lg text-center">
              <p className="text-gray-700 mb-1">Admission Fee</p>
              <p className="text-lg font-semibold text-amber-700">₹500 (one-time)</p>
            </div>
          </div>
          
          <div className="mt-6 bg-amber-100 rounded-lg p-4 flex items-start">
            <div className="text-amber-600 mr-2 mt-1">
              <Award className="h-5 w-5" />
            </div>
            <p className="text-gray-700">
              Includes welcome kit
            </p>
          </div>
        </div>
        
        {/* Course Levels */}
        <div className="mt-12">
          <h3 className="text-2xl font-serif font-bold text-maroon-900 mb-6 text-center">
            Course Levels
          </h3>
          <CourseAccordion />
        </div>
      </div>
    </section>
  );
};

import { Award, Calendar, Globe, HomeIcon, Users } from "lucide-react";

export default CoursesSection;
