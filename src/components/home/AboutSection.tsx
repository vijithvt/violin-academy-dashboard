
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
              Vijith V T is a passionate Carnatic violinist from Trivandrum with over 10 years of teaching and performance experience. 
              Trained under Shri Rajagopal Rajappa (Tharangani School of Music) and Vid. S. R. Mahadeva Sarma (A-Top Artist, AIR).
              Holds a Diploma in Violin, MCA, and M.Sc. in Artificial Intelligence.
              Has taught students across India, the USA, and Thailand.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-start">
                <Award className="h-5 w-5 text-amber-500 mr-2 mt-1" />
                <span className="text-gray-700">Best Classical Violin Teacher – Music Intuit Academy, Bangalore</span>
              </div>
              <div className="flex items-start">
                <Globe className="h-5 w-5 text-amber-500 mr-2 mt-1" />
                <span className="text-gray-700">Teaching students from India, USA, Thailand</span>
              </div>
              <div className="flex items-start">
                <Music className="h-5 w-5 text-amber-500 mr-2 mt-1" />
                <span className="text-gray-700">Classes at Jovens Academy, Laya Tarang, Bharathakala Society</span>
              </div>
              <div className="flex items-start">
                <Book className="h-5 w-5 text-amber-500 mr-2 mt-1" />
                <span className="text-gray-700">Qualifications: Diploma in Violin, MCA, M.Sc. in AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
