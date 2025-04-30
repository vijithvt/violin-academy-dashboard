
import { CheckCircle, ShoppingCart, HelpCircle, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RequirementsSection = () => {
  const requirements = [
    "Violin, bow, rosin",
    "Metronome / Tala Meter",
    "Tambura / Tambura App",
    "Mirror, Notebook, Recorder"
  ];

  return (
    <section id="requirements" className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-10 text-center">
          What You Need to Start
        </h2>
        
        <Tabs defaultValue="requirements" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="requirements">Basic Requirements</TabsTrigger>
            <TabsTrigger value="purchase">Violin Purchase Guide</TabsTrigger>
          </TabsList>
          
          <TabsContent value="requirements">
            <Card>
              <CardHeader>
                <CardTitle>Essential Materials</CardTitle>
                <CardDescription>Items needed for your violin learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {requirements.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="purchase">
            <Card>
              <CardHeader>
                <CardTitle>New Violin Purchase Guide</CardTitle>
                <CardDescription>Recommendations for absolute beginners</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg flex items-center mb-2">
                    <ShoppingCart className="h-5 w-5 mr-2 text-amber-600" /> Where to Buy
                  </h3>
                  <p className="text-gray-700">
                    Whichever part of the world you live in, it's best to go to a nearby music store to
                    buy a violin in preference to buying it online on Amazon. This is because it's
                    important to get the setup of the violin checked (tuning pegs, string adjusters,
                    nut and bridge height) before you purchase and take the seller's suggestion on
                    the best entry level model.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg flex items-center mb-2">
                    <AlertCircle className="h-5 w-5 mr-2 text-amber-600" /> Recommended Models
                  </h3>
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
                  <h3 className="font-semibold text-lg flex items-center mb-2">
                    <HelpCircle className="h-5 w-5 mr-2 text-amber-600" /> Questions to Ask When Buying
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Are all the string heights according to norms?</li>
                    <li>Are all the strings spaced uniformly on bridge and nut?</li>
                    <li>Are the tuning pegs and string adjusters smooth enough to use?</li>
                    <li>Does a bow rosin come along with the violin? (If not, buy a separate one)</li>
                    <li>Always keep an extra set of beginner strings with you in case strings snap during playing.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default RequirementsSection;
