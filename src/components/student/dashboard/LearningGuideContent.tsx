
import { Book, Clock } from "lucide-react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Tuning reference data
const tuningReference = [
  { string: "E (1st)", note: "Madhyasthayi Pa", frequency: "A4 – 440Hz" },
  { string: "A (2nd)", note: "Madhyasthayi Sa", frequency: "D4 – 293Hz" },
  { string: "D (3rd)", note: "Mantrasthayi Pa", frequency: "A3 – 220Hz" },
  { string: "G (4th)", note: "Mantrasthayi Sa", frequency: "D3 – 146Hz" },
];

// Student guidelines
const studentGuidelines = [
  {
    title: "Be Punctual",
    description: "Join classes on time and be prepared"
  },
  {
    title: "Maintain Discipline",
    description: "Respect teacher and peers during sessions"
  },
  {
    title: "Practice Regularly",
    description: "Follow daily routine as prescribed"
  },
  {
    title: "Stay Organized",
    description: "Manage materials and notes systematically"
  },
  {
    title: "Participate Actively",
    description: "Submit recordings, join activities"
  },
  {
    title: "Use Dashboard",
    description: "Track attendance and monitor progress"
  },
  {
    title: "Honest Submissions",
    description: "Send genuine practice recordings"
  },
  {
    title: "Communicate Well",
    description: "Inform prior if absent (min. 6 hours notice)"
  }
];

interface LearningGuideContentProps {
  firstName: string;
}

const LearningGuideContent = ({ firstName }: LearningGuideContentProps) => {
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-maroon-900 mb-2 flex items-center">
        <Book className="h-8 w-8 mr-3 text-maroon-800" />
        Beginner's Violin Guide
      </h1>
      <p className="text-gray-600 mb-8">Welcome to your personalized learning journey, {firstName}!</p>
      
      {/* Student Guidelines Section */}
      <Card className="border-amber-100 shadow-md mb-10">
        <CardHeader className="bg-gradient-to-r from-maroon-800 to-amber-800 text-white">
          <CardTitle className="text-xl font-serif">Student Guidelines</CardTitle>
          <CardDescription className="text-amber-100">
            Follow these guidelines for successful learning
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentGuidelines.map((guideline, index) => (
              <div key={index} className="bg-amber-50 rounded-xl shadow-sm border border-amber-100 p-5 hover:shadow-md transition-all">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                    <span className="text-amber-700 font-medium">{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-maroon-800 mb-2">{guideline.title}</h3>
                  <p className="text-center text-gray-600 text-sm">{guideline.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <Card className="border-amber-100 shadow-md">
          <CardHeader className="bg-gradient-to-r from-maroon-800 to-amber-800 text-white">
            <CardTitle className="text-xl font-serif">1. Introduction to Violin</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">🎵</span>
                <span>It makes music when you pull a bow across the strings.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🪵</span>
                <span>It is made of special wood like spruce and maple.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🎻</span>
                <span>You play it sitting cross-legged in Indian music.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-amber-100 shadow-md">
          <CardHeader className="bg-gradient-to-r from-maroon-800 to-amber-800 text-white">
            <CardTitle className="text-xl font-serif">2. Know Your Instrument</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex justify-center mb-4">
              <img 
                src="/lovable-uploads/0619c26f-3b88-4555-96d5-9006a2bc8dd7.png" 
                alt="Violin and bow diagram" 
                className="rounded-lg max-h-72 object-contain"
              />
            </div>
            <p className="text-gray-700 mb-3 font-medium">
              Look at your violin closely! It has:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">🎚️</span>
                <span>Pegs (to tighten the strings)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🎯</span>
                <span>Fingerboard (where you press)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🎼</span>
                <span>Strings (to make notes)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🐴</span>
                <span>Bow (made of horsehair – very soft!)</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <Card className="border-amber-100 shadow-md">
          <CardHeader className="bg-gradient-to-r from-maroon-800 to-amber-800 text-white">
            <CardTitle className="text-xl font-serif">3. How to Hold the Violin</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Sit on a mat cross-legged.</li>
              <li>Scroll rests on your right foot.</li>
              <li>Back must be straight.</li>
              <li>Balance violin between collarbone and shoulder.</li>
            </ul>
            <div className="flex justify-center mt-4">
              <img 
                src="/lovable-uploads/64ab8fd2-ed27-4e9b-b0db-65a08587711f.png" 
                alt="How to hold the violin" 
                className="rounded-lg max-h-72 object-contain"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-amber-100 shadow-md">
          <CardHeader className="bg-gradient-to-r from-maroon-800 to-amber-800 text-white">
            <CardTitle className="text-xl font-serif">4. How to Hold the Bow</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Fingers curved (like holding a flower).</li>
              <li>Bow must be tight before playing.</li>
              <li>Grip neither too loose nor too tight.</li>
            </ul>
            <div className="flex justify-center mt-4">
              <img 
                src="/lovable-uploads/d360aa7e-fe19-4f1d-9835-3b7e14e7b9ff.png" 
                alt="How to hold the bow" 
                className="rounded-lg max-h-72 object-contain"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-amber-100 shadow-md">
          <CardHeader className="bg-gradient-to-r from-maroon-800 to-amber-800 text-white">
            <CardTitle className="text-xl font-serif">5. How to Tune the Violin</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-700 mb-4">
              Use Pegs (large pitch changes) and Fine Tuners (small changes).
            </p>
            <p className="text-amber-700 font-medium mb-3">
              ⚠️ Beginners should use fine tuners or get help.
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
          <CardHeader className="bg-gradient-to-r from-maroon-800 to-amber-800 text-white">
            <CardTitle className="text-xl font-serif">6. Violin Tuning Apps</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>
                <strong>Soundcorset</strong> – Android/iOS{" "}
                <a 
                  href="https://play.google.com/store/apps/details?id=com.soundcorset.client.android" 
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
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LearningGuideContent;
