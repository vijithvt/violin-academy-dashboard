
import { 
  CheckCircle, 
  HelpCircle, 
  AlertCircle, 
  ShoppingCart, 
  Music, 
  Violin,
  AlertTriangle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const RequirementsSection = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('guide');
  
  const requirements = [
    {
      name: "Violin",
      description: "Main instrument",
      image: "/lovable-uploads/6f4fc66e-f728-44f8-a1da-6721b9682495.png"
    },
    {
      name: "Bow",
      description: "For sound production",
      image: "/lovable-uploads/2386dc2f-15e2-4fbc-b5af-d210ea749099.png"
    },
    {
      name: "Rosin",
      description: "Helps bow grip strings",
      image: "/lovable-uploads/25386e0b-f745-41d2-9872-a2e7cdb3a6e4.png"
    },
    {
      name: "Metronome",
      description: "For rhythm practice",
      image: "/lovable-uploads/cc04dd6a-b479-4eae-a679-718755823964.png"
    },
    {
      name: "Tambura App",
      description: "For pitch reference",
      image: "/lovable-uploads/6b8c4f2e-e217-47eb-9d47-c1a8ed576634.png"
    },
    {
      name: "Practice Journal",
      description: "To track progress",
      image: "/lovable-uploads/65a367ac-e8fa-48a2-80fa-7cbc03541542.png"
    }
  ];

  const recommendedModels = [
    {
      name: "Beginner's Choice",
      price: "₹6,000 - ₹8,000",
      description: "Perfect for new students, includes all essential accessories",
      image: "/lovable-uploads/6f4fc66e-f728-44f8-a1da-6721b9682495.png"
    },
    {
      name: "Student Model",
      price: "₹10,000 - ₹15,000",
      description: "Better sound quality, good for intermediate students",
      image: "/lovable-uploads/6f4fc66e-f728-44f8-a1da-6721b9682495.png"
    },
    {
      name: "Advanced Model",
      price: "₹20,000+",
      description: "Superior craftsmanship, rich sound for advanced players",
      image: "/lovable-uploads/6f4fc66e-f728-44f8-a1da-6721b9682495.png"
    }
  ];

  const commonMistakes = [
    "Buying a violin without trying it first",
    "Choosing based on price alone without considering quality",
    "Ignoring the importance of proper setup and adjustment",
    "Not getting the correct size for your body",
    "Forgetting essential accessories like shoulder rest or rosin"
  ];

  const handleBrowseClick = () => {
    toast({
      title: "Violin Models",
      description: "This would take you to a page with detailed violin models."
    });
  };

  return (
    <section id="requirements" className="py-16 bg-gradient-to-r from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-maroon-900 mb-6">
            Your Journey Begins Here: Violin Purchase Guide & Beginner's Essentials
          </h2>
          <p className="text-gray-600 mb-8">Everything you need to know to start your Carnatic violin journey</p>
          <Button 
            onClick={handleBrowseClick}
            className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Browse Violin Models
          </Button>
        </div>
        
        {/* Tab Navigation */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex p-1 bg-amber-50 rounded-lg shadow-sm">
            <button 
              onClick={() => setActiveTab('guide')} 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'guide' ? 'bg-white shadow-sm text-maroon-900' : 'text-gray-600 hover:text-maroon-800'}`}
            >
              Violin Purchase Guide
            </button>
            <button 
              onClick={() => setActiveTab('essentials')} 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'essentials' ? 'bg-white shadow-sm text-maroon-900' : 'text-gray-600 hover:text-maroon-800'}`}
            >
              Beginner's Essentials
            </button>
          </div>
        </div>
        
        {activeTab === 'guide' ? (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Where to Buy Section */}
              <Card className="border-amber-100 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="bg-gradient-to-r from-amber-100 to-amber-50 py-4 px-6">
                  <h3 className="text-xl font-bold text-maroon-900 flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-2 text-amber-600" /> Where to Buy
                  </h3>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-700">
                    It's recommended to buy locally to ensure you can check the setup (tuning pegs, 
                    string adjusters, etc.). Visit a music store where you can physically examine the 
                    instrument before purchase. Avoid online purchases unless you're familiar with 
                    tuning and setups.
                  </p>
                </CardContent>
              </Card>
              
              {/* Checklist Section */}
              <Card className="border-amber-100 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="bg-gradient-to-r from-amber-100 to-amber-50 py-4 px-6">
                  <h3 className="text-xl font-bold text-maroon-900 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-amber-600" /> Before Buying, Check These
                  </h3>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-4">
                    Here's a detailed checklist to ensure you purchase the right violin and accessories for your learning journey.
                  </p>
                  <ul className="space-y-3">
                    {[
                      {
                        title: "Violin Size",
                        desc: "For adults and children 11+, a 4/4 (full-size) violin is the standard."
                      },
                      {
                        title: "String Heights & Spacing",
                        desc: "If strings are too high, it becomes difficult to press them down and play with ease."
                      },
                      {
                        title: "Smooth Tuning Pegs & Adjusters",
                        desc: "Make sure the pegs move smoothly and aren't loose or tight."
                      }
                    ].map((item, i) => (
                      <li key={i} className="flex">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-maroon-800">{item.title}: </span>
                          <span className="text-gray-700">{item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            {/* Recommended Violin Models */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-maroon-900 mb-6 flex items-center">
                <Violin className="h-5 w-5 mr-2 text-amber-600" /> Recommended Violin Models
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedModels.map((model, i) => (
                  <Card key={i} className="border-amber-100 overflow-hidden transition-all duration-300 transform hover:shadow-lg hover:-translate-y-1">
                    <div className="h-40 bg-amber-50 flex items-center justify-center p-4">
                      <img 
                        src={model.image} 
                        alt={model.name} 
                        className="max-h-full object-contain"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-bold text-maroon-800">{model.name}</h4>
                      <p className="text-amber-600 font-medium">{model.price}</p>
                      <p className="text-gray-600 text-sm mt-2">{model.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Checklist in Detail */}
            <Card className="border-amber-100 shadow-md mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-maroon-900 mb-6">Complete Buying Checklist</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {[
                    {
                      title: "Violin Size",
                      desc: "Ensure that the violin is the right size for your body."
                    },
                    {
                      title: "String Heights & Spacing",
                      desc: "Check if the string heights are well-adjusted and comfortable for playing."
                    },
                    {
                      title: "Smooth Tuning Pegs & Adjusters",
                      desc: "Ensure that tuning pegs and fine tuners are smooth and functional."
                    },
                    {
                      title: "Rosin",
                      desc: "Verify that the violin includes rosin, which is essential for creating the proper friction between the bow and the strings."
                    },
                    {
                      title: "Accessories",
                      desc: "Confirm that the violin comes with necessary accessories: bow, case, shoulder rest, extra strings, and tuner."
                    },
                    {
                      title: "Extra Beginner Strings",
                      desc: "Ensure you get extra strings in case one breaks."
                    },
                    {
                      title: "Violin Case",
                      desc: "Check that the violin case is sturdy, especially if you'll be transporting the violin often."
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-maroon-800">{item.title}: </span>
                        <span className="text-gray-700">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Common Mistakes */}
            <Card className="border-amber-100 shadow-md">
              <div className="bg-gradient-to-r from-amber-100 to-amber-50 py-4 px-6">
                <h3 className="text-xl font-bold text-maroon-900 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-amber-600" /> Common Mistakes to Avoid
                </h3>
              </div>
              <CardContent className="p-6">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {commonMistakes.map((mistake, i) => (
                    <li key={i} className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{mistake}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
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
                      <div className="w-24 h-24 mb-3 bg-white rounded-lg overflow-hidden flex items-center justify-center border border-amber-100">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="object-contain h-20 w-20"
                        />
                      </div>
                      <h4 className="font-medium text-maroon-800 mb-1">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Beginner Violin Tips */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-amber-100">
                <h3 className="text-xl font-bold text-maroon-800 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-maroon-800 text-white rounded-full flex items-center justify-center mr-3">2</span>
                  Beginner Violin Tips
                </h3>
                
                <div className="space-y-4">
                  <Card className="border-amber-100">
                    <CardContent className="p-4">
                      <h4 className="font-medium flex items-center text-maroon-800 mb-2">
                        <Music className="h-4 w-4 mr-2 text-amber-600" /> How to Tune Your Violin
                      </h4>
                      <p className="text-sm text-gray-700">
                        Use fine tuners for minor adjustments, pegs for larger changes. Always tune from a lower pitch 
                        and check your string tension to avoid breakage.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-amber-100">
                    <CardContent className="p-4">
                      <h4 className="font-medium flex items-center text-maroon-800 mb-2">
                        <Violin className="h-4 w-4 mr-2 text-amber-600" /> How to Hold the Violin
                      </h4>
                      <p className="text-sm text-gray-700">
                        Proper posture is crucial. Sit cross-legged, back straight, with the violin scroll 
                        resting on your right foot. Balance the violin between collarbone and shoulder.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-amber-100">
                    <CardContent className="p-4">
                      <h4 className="font-medium flex items-center text-maroon-800 mb-2">
                        <HelpCircle className="h-4 w-4 mr-2 text-amber-600" /> How to Hold the Bow
                      </h4>
                      <p className="text-sm text-gray-700">
                        Hold the bow with curved fingers, as if holding a flower. The grip should be 
                        neither too loose nor too tight. Make sure the bow is properly tightened before playing.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            
            {/* Tuning Apps */}
            <div className="mt-8">
              <Card className="border-amber-100 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-maroon-900 mb-4">Recommended Tuning Apps</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-maroon-800">Soundcorset: </span>
                        <span className="text-gray-700">Available for Android & iOS, includes metronome</span>
                        <div>
                          <a 
                            href="https://play.google.com/store/apps/details?id=com.soundcorset.client.android" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            Download Link
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-maroon-800">Da Tuner: </span>
                        <span className="text-gray-700">Precise chromatic tuner for Android</span>
                        <div>
                          <a 
                            href="https://play.google.com/store/search?q=da%20tuner" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            Download Link
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RequirementsSection;
