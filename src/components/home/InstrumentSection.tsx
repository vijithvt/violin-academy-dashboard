
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Music, Book, Award, Sparkles, Users, Calendar, Compass, BeakerIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

const FeatureCard = ({ icon, title, description, delay }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string,
  delay: number
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-6 transition-all duration-300 hover:shadow-xl hover:border-amber-200 h-full">
        <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-4 transition-all duration-300 ${isHovered ? 'bg-indigo-600 text-white' : 'bg-amber-100 text-amber-600'}`}>
          {icon}
        </div>
        <h3 className="text-lg font-serif font-bold mb-2 text-maroon-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

const InstrumentSection = () => {
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
    
    const element = document.getElementById("instrument-section");
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const featuresList = [
    {
      icon: <Music className="h-6 w-6" />,
      title: "Authentic Technique",
      description: "Learn proper finger positioning, bowing techniques, and posture for Carnatic violin."
    },
    {
      icon: <Book className="h-6 w-6" />,
      title: "Traditional Learning",
      description: "Study ragas and compositions passed down through generations of great masters."
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Monthly Student Assessments",
      description: "Regular evaluations in partnership with renowned music academies ensure steady progress."
    },
    {
      icon: <Compass className="h-6 w-6" />,
      title: "Structured Curriculum",
      description: "A comprehensive path aligned with university-level standards covering theory, technique, and performance."
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Personalized Student Dashboard",
      description: "Track progress, access practice materials, and set learning goals through your own dashboard."
    },
    {
      icon: <Book className="h-6 w-6" />,
      title: "Educational Resources",
      description: "Practice modules, bowing exercises, theory notes, and raga practice kits—all in one place."
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Trial Class Available",
      description: "First-time learners can book a personalized trial session with the instructor."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Online & Offline Options",
      description: "Attend classes online via video or in-person at our center—flexibility that suits your schedule."
    }
  ];
  
  // Teaching Approach section
  const teachingApproachContent = {
    title: "Teaching Approach",
    description: "A proven methodology combining tradition with modern educational practices",
    features: [
      {
        icon: <Award className="h-5 w-5 text-maroon-600" />,
        title: "Monthly Student Assessments",
        description: "Regular evaluations in partnership with acclaimed music academies"
      },
      {
        icon: <Book className="h-5 w-5 text-maroon-600" />,
        title: "Structured Curriculum",
        description: "University-level standards with clear learning pathways"
      },
      {
        icon: <Sparkles className="h-5 w-5 text-maroon-600" />,
        title: "Custom Student Dashboard",
        description: "Track progress & practice with personalized analytics"
      },
      {
        icon: <Music className="h-5 w-5 text-maroon-600" />,
        title: "Educational Resources",
        description: "Comprehensive materials covering technique and theory"
      }
    ]
  };

  return (
    <section id="instrument" className="py-20 bg-gradient-to-b from-white to-amber-50 relative">
      <div className="container mx-auto px-4" id="instrument-section">
        {/* Teaching Approach Section */}
        <div className={cn(
          "mb-16 transition-all duration-1000 transform",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-4xl font-serif font-bold text-maroon-900 mb-3">
              {teachingApproachContent.title}
            </h2>
            <p className="text-lg text-gray-600">{teachingApproachContent.description}</p>
            <div className="h-1 w-24 bg-amber-400 mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {teachingApproachContent.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-lg p-6 shadow-md border border-maroon-100 
                  ${index % 2 === 0 ? 'bg-gradient-to-br from-white to-maroon-50' : 'bg-gradient-to-br from-white to-amber-50'}`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-white p-3 shadow-md mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-serif font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Learn Carnatic Classical Violin Section */}
        <div className={cn(
          "mb-8 transition-all duration-1000 transform",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-maroon-900 mb-3">
              Learn Carnatic Classical Violin
            </h2>
            <p className="text-lg text-gray-600">Comprehensive education for students at all levels</p>
            <div className="h-1 w-24 bg-amber-400 mx-auto mt-4"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresList.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index}
            />
          ))}
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-32 -left-24 w-64 h-64 bg-amber-200 rounded-full opacity-20 blur-3xl"
        style={{ animation: 'float 15s ease-in-out infinite alternate' }}>
      </div>
      <div className="absolute bottom-20 -right-32 w-80 h-80 bg-maroon-200 rounded-full opacity-10 blur-3xl"
        style={{ animation: 'float 20s ease-in-out infinite alternate-reverse' }}>
      </div>
    </section>
  );
};

export default InstrumentSection;
