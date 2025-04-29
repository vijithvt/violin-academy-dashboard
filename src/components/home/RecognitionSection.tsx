
import { Award, Music, Globe } from "lucide-react";

const RecognitionSection = () => {
  return (
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
  );
};

export default RecognitionSection;
