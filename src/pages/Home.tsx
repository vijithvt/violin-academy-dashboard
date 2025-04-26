
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { 
  ChevronRight, 
  Music, 
  Award, 
  Book, 
  Globe, 
  Phone, 
  Mail, 
  LogIn,
  MessageCircle,
  UserCheck,
  CreditCard,
  BookOpen,
  FileText,
  Image,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Home = () => {
  const [activeTab, setActiveTab] = useState("aarambha");

  const courseLevels = [
    {
      id: "aarambha",
      name: "Aarambha",
      duration: "9–12 months",
      concepts: "Posture, tuning, bowing, 3rd position",
      examples: "Twinkle Twinkle, Rama Janardhana, Alankaram"
    },
    {
      id: "madhyama",
      name: "Madhyama",
      duration: "12–15 months",
      concepts: "Gamakas, 2nd pos, vibrato, string work",
      examples: "Bhajans, Swarajathis, Film songs"
    },
    {
      id: "utthama",
      name: "Utthama",
      duration: "2.5–3 years",
      concepts: "4th/5th pos, Kalpana Swaram, improvisation",
      examples: "Krithis, Ata Thala Varnams"
    },
    {
      id: "vidhwath",
      name: "Vidhwath",
      duration: "3+ years",
      concepts: "Fusion, Alapana, performance prep",
      examples: "Thillanas, Pancharatnas, Swara toolkits"
    }
  ];

  const classModes = [
    {
      title: "1-to-1 Online",
      price: "₹2000/month",
      details: "8 sessions per month",
      icon: <Globe className="w-10 h-10 text-indigo-600" />
    },
    {
      title: "Batch Online",
      price: "₹700/month",
      details: "Group learning environment",
      icon: <UserCheck className="w-10 h-10 text-indigo-600" />
    },
    {
      title: "Home Tuition",
      price: "₹2000 + travel",
      details: "4 classes/month (Trivandrum only)",
      icon: <Music className="w-10 h-10 text-indigo-600" />
    }
  ];

  const objectives = [
    "Master Carnatic violin techniques from basic to advanced levels",
    "Learn traditional compositions and improvisation methods",
    "Develop performance skills and stage confidence",
    "Understand music theory and how to apply it",
    "Progress through structured curriculum with regular assessments"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Sticky Navigation */}
      <header className="sticky top-0 z-10 bg-white bg-opacity-95 shadow-sm backdrop-blur-sm">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold text-indigo-900">Vijith Violinist</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-indigo-900 hover:text-indigo-600 font-medium">Home</a>
            <a href="#about" className="text-indigo-900 hover:text-indigo-600 font-medium">About</a>
            <a href="#courses" className="text-indigo-900 hover:text-indigo-600 font-medium">Courses</a>
            <a href="#admission" className="text-indigo-900 hover:text-indigo-600 font-medium">Admission</a>
            <a href="#contact" className="text-indigo-900 hover:text-indigo-600 font-medium">Contact</a>
            <Link to="/admin-login">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <LogIn className="h-4 w-4" /> Login
              </Button>
            </Link>
          </div>
          
          {/* Mobile Navigation - Simple dropdown for now */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              Menu
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-20 md:py-28">
        <div className="absolute inset-0 opacity-20 bg-[url('/public/placeholder.svg')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Learn Carnatic Violin with Vijith Violinist
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light">
              From beginner to Vidhwath level – Online, Offline & Global
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#admission">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                  Join Now <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </a>
              <a href="https://wa.me/8301815324" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp Us
                </Button>
              </a>
              <Link to="/admin-login">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  <LogIn className="h-4 w-4 mr-2" /> Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About the Instructor */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/3">
              <div className="rounded-full overflow-hidden border-4 border-indigo-100 shadow-lg w-64 h-64 mx-auto">
                {/* Placeholder for instructor image */}
                <div className="w-full h-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
                  <span className="text-indigo-300 text-6xl">VV</span>
                </div>
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-serif font-bold text-indigo-900 mb-6">
                About the Instructor
              </h2>
              <p className="text-gray-700 mb-4">
                Vijith Violinist is a renowned Carnatic violin teacher with global teaching experience, 
                offering classes to students across different age groups and skill levels.
              </p>
              <p className="text-gray-700 mb-6">
                With years of dedicated practice and performance, Vijith brings traditional Carnatic 
                violin methods integrated with modern teaching techniques to help students achieve mastery.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <Award className="h-5 w-5 text-amber-500 mr-2 mt-1" />
                  <span className="text-gray-700">Renowned performer with multiple awards</span>
                </div>
                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-amber-500 mr-2 mt-1" />
                  <span className="text-gray-700">Teaching students globally</span>
                </div>
                <div className="flex items-start">
                  <Music className="h-5 w-5 text-amber-500 mr-2 mt-1" />
                  <span className="text-gray-700">Expertise in traditional and fusion styles</span>
                </div>
                <div className="flex items-start">
                  <Book className="h-5 w-5 text-amber-500 mr-2 mt-1" />
                  <span className="text-gray-700">Structured curriculum for all levels</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Course */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-indigo-900 mb-10 text-center">
            About the Course
          </h2>
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <p className="text-gray-700 mb-6">
                The Carnatic Violin course is designed to take students from the fundamentals to advanced 
                performance level. Our structured curriculum ensures steady progress with regular assessments 
                and personalized feedback.
              </p>
              <p className="text-gray-700 mb-6">
                Whether you're a complete beginner or have some experience, our course adapts to your 
                skill level and learning pace. We welcome learners of all age groups, from children to 
                adults, who are passionate about mastering this beautiful instrument.
              </p>
              <h3 className="text-xl font-bold text-indigo-800 mb-4">Course Objectives:</h3>
              <ul className="space-y-3">
                {objectives.map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-indigo-800 mb-4">Course Highlights:</h3>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border border-indigo-100 rounded-lg">
                  <AccordionTrigger className="px-4 text-indigo-800 hover:text-indigo-600">
                    <div className="flex items-center">
                      <BookOpen className="mr-2 h-5 w-5 text-indigo-600" />
                      <span>Comprehensive Curriculum</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2 text-gray-700">
                    Our curriculum covers everything from basic posture and technique to advanced gamakas and improvisation.
                    Each lesson builds upon previous knowledge, creating a solid foundation.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border border-indigo-100 rounded-lg">
                  <AccordionTrigger className="px-4 text-indigo-800 hover:text-indigo-600">
                    <div className="flex items-center">
                      <Award className="mr-2 h-5 w-5 text-indigo-600" />
                      <span>Regular Assessments</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2 text-gray-700">
                    Monthly video submissions and quarterly evaluations help track progress and identify areas for improvement.
                    E-certificates are awarded after completing each level.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border border-indigo-100 rounded-lg">
                  <AccordionTrigger className="px-4 text-indigo-800 hover:text-indigo-600">
                    <div className="flex items-center">
                      <Globe className="mr-2 h-5 w-5 text-indigo-600" />
                      <span>Flexible Learning Options</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2 text-gray-700">
                    Choose from online one-to-one classes, online batch learning, or home tuition (Trivandrum area only).
                    Schedule classes at your convenience.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Course Table */}
      <section id="courses" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-indigo-900 mb-10 text-center">
            Our Course Levels
          </h2>
          
          {/* Mobile View - Accordion */}
          <div className="md:hidden">
            <Accordion type="single" collapsible className="space-y-4">
              {courseLevels.map((level) => (
                <AccordionItem 
                  key={level.id} 
                  value={level.id} 
                  className="border border-indigo-100 rounded-lg shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-4 py-3 hover:bg-indigo-50">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></div>
                      <span className="font-semibold text-indigo-900">{level.name}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-2">
                    <div className="space-y-2 text-gray-700">
                      <p><span className="font-medium">Duration:</span> {level.duration}</p>
                      <p><span className="font-medium">Key Concepts:</span> {level.concepts}</p>
                      <p><span className="font-medium">Examples:</span> {level.examples}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          {/* Desktop View - Tabs */}
          <div className="hidden md:block">
            <div className="flex border-b border-indigo-100">
              {courseLevels.map((level) => (
                <button
                  key={level.id}
                  className={cn(
                    "px-6 py-3 text-lg font-medium focus:outline-none",
                    activeTab === level.id
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-500 hover:text-indigo-600"
                  )}
                  onClick={() => setActiveTab(level.id)}
                >
                  {level.name}
                </button>
              ))}
            </div>
            <div className="p-6 border-x border-b border-indigo-100 rounded-b-lg shadow-sm">
              {courseLevels.map((level) => (
                <div
                  key={level.id}
                  className={cn(
                    "grid grid-cols-3 gap-6",
                    activeTab === level.id ? "block" : "hidden"
                  )}
                >
                  <div>
                    <h4 className="text-lg font-semibold text-indigo-900 mb-2">Duration</h4>
                    <p className="text-gray-700">{level.duration}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-indigo-900 mb-2">Key Concepts</h4>
                    <p className="text-gray-700">{level.concepts}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-indigo-900 mb-2">Examples</h4>
                    <p className="text-gray-700">{level.examples}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Stuff You Need */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-indigo-900 mb-10 text-center">
            Stuff You Need
          </h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl mx-auto hover:shadow-xl transition-shadow duration-300">
            {/* Placeholder for actual image */}
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 h-64 flex items-center justify-center">
              <Image className="w-16 h-16 text-indigo-300" />
            </div>
            <div className="p-6">
              <p className="text-gray-700 text-center">
                Essential equipment and materials for your violin journey
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Payment Section */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-indigo-900 mb-10 text-center">
            Payment Details
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <div className="bg-white rounded-xl shadow-md p-8 md:w-1/3">
              {/* Placeholder for QR code */}
              <div className="bg-gray-100 w-48 h-48 mx-auto mb-6 flex items-center justify-center rounded-lg">
                <span className="text-gray-400 text-sm">QR Code Image</span>
              </div>
              <p className="text-center text-indigo-900 font-medium">Scan & Pay</p>
              <p className="text-center text-gray-500 text-sm mt-2">Send payment screenshot via WhatsApp</p>
            </div>
            
            <div className="md:w-1/3">
              <div className="bg-white rounded-xl shadow-md p-8">
                <h3 className="text-xl font-bold text-indigo-900 mb-4">Bank Details</h3>
                <ul className="space-y-3">
                  <li className="flex">
                    <span className="font-medium w-32">Name:</span>
                    <span>Vijith V T</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-32">Account No:</span>
                    <span>026410101120</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-32">IFSC:</span>
                    <span>IPOS0000001</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-32">Google Pay:</span>
                    <span>9496315903</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Class Modes & Fees */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-indigo-900 mb-10 text-center">
            Class Modes & Fees
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {classModes.map((mode, index) => (
              <div 
                key={index} 
                className="bg-white border border-indigo-100 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 text-center"
              >
                <div className="flex justify-center mb-4">
                  {mode.icon}
                </div>
                <h3 className="text-xl font-bold text-indigo-900 mb-2">{mode.title}</h3>
                <p className="text-2xl font-bold text-amber-600 mb-2">{mode.price}</p>
                <p className="text-gray-600">{mode.details}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-indigo-50 rounded-lg p-6 max-w-3xl mx-auto">
            <h4 className="font-bold text-indigo-900 mb-2">Additional Information:</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CreditCard className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                <span className="text-gray-700">One-time admission fee: ₹1000</span>
              </li>
              <li className="flex items-start">
                <CreditCard className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                <span className="text-gray-700">10% discount for yearly payments</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Admission Section */}
      <section id="admission" className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-indigo-900 mb-10 text-center">
            Admission
          </h2>
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <div className="bg-white rounded-xl shadow-md p-8">
                <h3 className="text-xl font-bold text-indigo-900 mb-6">How to Join</h3>
                <ol className="space-y-4">
                  <li className="flex">
                    <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                    <span className="text-gray-700">Fill out the admission form (link below)</span>
                  </li>
                  <li className="flex">
                    <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                    <span className="text-gray-700">Make the payment and send screenshot</span>
                  </li>
                  <li className="flex">
                    <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                    <span className="text-gray-700">Schedule your first class via WhatsApp</span>
                  </li>
                  <li className="flex">
                    <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                    <span className="text-gray-700">Receive your welcome kit and get started!</span>
                  </li>
                </ol>
                
                <div className="mt-8">
                  <a 
                    href="https://forms.google.com/admission-form" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    <Button className="bg-indigo-700 hover:bg-indigo-800">
                      <FileText className="h-4 w-4 mr-2" /> 
                      Open Admission Form
                    </Button>
                  </a>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-xl shadow-md p-8 h-full">
                <h3 className="text-xl font-bold text-indigo-900 mb-6">What You Get</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">Personalized learning experience</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">Digital learning materials and resources</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">Regular feedback and progress tracking</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">Access to student community and events</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">Certification upon level completion</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">24/7 support via WhatsApp</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Rewards & Assessment */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-indigo-900 mb-10 text-center">
            Rewards & Assessment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-indigo-100 rounded-xl shadow-md p-6">
              <div className="flex justify-center mb-4">
                <FileText className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-2 text-center">Monthly Submissions</h3>
              <p className="text-gray-700 text-center">
                Submit practice videos monthly for personalized feedback and assessment from your instructor.
              </p>
            </div>
            <div className="bg-white border border-indigo-100 rounded-xl shadow-md p-6">
              <div className="flex justify-center mb-4">
                <Award className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-2 text-center">Quarterly Awards</h3>
              <p className="text-gray-700 text-center">
                Outstanding students receive recognition through quarterly awards based on progress and commitment.
              </p>
            </div>
            <div className="bg-white border border-indigo-100 rounded-xl shadow-md p-6">
              <div className="flex justify-center mb-4">
                <FileText className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-2 text-center">E-Certificates</h3>
              <p className="text-gray-700 text-center">
                Receive official e-certificates upon completion of each course level, documenting your achievements.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Gallery Section - Placeholder */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-indigo-900 mb-10 text-center">
            Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Placeholder for gallery images */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
                  <Image className="w-8 h-8 text-indigo-200" />
                </div>
                <div className="p-3">
                  <p className="text-sm text-gray-600">Student Performance {item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-indigo-900 mb-10 text-center">
            Contact Us
          </h2>
          <div className="bg-indigo-50 rounded-xl shadow-md p-8 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-indigo-900 mb-6">Reach Out to Us</h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <MessageCircle className="h-6 w-6 text-indigo-600 mr-3" />
                    <div>
                      <p className="font-medium text-indigo-900">WhatsApp</p>
                      <p className="text-gray-700">8301815324</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Phone className="h-6 w-6 text-indigo-600 mr-3" />
                    <div>
                      <p className="font-medium text-indigo-900">Phone</p>
                      <p className="text-gray-700">9496315903</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Mail className="h-6 w-6 text-indigo-600 mr-3" />
                    <div>
                      <p className="font-medium text-indigo-900">Email</p>
                      <p className="text-gray-700">vijithviolinist@gmail.com</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-indigo-900 mb-3">Home Tuition Available In</h3>
                  <p className="text-gray-700 mb-4">Trivandrum Area Only</p>
                  <Button variant="outline" className="bg-white hover:bg-indigo-50">
                    <a 
                      href="https://wa.me/8301815324" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" /> Chat With Us
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold">Vijith Violinist</h3>
              <p className="text-indigo-200">Carnatic Classical Violin Academy</p>
            </div>
            <div className="flex space-x-6">
              <a href="#home" className="text-indigo-200 hover:text-white">Home</a>
              <a href="#about" className="text-indigo-200 hover:text-white">About</a>
              <a href="#courses" className="text-indigo-200 hover:text-white">Courses</a>
              <a href="#admission" className="text-indigo-200 hover:text-white">Admission</a>
              <a href="#contact" className="text-indigo-200 hover:text-white">Contact</a>
            </div>
          </div>
          <div className="mt-8 border-t border-indigo-800 pt-6 text-center text-indigo-300 text-sm">
            &copy; {new Date().getFullYear()} Vijith Violinist's Carnatic Classical Violin Academy. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
