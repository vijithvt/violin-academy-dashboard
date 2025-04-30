
import { Award, Globe, Music, Book } from "lucide-react";

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
              I began learning Carnatic violin under my first Guru, Shri Divakaran, followed by training at Tharangani School of Music under Shri Rajagopal Rajappa. Later, I studied advanced lessons with Vid. S. R. Mahadeva Sarma, whose playing incorporates styles from both the Parur M. S. Gopalakrishnan and Lalgudi Bani traditions.
            </p>
            
            <h3 className="text-xl font-serif font-bold text-maroon-800 mt-6 mb-3">As a Performer & Teacher:</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
              <li>Participated in around 50 stage performances, presenting Carnatic classical concerts and fusion violin programs.</li>
              <li>Hold a Certificate in Carnatic Classical Violin from Tharangani School of Music.</li>
              <li>Teaching students from India, USA, Thailand, and Bangalore since 2018.</li>
              <li>Currently teaching at multiple academies including Jovens Academy (USA) and MusicIntuit Academy (Bangalore).</li>
            </ul>
            
            <h3 className="text-xl font-serif font-bold text-maroon-800 mb-3">Awards & Recognition:</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Best Classical Violin Teacher Award from MusicIntuit Academy, Bangalore.</li>
              <li>Students have secured first prizes in District and School Kalolsavams.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
