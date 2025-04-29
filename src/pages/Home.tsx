
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
  Youtube,
  Instagram,
  Facebook,
  CheckCircle,
  Calendar,
  Users,
  Home as HomeIcon,
  Clock,
  CreditCard,
  Star,
  FileText,
  Info,
  HelpCircle,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Home = () => {
  const [showViolinModal, setShowViolinModal] = useState(false);

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

  const learningSteps = [
    {
      title: "Join class",
      description: "Select your preferred mode and schedule"
    },
    {
      title: "Attend sessions",
      description: "Regular practice with instructor guidance"
    },
    {
      title: "Submit recordings",
      description: "Monthly video submissions for assessment"
    },
    {
      title: "Get feedback",
      description: "Personalized tips and improvement areas"
    },
    {
      title: "Track progress",
      description: "Monitor your growth on student dashboard"
    },
    {
      title: "Earn certificates",
      description: "Receive recognition for level completion"
    }
  ];

  const requirements = [
    "Violin, bow, rosin",
    "Metronome / Tala Meter",
    "Tambura / Tambura App",
    "Mirror, Notebook, Recorder"
  ];

  const studentGuidelines = [
    {
      title: "Be Punctual",
      description: "Join classes on time and be prepared"
    },
    {
      title: "Maintain Discipline",
      description: "Respect teacher and peers during sessions"
    },
    {
      title: "Practice Regularly",
      description: "Follow daily routine as prescribed"
    },
    {
      title: "Stay Organized",
      description: "Manage materials and notes systematically"
    },
    {
      title: "Participate Actively",
      description: "Submit recordings, join activities"
    },
    {
      title: "Use Dashboard",
      description: "Track attendance and monitor progress"
    },
    {
      title: "Honest Submissions",
      description: "Send genuine practice recordings"
    },
    {
      title: "Communicate Well",
      description: "Inform prior if absent (min. 6 hours notice)"
    }
  ];

  const faqs = [
    {
      question: "Class Schedule & Attendance",
      answer: "Missed classes are not rescheduled unless valid prior notice is given (min. 6 hours). Instructor-cancelled classes will be rescheduled."
    },
    {
      question: "Fee Structure & Payments",
      answer: "Monthly fees are due on/before 1st of each month. Non-refundable except for serious cases (e.g. illness). Payments via UPI, Google Pay, or Bank Transfer. Late payment → single reminder only."
    },
    {
      question: "Practice & Progress",
      answer: "Regular practice and assignment completion are mandatory for effective learning and progress."
    },
    {
      question: "Materials & Recordings",
      answer: "PDFs, audio, videos are provided for personal use only. Redistribution is strictly prohibited."
    },
    {
      question: "Online Class Policy",
      answer: "Keep video ON unless instructed otherwise. Good internet connection and proper camera setup are required."
    },
    {
      question: "Performance & Participation",
      answer: "Participation in events is merit-based. Some classes may be recorded for quality review purposes."
    },
    {
      question: "Rewards & Certifications",
      answer: "Points are awarded for attendance, practice, and consistency. Quarterly rewards and milestone certificates will be provided to deserving students."
    },
    {
      question: "Referral Policy",
      answer: "Refer 1 student (who completes 1 month) → ₹500 reward will be given as a token of appreciation."
    },
    {
      question: "Discontinuation Policy",
      answer: "1-week notice required before discontinuing classes. Excessive absenteeism or misconduct may result in termination of enrollment."
    }
  ];

  const tuningInfo = {
    settings: [
      { string: "E", freq: "A4 (440 Hz)" },
      { string: "A", freq: "D4 (293 Hz)" },
      { string: "D", freq: "A3 (220 Hz)" },
      { string: "G", freq: "D3 (146 Hz)" }
    ],
    apps: [
      {
        name: "Soundcorset",
        platform: "Android/iOS",
        link: "https://play.google.com/store/apps/details?id=com.soundcorset.client.android&hl=en_IN&gl=US",
        image: "/lovable-uploads/f9ac38e5-1bd9-4dbe-ac19-73b8866cc805.png"
      },
      {
        name: "DA Tuner",
        platform: "Android",
        link: "https://play.google.com/store/search?q=da%20tuner&c=apps&hl=en_IN&gl=US",
        image: "/lovable-uploads/f762e275-6a46-45d4-98e1-75635c3d1091.png"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Sticky Navigation */}
      <header className="sticky top-0 z-10 bg-white bg-opacity-95 shadow-sm backdrop-blur-sm">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-serif font-bold text-maroon-800">Vijith Violinist</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-800 hover:text-maroon-700 font-medium">Home</a>
            <a href="#about" className="text-gray-800 hover:text-maroon-700 font-medium">About</a>
            <a href="#courses" className="text-gray-800 hover:text-maroon-700 font-medium">Courses</a>
            <a href="#join" className="text-gray-800 hover:text-maroon-700 font-medium">Join</a>
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
      <section id="home" className="relative bg-gradient-to-r from-maroon-900 to-amber-900 text-white py-20 md:py-28">
        <div className="absolute inset-0 opacity-20 bg-[url('/placeholder.svg')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Learn Carnatic Violin with Passion and Precision
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light">
              Online & offline violin classes by violinist Vijith V T
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#join">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                  Join Now <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Vijith V T */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/3">
              <div className="rounded-full overflow-hidden border-4 border-amber-100 shadow-lg w-64 h-64 mx-auto">
                <img src="/lovable-uploads/392d5b68-5127-4b00-a0ab-8cee901d24b0.png" alt="Vijith VT" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-6">
                About Vijith V T
              </h2>
              <p className="text-gray-700 mb-4">
                Vijith V T is a passionate Carnatic violinist from Trivandrum with over 10 years of teaching and performance experience. 
                Trained under Shri Rajagopal Rajappa (Tharangani School of Music) and Vid. S. R. Mahadeva Sarma (A-Top Artist, AIR).
                Holds a Diploma in Violin, MCA, and M.Sc. in Artificial Intelligence.
                Has taught students across India, the USA, and Thailand.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start">
                  <Award className="h-5 w-5 text-amber-500 mr-2 mt-1" />
                  <span className="text-gray-700">Best Classical Violin Teacher – Music Intuit Academy, Bangalore</span>
                </div>
                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-amber-500 mr-2 mt-1" />
                  <span className="text-gray-700">Teaching students from India, USA, Thailand</span>
                </div>
                <div className="flex items-start">
                  <Music className="h-5 w-5 text-amber-500 mr-2 mt-1" />
                  <span className="text-gray-700">Classes at Jovens Academy, Laya Tarang, Bharathakala Society</span>
                </div>
                <div className="flex items-start">
                  <Book className="h-5 w-5 text-amber-500 mr-2 mt-1" />
                  <span className="text-gray-700">Qualifications: Diploma in Violin, MCA, M.Sc. in AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Offered with Fee Details (Merged) */}
      <section id="courses" className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-10 text-center">
            Courses & Fee Details
          </h2>
          
          {/* Course Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courseCards.slice(0, 3).map((course, index) => (
              <div 
                key={index} 
                className="bg-white border border-amber-100 rounded-xl shadow-md hover:shadow-lg transition-all p-6 text-center"
              >
                <div className="flex justify-center mb-4">
                  {course.icon}
                </div>
                <h3 className="text-xl font-bold text-maroon-800 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="text-amber-700 font-medium">{course.fee}</div>
                <div className="text-gray-500 text-sm mt-1 flex items-center justify-center">
                  <Clock className="h-4 w-4 mr-1" /> {course.time}
                </div>
              </div>
            ))}
          </div>
          
          {/* Fourth Course Card centered */}
          <div className="mt-8 max-w-sm mx-auto">
            <div
              className="bg-white border border-amber-100 rounded-xl shadow-md hover:shadow-lg transition-all p-6 text-center"
            >
              <div className="flex justify-center mb-4">
                {courseCards[3].icon}
              </div>
              <h3 className="text-xl font-bold text-maroon-800 mb-2">{courseCards[3].title}</h3>
              <p className="text-gray-600 mb-4">{courseCards[3].description}</p>
              <div className="text-amber-700 font-medium">{courseCards[3].fee}</div>
              <div className="text-gray-500 text-sm mt-1 flex items-center justify-center">
                <Clock className="h-4 w-4 mr-1" /> {courseCards[3].time}
              </div>
            </div>
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

      {/* What You Need to Start */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-10 text-center">
            What You Need to Start
          </h2>
          
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 order-2 md:order-1">
              <ul className="space-y-4">
                {requirements.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img 
                  src="/lovable-uploads/344318eb-d2db-4042-bc9a-5dfaa5558c2e.png" 
                  alt="Stuff You Need" 
                  className="w-full h-auto object-contain max-h-[400px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Know Your Instrument Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-10 text-center">
            Know Your Instrument
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-maroon-800 mb-4">About the Violin</h3>
              <p className="text-gray-700 mb-6">
                The violin is a bowed string instrument from Italy, with four strings (G, D, A, E). 
                It's traditionally made of maple and spruce. Indian violinists typically play seated on the floor.
              </p>
              
              <div className="bg-amber-50 rounded-xl overflow-hidden mb-8">
                <img 
                  src="/lovable-uploads/48f9d0f7-776f-493e-995f-6855aa1e6a6e.png" 
                  alt="Violin Diagram" 
                  className="w-full h-auto max-h-[300px] object-contain"
                  onClick={() => setShowViolinModal(true)}
                />
                <div className="p-3 text-center text-sm text-gray-500">
                  Click image to enlarge
                </div>
              </div>

              <h3 className="text-xl font-semibold text-maroon-800 mb-4">How to Tune the Violin</h3>
              <p className="text-gray-700 mb-4">
                Use pegs for major adjustments, fine tuners for minor tuning. Beginners should use tuning apps or seek help.
              </p>
              
              <div className="bg-maroon-50 rounded-lg p-5 mb-6">
                <h4 className="text-lg font-medium text-maroon-800 mb-3">Tuning Settings:</h4>
                <ul className="space-y-2">
                  {tuningInfo.settings.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="font-medium w-10">{item.string} →</span>
                      <span className="text-gray-700">{item.freq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-maroon-800 mb-4">How to Hold the Violin</h3>
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="md:w-1/2">
                  <p className="text-gray-700 mb-4">
                    Sit cross-legged on a mat, rest scroll on right foot, keep spine straight.
                    Upper part rests above left collarbone for bow and finger movement.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src="/lovable-uploads/f25fd73e-008b-4fbd-aada-2a545f1a97db.png" 
                    alt="How to Hold the Bow" 
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-maroon-800 mb-4">How to Hold the Bow</h3>
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="md:w-1/2">
                  <p className="text-gray-700 mb-4">
                    Maintain a firm but relaxed grip; avoid tight or loose hold. 
                    Fingers should be slightly bent as if holding a flower.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src="/lovable-uploads/0fe0e6d5-2dae-427c-a526-bdfa0ebd1cf1.png" 
                    alt="How to Hold the Violin" 
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-maroon-800 mb-4">Recommended Tuning Apps</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tuningInfo.apps.map((app, index) => (
                  <a 
                    href={app.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    key={index}
                    className="block bg-white rounded-xl border border-amber-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
                  >
                    <img src={app.image} alt={app.name} className="w-full h-auto" />
                    <div className="p-3 text-center">
                      <h4 className="font-medium text-maroon-800">{app.name}</h4>
                      <p className="text-sm text-gray-500">{app.platform}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Large Violin Image Modal */}
          {showViolinModal && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg w-full max-w-4xl overflow-hidden relative">
                <button 
                  onClick={() => setShowViolinModal(false)}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
                >
                  ✕
                </button>
                <img 
                  src="/lovable-uploads/48f9d0f7-776f-493e-995f-6855aa1e6a6e.png" 
                  alt="Violin Diagram" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Learning Process */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-10 text-center">
            Learning Process
          </h2>
          
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-amber-300 hidden md:block"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {learningSteps.map((step, index) => (
                <div key={index} className="flex items-center md:items-start">
                  <div className="bg-maroon-700 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 z-10">
                    {index + 1}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-maroon-900">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Student Recognition */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-10 text-center">
            Student Recognition
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white border border-amber-100 rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-all">
              <Award className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-maroon-800 mb-2">Quarterly Best Performer</h3>
              <p className="text-gray-600">Recognition for outstanding progress and dedication to practice</p>
            </div>
            
            <div className="bg-white border border-amber-100 rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-all">
              <Music className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-maroon-800 mb-2">Graduation Day Showcase</h3>
              <p className="text-gray-600">Opportunity to perform in front of peers and parents</p>
            </div>
            
            <div className="bg-white border border-amber-100 rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-all">
              <Globe className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-maroon-800 mb-2">Student Dashboard</h3>
              <p className="text-gray-600">Track your progress and achievements through our online portal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Guidelines */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-10 text-center">
            Student Guidelines
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {studentGuidelines.map((guideline, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-amber-100 p-5 hover:shadow-md transition-all">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                    <span className="text-amber-700 font-medium">{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-maroon-800 mb-2">{guideline.title}</h3>
                  <p className="text-center text-gray-600 text-sm">{guideline.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-10 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="bg-amber-50 rounded-xl shadow-md">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-amber-200 last:border-0">
                  <AccordionTrigger className="px-6 py-4 hover:bg-amber-100/50 text-left font-medium text-maroon-800">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-700">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Join Now / Contact */}
      <section id="join" className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-10 text-center">
            Join Now
          </h2>
          
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <div className="bg-white rounded-xl shadow-md p-8 h-full">
                <h3 className="text-xl font-bold text-maroon-800 mb-6">Get Started Today</h3>
                <p className="text-gray-700 mb-6">
                  Ready to begin your musical journey with Vijith Violinist? Fill out our admission form or contact us directly through WhatsApp for faster response.
                </p>
                
                <div className="space-y-4">
                  <a 
                    href="https://forms.gle/FCuVKb2bqED64QV3A" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-maroon-800 hover:bg-maroon-900 text-white">
                      Fill Admission Form
                    </Button>
                  </a>
                  
                  <a 
                    href="https://wa.me/8301815324" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="h-4 w-4 mr-2" /> Chat on WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-white rounded-xl shadow-md p-8">
                <h3 className="text-xl font-bold text-maroon-800 mb-6">Contact Information</h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <MessageCircle className="h-6 w-6 text-maroon-600 mr-3" />
                    <div>
                      <p className="font-medium text-maroon-800">WhatsApp</p>
                      <p className="text-gray-700">8301815324</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Phone className="h-6 w-6 text-maroon-600 mr-3" />
                    <div>
                      <p className="font-medium text-maroon-800">Phone</p>
                      <p className="text-gray-700">9496315903</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Mail className="h-6 w-6 text-maroon-600 mr-3" />
                    <div>
                      <p className="font-medium text-maroon-800">Email</p>
                      <p className="text-gray-700">vijithviolinist@gmail.com</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-10 text-center">
            Payment Information
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <div className="md:w-1/3">
              <div className="bg-amber-50 rounded-xl shadow-md p-8 text-center">
                <img 
                  src="/lovable-uploads/d794e0b0-1ad6-4554-9bc1-ee438054131d.png" 
                  alt="Payment QR Code" 
                  className="mx-auto w-48 h-48 object-contain mb-4"
                />
                <p className="text-center font-medium text-maroon-800">Scan to Pay</p>
                <p className="text-center text-gray-500 text-sm mt-1">UPI ID: vijithcapt-1@okicici</p>
              </div>
            </div>
            
            <div className="md:w-1/3">
              <div className="bg-amber-50 rounded-xl shadow-md p-8">
                <h3 className="text-xl font-bold text-maroon-800 mb-4">Bank Details</h3>
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
                <div className="mt-4 pt-4 border-t border-amber-100 text-sm text-gray-500">
                  <p>Please send payment screenshot via WhatsApp after making the payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-maroon-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-serif font-bold">Vijith Violinist</h3>
              <p className="text-maroon-200">Carnatic Classical Violin Academy</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="https://youtube.com/@vijithviolinist" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-300 transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="https://instagram.com/violinwithvijith" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-300 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://facebook.com/vijithviolinist" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-300 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 border-t border-maroon-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-maroon-300">
              &copy; {new Date().getFullYear()} Vijith Violinist's Carnatic Classical Violin Academy. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <a href="#" className="text-maroon-300 hover:text-white transition-colors">Terms & Conditions</a>
              <a href="#" className="text-maroon-300 hover:text-white transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
