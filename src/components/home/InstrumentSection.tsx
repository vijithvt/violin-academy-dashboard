
import { ChevronRight, Music, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const InstrumentSection = () => {
  const features = [
    {
      icon: <Music className="w-8 h-8 text-purple-600" />,
      title: "Authentic Technique",
      description: "Learn proper finger positioning, bowing techniques, and posture for Carnatic violin"
    },
    {
      icon: <Award className="w-8 h-8 text-amber-500" />,
      title: "Traditional Approach",
      description: "Study classical ragas and compositions passed down through generations"
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-600" />,
      title: "Structured Learning",
      description: "Progress through a systematic curriculum designed for all skill levels"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-amber-50 opacity-70"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-repeat opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-serif font-bold text-purple-900 mb-4">
            Learn Carnatic Classical Violin
          </h2>
          <p className="text-lg text-gray-700">
            Discover the rich tradition and expressive capabilities of one of India's most beloved classical instruments
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-100 transform transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl"
            >
              <div className="rounded-full bg-amber-50 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-purple-800 mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-full">
            Explore Lessons <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InstrumentSection;
