
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

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
      fee: "₹250-₹300 per session",
      time: "Schedule at your convenience"
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
        <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-10 text-center">
          Courses & Fee Details
        </h2>
        
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
        
        {/* Fee Details Box */}
        <div className="mt-12 bg-amber-50 rounded-xl shadow-md overflow-hidden max-w-3xl mx-auto">
          <div className="border-b border-amber-200 bg-maroon-800 text-white py-4 text-center">
            <h3 className="text-xl font-semibold">Pricing Information</h3>
          </div>
          <div className="p-6">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-amber-200">
                  <td className="py-3 font-medium">India Students</td>
                  <td className="py-3 text-right">₹250–₹300 per session</td>
                </tr>
                <tr className="border-b border-amber-200">
                  <td className="py-3 font-medium">International Students</td>
                  <td className="py-3 text-right">Fee based on schedule</td>
                </tr>
                <tr className="border-b border-amber-200">
                  <td className="py-3 font-medium">Payment Options</td>
                  <td className="py-3 text-right">Monthly, quarterly, yearly</td>
                </tr>
                <tr className="border-b border-amber-200">
                  <td className="py-3 font-medium">Yearly Payment Discount</td>
                  <td className="py-3 text-right text-green-600 font-medium">16% off</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Admission Fee</td>
                  <td className="py-3 text-right">₹500 (one-time)</td>
                </tr>
              </tbody>
            </table>
            
            <div className="mt-6 bg-amber-100 rounded-lg p-4 flex items-start">
              <div className="text-amber-600 mr-2 mt-1">
                <Award className="h-5 w-5" />
              </div>
              <p className="text-gray-700 text-sm">
                Includes welcome kit
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import { Award, Calendar, Globe, HomeIcon, Users } from "lucide-react";

export default CoursesSection;
