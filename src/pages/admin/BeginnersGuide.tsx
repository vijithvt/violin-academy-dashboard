
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "@/context/SupabaseContext";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Music, Book, ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const BeginnersGuide = () => {
  const { user, logout } = useSupabase();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logout();
    navigate("/admin-login");
  };

  const tuningReference = [
    { string: "E (1st)", note: "Madhyasthayi Pa", frequency: "A4 – 440Hz" },
    { string: "A (2nd)", note: "Madhyasthayi Sa", frequency: "D4 – 293Hz" },
    { string: "D (3rd)", note: "Mantrasthayi Pa", frequency: "A3 – 220Hz" },
    { string: "G (4th)", note: "Mantrasthayi Sa", frequency: "D3 – 146Hz" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <header className="bg-indigo-700 text-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Music className="h-6 w-6 text-white mr-2" />
            <span className="text-xl font-serif font-bold text-white">Vijith Violinist - Admin</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/admin-dashboard")}
              className="flex items-center text-white hover:text-white hover:bg-indigo-600"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
            </Button>
            <Button variant="destructive" size="sm" onClick={handleLogout} className="flex items-center">
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-indigo-900 mb-2 flex items-center">
          <Book className="h-8 w-8 mr-3 text-indigo-800" />
          Beginner's Violin Guide
        </h1>
        <p className="text-gray-600 mb-8">Teaching resource for beginner violin students</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <Card className="border-amber-100 shadow-md">
            <CardHeader className="bg-gradient-to-r from-indigo-800 to-amber-800 text-white">
              <CardTitle className="text-xl font-serif">1. About the Violin</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-700 mb-4">
                The violin is a bowed, string instrument. It was first made nearly five hundred years ago in Italy. 
                The violin has four strings (and sometimes, five). The four strings are called G, D, A, and E, 
                where 'G' is the lowest and 'E' is the highest.
              </p>
              <p className="text-gray-700 mb-4">
                The violin is made from maple and spruce wood. The top of the violin is usually spruce, 
                and the side and bottom are maple. The best bows are made from pernambuco wood and horse hair, 
                but many bows are also made from carbon fibre.
              </p>
              <p className="text-gray-700">
                In Western classical music, violinists play the violin standing up. 
                In Indian classical music, violinists play the violin sitting down.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-amber-100 shadow-md">
            <CardHeader className="bg-gradient-to-r from-indigo-800 to-amber-800 text-white">
              <CardTitle className="text-xl font-serif">2. Know Your Instrument</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex justify-center mb-4">
                <img 
                  src="/lovable-uploads/05e475b8-fc92-4e56-a060-b2d4143856f8.png" 
                  alt="Violin and bow diagram" 
                  className="rounded-lg max-h-72 object-contain"
                />
              </div>
              <p className="text-gray-700 mb-3 font-medium">
                Parts of the violin include:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Scroll - The decorative carved end of the pegbox</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Pegs - Used to tune the violin strings</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Fingerboard - Where fingers press to change notes</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Bridge - Supports the strings and transmits vibrations</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Fine tuners - For precise string tuning adjustments</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Tailpiece - Anchors the strings at the bottom</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <Card className="border-amber-100 shadow-md">
            <CardHeader className="bg-gradient-to-r from-indigo-800 to-amber-800 text-white">
              <CardTitle className="text-xl font-serif">3. How to Hold the Violin</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex justify-center mb-4">
                <img 
                  src="/lovable-uploads/a790e3f8-64f8-4c20-9542-ac33bec7651a.png" 
                  alt="How to hold the violin" 
                  className="rounded-lg max-h-72 object-contain"
                />
              </div>
              <p className="text-gray-700 mb-4">
                When you play the Carnatic violin, you have to sit cross-legged on the floor, 
                preferably on a mat.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Your right leg should be slightly pushed forward to enable the scroll of the violin to be placed on it.</li>
                <li>Your back should be erect - this is very important to avoid lower back pain.</li>
                <li>Depending on your height, you can move your right leg forward or backward to support the violin and, at the same time, ensure that your back is straight.</li>
                <li>The scroll of the violin will rest on your right foot.</li>
                <li>The upper part of the violin should rest on your shoulder a little above your left collar bone.</li>
                <li>Your violin should be balanced in this position to leave you free movement of the hands - the right for the bow and the left for playing different notes on the strings.</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-amber-100 shadow-md">
            <CardHeader className="bg-gradient-to-r from-indigo-800 to-amber-800 text-white">
              <CardTitle className="text-xl font-serif">4. How to Hold the Bow</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex justify-center mb-4">
                <img 
                  src="/lovable-uploads/6c264240-b2ea-4e1e-8cd5-a4b421850ff2.png" 
                  alt="How to hold the bow" 
                  className="rounded-lg max-h-72 object-contain"
                />
              </div>
              <p className="text-gray-700 mb-4">
                Before you start your violin practice, you must tighten the bow so the hair is firm and tight.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>To hold the bow, you must ensure that your fingers are all bent (as if they were holding an egg or holding a flower) with the first crease on each finger touching the lower part of the bow.</li>
                <li>The grip is important because it allows you free movement over all the four strings of the violin.</li>
                <li>If you grip it too tightly, you might not be able to move across all the strings fluidly and you might produce those scratchy sounds that beginners are famous for!</li>
                <li>If you hold it too loosely, you are in danger of dropping the bow.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Tala and Shruthi Widgets Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-indigo-800 mb-4">Practice Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-amber-100 shadow-md">
              <CardHeader className="bg-gradient-to-r from-indigo-800 to-amber-800 text-white">
                <CardTitle className="text-xl font-serif">Tala (Rhythm)</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 h-[400px]">
                <iframe
                  src="https://bindus.sg-host.com/platform_widgets/sapa-widgets/metronome/index.html"
                  title="Tala Widget"
                  className="w-full h-full border-0 rounded-md"
                  allow="autoplay"
                />
              </CardContent>
            </Card>
            
            <Card className="border-amber-100 shadow-md">
              <CardHeader className="bg-gradient-to-r from-indigo-800 to-amber-800 text-white">
                <CardTitle className="text-xl font-serif">Shruthi (Pitch)</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 h-[400px]">
                <iframe
                  src="https://bindus.sg-host.com/platform_widgets/sapa-widgets/tambura/"
                  title="Shruthi Widget"
                  className="w-full h-full border-0 rounded-md"
                  allow="autoplay"
                />
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-amber-100 shadow-md">
            <CardHeader className="bg-gradient-to-r from-indigo-800 to-amber-800 text-white">
              <CardTitle className="text-xl font-serif">5. How to Tune the Violin</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-700 mb-4">
                Tuning is the process of increasing or decreasing the tension of the strings that we attain 
                by using the two parts of the violin, Pegs and Fine Tuners.
              </p>
              <p className="text-gray-700 mb-4">
                Pegs are used for large changes in pitch while fine tuners are used for the finer adjustments. 
                It is a good practice when using a peg to first loosen it (even if you want to increase the pitch of the string) 
                and release the extra tension before you tune up.
              </p>
              <p className="text-amber-700 font-medium mb-3">
                ⚠️ Beginners would be advised to use the services of a professional to tune the violin. 
                If you are doing it yourself, use the fine tuners to tune the violin as by turning the pegs 
                indiscriminately you could risk breaking your strings.
              </p>
              
              <Table>
                <TableCaption>Violin Tuning Reference</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>String</TableHead>
                    <TableHead>Carnatic Note</TableHead>
                    <TableHead>Frequency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tuningReference.map((row) => (
                    <TableRow key={row.string}>
                      <TableCell className="font-medium">{row.string}</TableCell>
                      <TableCell>{row.note}</TableCell>
                      <TableCell>{row.frequency}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card className="border-amber-100 shadow-md">
            <CardHeader className="bg-gradient-to-r from-indigo-800 to-amber-800 text-white">
              <CardTitle className="text-xl font-serif">6. Violin Tuning Apps</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="list-disc pl-5 space-y-3 text-gray-700">
                <li>
                  <strong>Soundcorset</strong> – Android/iOS{" "}
                  <a 
                    href="https://play.google.com/store/apps/details?id=com.soundcorset.client.android&hl=en_IN&gl=US" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Download Link
                  </a>
                </li>
                <li>
                  <strong>Da Tuner</strong> – Android{" "}
                  <a 
                    href="https://play.google.com/store/search?q=da%20tuner" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Download Link
                  </a>
                </li>
                <li>
                  <strong>Tuner T1</strong> – iOS{" "}
                  <a 
                    href="https://apps.apple.com/us/app/tuner-t1/id553996731" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Download Link
                  </a>
                </li>
              </ul>
              
              <Separator className="my-6" />
              
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-indigo-800">Tips for Teachers</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Demonstrate proper sitting posture at the start of every session for new students</li>
                  <li>Check bow grip regularly - this is the most common issue for beginners</li>
                  <li>Teach students to tune with fine tuners only until they are experienced enough</li>
                  <li>Begin with plucking exercises before introducing bow techniques</li>
                  <li>Use visual markers for finger positions when teaching beginners</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default BeginnersGuide;
