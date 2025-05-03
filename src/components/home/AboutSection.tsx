
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
                <h3 className="text-xl font-serif font-bold text-maroon-800 mb-2">Early Training</h3>
                <p className="text-gray-700">
                  I began learning Carnatic violin under my first Guru, Shri Divakaran, and later trained at the Tharangani School of Music, founded by Padma Bhushan Dr. K. J. Yesudas. Under the guidance of Shri Rajagopal Rajappa, I was encouraged to start teaching, marking the beginning of my teaching journey. Further refinement of my style came through advanced lessons with Vid. S. R. Mahadeva Sarma, blending the rich nuances of the Parur M. S. Gopalakrishnan (MSG) style and Lalgudi Bani tradition.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-maroon-800 mb-3">As a Performer & Teacher</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Over 50 stage performances showcasing Carnatic classical concerts and fusion violin programs</li>
                    <li>Certificate in Carnatic Classical Violin (4-year course) from Tharangani School of Music</li>
                    <li>Teaching students from India, USA, Thailand, and Bangalore since 2018</li>
                    <li>Teaching at institutions like MusicIntuit Academy, Laya Tarang Academy, and Bharathakala Dance & Music Cultural Society</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-serif font-bold text-maroon-800 mb-3">Awards & Recognition</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Best Classical Violin Teacher Award from MusicIntuit Academy, Bangalore</li>
                    <li>Students have won first prizes in District and School Kalolsavams</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-serif font-bold text-maroon-800 mb-3">My Teaching Approach</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Conduct monthly student assessments in collaboration with various music schools</li>
                  <li>Developed a structured syllabus with progressive levels, based on university-level syllabi</li>
                  <li>Created a student dashboard to track progress, attendance, and upload weekly practice sessions</li>
                  <li>Learning Blog covering basics like violin tuning, shruti, tala practice, and more</li>
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
