
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
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-serif font-bold text-maroon-800 mb-2">
                  Early Training
                </h3>
                <p className="text-gray-700">
                  My journey with the Carnatic violin began under the guidance of Shri Divakaran. I later continued my learning at the Tharangani School of Music, founded by Padma Bhushan Dr. K. J. Yesudas, under Shri Rajagopal Rajappa, who encouraged me to begin teaching—marking the start of my lifelong passion for sharing music. My playing style was further refined through advanced training with Vid. S. R. Mahadeva Sarma (A-Top Grade Artist, AIR), blending the depth of the Parur M. S. Gopalakrishnan (MSG) style with the elegance of the Lalgudi Bani tradition.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-maroon-800 mb-3">
                    Performer & Teacher
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Certified in Carnatic Classical Violin (4-year course) – Tharangani School of Music</li>
                    <li>Teaching students from India, USA, Thailand, and Bangalore since 2018</li>
                    <li>Faculty and collaborator at:</li>
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
                    Awards & Recognition
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Honoured with the Best Classical Violin Teacher Award by Music Intuit Academy, Bangalore</li>
                    <li>Students have achieved top positions in District and School Kalolsavams</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-serif font-bold text-maroon-800 mb-3">
                  Teaching Approach
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Conduct monthly assessments in collaboration with partner music schools</li>
                  <li>Designed a structured curriculum aligned with university-level syllabi</li>
                  <li>Developed a student dashboard to track attendance, progress, and weekly practice uploads</li>
                  <li>Maintain an educational learning blog covering essential topics like violin tuning, shruti alignment, tala practice, and more</li>
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
