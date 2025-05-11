
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import CourseTravelCalculator from "./course/CourseTravelCalculator";

const HeroSection = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  return (
    <section className="relative pt-16 md:pt-0 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50 to-white pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="relative inline-block">
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-maroon-950 mb-2">
                Master the Art of <br />
                <span className="text-maroon-800">Carnatic Violin</span>
              </h1>
              <div className="absolute -bottom-2 left-0 w-24 h-1 bg-amber-500"></div>
            </div>
            
            <p className="text-lg text-gray-700">
              Learn the traditional South Indian violin technique from an experienced teacher. 
              Personalized lessons for beginners to advanced students.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-maroon-700 hover:bg-maroon-800"
                asChild
              >
                <a href="https://forms.gle/FCuVKb2bqED64QV3A" target="_blank" rel="noopener noreferrer">
                  Enroll Now
                </a>
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative h-80 md:h-auto">
            <div className="absolute -top-4 -right-4 w-full h-full bg-amber-200 rounded-lg transform rotate-3"></div>
            <img 
              src="/lovable-uploads/64ab8fd2-ed27-4e9b-b0db-65a08587711f.png" 
              alt="Violin player" 
              className="relative z-10 w-full h-full object-cover rounded-lg shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
