
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
              I began learning Carnatic violin under my first Guru, Shri Divakaran. Then, I joined Tharangani School of Music — founded by Padma Bhushan Dr. K. J. Yesudas—where I trained under Shri Rajagopal Rajappa. His guidance had a lasting impact on my growth. Though I've had the privilege to learn from several Gurus, it was Rajagopal Sir who truly pushed me forward and encouraged me to begin teaching violin, starting at Tharangani itself. I later continued to learn advanced lessons from Vid. S. R. Mahadeva Sarma, whose playing incorporates the rich nuances of both the Parur M. S. Gopalakrishnan (MSG) style and the Lalgudi Bani tradition. His training further refined my playing style and deepened my understanding of the Carnatic tradition.
            </p>
            
            <h3 className="text-xl font-serif font-bold text-maroon-800 mt-6 mb-3">As a Performer & Teacher:</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
              <li>Participated in around 50 stage performances, presenting Carnatic classical concerts and fusion violin programs.</li>
              <li>Hold a Certificate in Carnatic Classical Violin (4-year course) from Tharangani School of Music (founded by Padma Bhushan Dr. K. J. Yesudas).</li>
              <li>Since 2018, I have been teaching students from India, USA, Thailand, and Bangalore, catering to learners of all age groups.</li>
              <li>Currently teaching at Jovens Academy (USA), MusicIntuit Academy (Bangalore), Laya Tarang Academy (Trivandrum), Bharathakala Society (Peyad), and more.</li>
            </ul>
            
            <h3 className="text-xl font-serif font-bold text-maroon-800 mb-3">Awards & Recognition:</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Honored with the Best Classical Violin Teacher Award from MusicIntuit Academy, Bangalore.</li>
              <li>Students have secured first prizes in District and School Kalolsavams.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
