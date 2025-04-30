import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";

const InstrumentSection = () => {
  return (
    <section className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-10 text-center">
          Learn the Violin
        </h2>
        
        <Tabs defaultValue="parts" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="parts">Violin Parts</TabsTrigger>
            <TabsTrigger value="holding">How to Hold</TabsTrigger>
            <TabsTrigger value="tuning">Tuning</TabsTrigger>
          </TabsList>
          
          <TabsContent value="parts" className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold text-maroon-800 mb-4">Parts of the Violin</h3>
                <p className="text-gray-700 mb-6">
                  Understanding the different parts of the violin is essential for proper 
                  handling, maintenance, and playing technique. Let's explore the main components 
                  of this beautiful instrument.
                </p>
                <div className="flex justify-center md:justify-start">
                  <a 
                    href="https://www.youtube.com/watch?v=SYoQ8uPNvA0" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-amber-700 hover:text-amber-600 transition-colors font-medium"
                  >
                    Learn more <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="/lovable-uploads/f9ac38e5-1bd9-4dbe-ac19-73b8866cc805.png" 
                  alt="Violin Parts" 
                  className="rounded-lg shadow-md w-full md:w-4/5 mx-auto h-auto"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="holding" className="bg-white rounded-lg p-6 shadow-md">
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 order-2 md:order-1">
                  <h3 className="text-xl font-bold text-maroon-800 mb-4">How to Hold the Violin</h3>
                  <p className="text-gray-700">
                    The proper way to hold the violin is crucial for comfort and technique. 
                    Rest it on your left shoulder, with your chin on the chinrest. Your left 
                    hand supports the neck without gripping too tightly. Maintain a relaxed 
                    posture throughout your practice sessions.
                  </p>
                </div>
                <div className="md:w-1/2 order-1 md:order-2">
                  <img 
                    src="/lovable-uploads/ddbf5914-5683-4ad3-a520-ce04446ee41a.png" 
                    alt="How to Hold the Violin" 
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <h3 className="text-xl font-bold text-maroon-800 mb-4">How to Hold the Bow</h3>
                  <p className="text-gray-700">
                    The bow hold is as important as holding the violin correctly. Your right 
                    hand should be curved naturally, with your thumb in the notch of the frog 
                    and your pinky finger resting on top. The middle fingers wrap around the 
                    frog, maintaining a relaxed but controlled grip.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src="/lovable-uploads/f762e275-6a46-45d4-98e1-75635c3d1091.png" 
                    alt="How to Hold the Bow" 
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tuning" className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold text-maroon-800 mb-4">Tuning Your Violin</h3>
                <p className="text-gray-700 mb-4">
                  Proper tuning is essential for a good sound. The standard tuning for the violin 
                  is G-D-A-E, from lowest to highest. You can use a digital tuner like the one 
                  shown here, or tune by ear using reference pitches.
                </p>
                <p className="text-gray-700">
                  Regular tuning keeps your instrument sounding its best and trains your ear to 
                  recognize correct pitches.
                </p>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="/lovable-uploads/0fe0e6d5-2dae-427c-a526-bdfa0ebd1cf1.png" 
                  alt="DA Tuner" 
                  className="rounded-lg shadow-md w-full md:w-4/5 mx-auto h-auto"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default InstrumentSection;
