
import { ChevronRight } from "lucide-react";

const InstrumentSection = () => {
  return (
    <section className="py-16 relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-amber-100"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-10 text-center">
          Learn Carnatic Classical Violin
        </h2>
        
        {/* Empty section that can be filled later */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-md max-w-4xl mx-auto">
          <p className="text-gray-700 text-center italic">
            Content for this section will be added in future updates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InstrumentSection;
