
import { CheckCircle } from "lucide-react";

const RequirementsSection = () => {
  const requirements = [
    "Violin, bow, rosin",
    "Metronome / Tala Meter",
    "Tambura / Tambura App",
    "Mirror, Notebook, Recorder"
  ];

  return (
    <section className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-10 text-center">
          What You Need to Start
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-1/2">
            <ul className="space-y-4">
              {requirements.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequirementsSection;
