
import { CheckCircle, HelpCircle, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const RequirementsSection = () => {
  const { toast } = useToast();
  
  const requirements = [
    {
      name: "Violin",
      description: "Main instrument"
    },
    {
      name: "Bow",
      description: "For sound production"
    },
    {
      name: "Rosin",
      description: "Helps bow grip strings"
    },
    {
      name: "Metronome",
      description: "For rhythm practice"
    },
    {
      name: "Tambura App",
      description: "For pitch reference"
    },
    {
      name: "Practice Journal",
      description: "To track progress"
    }
  ];

  return (
    <section id="requirements" className="py-16 bg-gradient-to-r from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-10 text-center">
          What You Need to Start
        </h2>
        
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Requirements */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-amber-100">
              <h3 className="text-xl font-bold text-maroon-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-maroon-800 text-white rounded-full flex items-center justify-center mr-3">1</span>
                Essential Materials
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {requirements.map((item, index) => (
                  <div key={index} className="bg-amber-50 p-4 rounded-lg shadow-sm flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                      <span className="text-maroon-700 font-semibold">{index + 1}</span>
                    </div>
                    <h4 className="font-medium text-maroon-800 mb-1">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Violin Purchase Guide */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-amber-100">
              <h3 className="text-xl font-bold text-maroon-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-maroon-800 text-white rounded-full flex items-center justify-center mr-3">2</span>
                Violin Purchase Guide
              </h3>
              
              <div className="space-y-4">
                <Card className="border-amber-100">
                  <CardContent className="p-4">
                    <h4 className="font-medium flex items-center text-maroon-800 mb-2">
                      <AlertCircle className="h-4 w-4 mr-2 text-amber-600" /> Where to Buy
                    </h4>
                    <p className="text-sm text-gray-700">
                      Visit a local music store instead of buying online to check the violin setup (tuning pegs, 
                      string adjusters, bridge height) before purchase.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-amber-100">
                  <CardContent className="p-4">
                    <h4 className="font-medium flex items-center text-maroon-800 mb-2">
                      <AlertCircle className="h-4 w-4 mr-2 text-amber-600" /> Recommended Models
                    </h4>
                    <p className="text-sm text-gray-700">
                      For age 11+, choose a full size (4/4) violin. Entry-level Chinese/Korean violins 
                      (₹6000-7000) are adequate for beginners.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-amber-100">
                  <CardContent className="p-4">
                    <h4 className="font-medium flex items-center text-maroon-800 mb-2">
                      <HelpCircle className="h-4 w-4 mr-2 text-amber-600" /> Before Buying, Check
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>String heights and spacing</li>
                      <li>Smooth tuning pegs and adjusters</li>
                      <li>Included rosin and accessories</li>
                      <li>Extra beginner strings</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequirementsSection;
