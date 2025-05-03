
import { CheckCircle, ShoppingCart, HelpCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const RequirementsSection = () => {
  const { toast } = useToast();
  
  const requirements = [
    {
      name: "Violin",
      description: "The main instrument for learning Carnatic music",
      image: "/lovable-uploads/f25fd73e-008b-4fbd-aada-2a545f1a97db.png"
    },
    {
      name: "Bow",
      description: "Essential for producing sound on your violin",
      image: "/lovable-uploads/f25fd73e-008b-4fbd-aada-2a545f1a97db.png"
    },
    {
      name: "Rosin",
      description: "Helps the bow grip the strings properly",
      image: "/lovable-uploads/f25fd73e-008b-4fbd-aada-2a545f1a97db.png"
    },
    {
      name: "Metronome / Tala Meter",
      description: "Helps maintain rhythm and tempo",
      image: "/lovable-uploads/f25fd73e-008b-4fbd-aada-2a545f1a97db.png"
    },
    {
      name: "Tambura / Tambura App",
      description: "Provides the drone sound for pitch reference",
      image: "/lovable-uploads/f25fd73e-008b-4fbd-aada-2a545f1a97db.png"
    },
    {
      name: "Mirror, Notebook, Recorder",
      description: "For self-assessment and note-taking",
      image: "/lovable-uploads/f25fd73e-008b-4fbd-aada-2a545f1a97db.png"
    }
  ];

  const handleJoinNow = () => {
    toast({
      title: "Join Now",
      description: "Thank you for your interest! Please fill out the admission form or contact us via WhatsApp.",
      duration: 5000,
    });
  };

  return (
    <section id="requirements" className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-10 text-center">
          What You Need to Start
        </h2>
        
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                <div className="bg-maroon-800 text-white p-4">
                  <h3 className="text-xl font-bold flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" /> Basic Requirements
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {requirements.map((item, index) => (
                      <div key={index} className="flex flex-col items-center bg-amber-50 p-4 rounded-lg shadow-sm">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-24 h-24 object-contain mb-3"
                        />
                        <h4 className="font-semibold text-maroon-800 mb-1">{item.name}</h4>
                        <p className="text-sm text-gray-600 text-center">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                <div className="bg-maroon-800 text-white p-4">
                  <h3 className="text-xl font-bold flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-2" /> Violin Purchase Guide
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg flex items-center mb-2">
                      <AlertCircle className="h-5 w-5 mr-2 text-amber-600" /> Where to Buy
                    </h4>
                    <p className="text-gray-700">
                      Whichever part of the world you live in, it's best to go to a nearby music store to
                      buy a violin in preference to buying it online on Amazon. This is because it's
                      important to get the setup of the violin checked (tuning pegs, string adjusters,
                      nut and bridge height) before you purchase and take the seller's suggestion on
                      the best entry level model.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg flex items-center mb-2">
                      <AlertCircle className="h-5 w-5 mr-2 text-amber-600" /> Recommended Models
                    </h4>
                    <p className="text-gray-700 mb-3">
                      If you are over 11 years of age you can get a full size 4/4 violin. The entry level models 
                      (preferably Chinese or Korean made violins) in India cost around Rs 6000/7000. You can buy 
                      these to begin with. Anything below this might not be of good quality and we will not recommend this.
                    </p>
                    <p className="text-gray-700">
                      <a 
                        href="http://www.fiddleheads.ca/shop/violin-sizes-viola-and-violin-size-chart.htm" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        Details on violin sizes for younger students
                      </a>
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg flex items-center mb-2">
                      <HelpCircle className="h-5 w-5 mr-2 text-amber-600" /> Questions to Ask When Buying
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Are all the string heights according to norms?</li>
                      <li>Are all the strings spaced uniformly on bridge and nut?</li>
                      <li>Are the tuning pegs and string adjusters smooth enough to use?</li>
                      <li>Does a bow rosin come along with the violin? (If not, buy a separate one)</li>
                      <li>Always keep an extra set of beginner strings with you in case strings snap during playing.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <button 
            onClick={handleJoinNow}
            className="bg-maroon-800 text-white py-3 px-6 rounded-full hover:bg-maroon-700 transition-colors font-medium shadow-md"
          >
            Join Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default RequirementsSection;
