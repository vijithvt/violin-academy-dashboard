
import { Award, Globe, Music } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-gradient-to-b from-amber-50 to-white">
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
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-serif font-bold text-maroon-800 mb-2">
                  Early Training
                </h3>
                <p className="text-gray-700">
                  Vijith began his Carnatic violin journey under Shri Divakaran and later trained at the Tharangani School of Music (founded by Padma Bhushan Dr. K. J. Yesudas) under Shri Rajagopal Rajappa, who inspired his passion for teaching. Advanced training with Vid. S. R. Mahadeva Sarma (A-Top Grade Artist, AIR) helped shape a unique style blending the Parur M.S. Gopalakrishnan and Lalgudi Bani traditions.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-maroon-800 mb-3">
                    Performer & Educator
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Certified in Carnatic Classical Violin (4-year course – Tharangani School of Music)</li>
                    <li>Teaching since 2018: Students from India, USA, Thailand & Bangalore</li>
                    <li>Faculty/Collaborator at:</li>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 mt-2">
                      <li>Jovens Academy, USA</li>
                      <li>Laya Tarang Academy, Trivandrum</li>
                      <li>Bharathakala Dance & Music Cultural Society, Trivandrum</li>
                      <li>Music Intuit Academy, Bangalore</li>
                    </ul>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-serif font-bold text-maroon-800 mb-3">
                    Recognition
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Best Classical Violin Teacher Award – Music Intuit Academy, Bangalore</li>
                    <li>Students consistently win top ranks at District and School Kalolsavams</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-serif font-bold text-maroon-800 mb-3">
                  Teaching Approach
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Monthly student assessments in partnership with academies</li>
                  <li>Structured curriculum aligned with university-level standards</li>
                  <li>Custom student dashboard for tracking attendance, progress & practice</li>
                  <li>Educational blog covering violin tuning, shruti, tala, and core concepts</li>
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
