
import { Clock, Award, Calendar, Globe, HomeIcon, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import CourseAccordion from "./CourseAccordion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type CourseCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  fee: string;
  time: string;
  highlights?: string[];
};

const CourseCard = ({ title, description, icon, fee, time, highlights }: CourseCardProps) => {
  return (
    <Card className="bg-white border border-amber-100 rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden">
      <CardHeader className="pb-2 text-center">
        <div className="flex justify-center mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl text-maroon-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center pb-3">
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="text-amber-700 font-medium">{fee}</div>
        <div className="text-gray-500 text-sm mt-1 flex items-center justify-center">
          <Clock className="h-4 w-4 mr-1" /> {time}
        </div>
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
      time: "4 classes per month"
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
        
        {/* Common Fee Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-10 max-w-3xl mx-auto">
          <h3 className="text-xl font-serif font-bold text-maroon-800 mb-4 text-center">
            Common Fee Details
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span> Per class fee: ₹300
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span> Yearly payment: 16% discount
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span> Admission fee: ₹500 (one-time)
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span> Includes welcome kit (Practice notebook, finger placement guide, course materials)
            </li>
          </ul>
        </div>
        
        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {courseCards.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
        
        {/* Course Syllabus */}
        <div>
          <h3 className="text-2xl font-serif font-bold text-maroon-900 mb-6 text-center">
            Course Syllabus
          </h3>
          <CourseAccordion />
        </div>
        
        {/* Joining Process */}
        <div className="mt-12 max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-maroon-800 text-white p-4 text-center">
            <h3 className="text-xl font-medium">How to Join Our Classes</h3>
          </div>
          <div className="p-6">
            <ol className="space-y-4 list-decimal pl-5">
              <li>
                <strong className="text-maroon-800">Application:</strong> Fill out the admission form or contact us via WhatsApp
              </li>
              <li>
                <strong className="text-maroon-800">Initial Discussion:</strong> Schedule a call to discuss your goals and schedule
              </li>
              <li>
                <strong className="text-maroon-800">Admission Fee:</strong> Pay the one-time ₹500 admission fee and receive your welcome kit
              </li>
              <li>
                <strong className="text-maroon-800">Class Setup:</strong> Get your equipment ready following our guidelines
              </li>
              <li>
                <strong className="text-maroon-800">Begin Learning:</strong> Start your violin journey with regular classes and monthly submissions
              </li>
            </ol>
          </div>
          <div className="bg-amber-50 p-4 border-t border-amber-100">
            <div className="flex items-start">
              <Award className="h-5 w-5 text-amber-600 mr-2 mt-1" />
              <p className="text-gray-700 text-sm">
                <strong>Welcome Kit includes:</strong> Practice notebook, finger placement guide, course materials
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
