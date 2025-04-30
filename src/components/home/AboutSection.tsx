
import { Award, Globe, Music } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-1/3">
            <div className="rounded-full overflow-hidden border-4 border-amber-100 shadow-lg w-64 h-64 mx-auto">
              <img src="/lovable-uploads/392d5b68-5127-4b00-a0ab-8cee901d24b0.png" alt="Vijith VT" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-6">
              About Vijith V T
            </h2>
            <p className="text-gray-700 mb-4">
              I began learning Carnatic violin under Shri Divakaran, followed by training at Tharangani School of Music under Shri Rajagopal Rajappa. Later, I studied advanced lessons with Vid. S. R. Mahadeva Sarma, whose playing incorporates styles from both the Parur M. S. Gopalakrishnan and Lalgudi Bani traditions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h3 className="text-xl font-serif font-bold text-maroon-800 mb-3">Performer & Teacher</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Certificate in Carnatic Classical Violin</li>
                  <li>Teaching since 2018 across multiple countries</li>
                  <li>50+ stage performances</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-serif font-bold text-maroon-800 mb-3">Awards & Recognition</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Best Classical Violin Teacher Award</li>
                  <li>Students with first prizes in competitions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
