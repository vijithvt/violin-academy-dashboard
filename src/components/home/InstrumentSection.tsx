
import { useState } from "react";

interface TuningAppInfo {
  name: string;
  platform: string;
  link: string;
  image: string;
}

interface TuningSettingInfo {
  string: string;
  freq: string;
}

const InstrumentSection = () => {
  const [showViolinModal, setShowViolinModal] = useState(false);

  const tuningInfo = {
    settings: [
      { string: "E", freq: "A4 (440 Hz)" },
      { string: "A", freq: "D4 (293 Hz)" },
      { string: "D", freq: "A3 (220 Hz)" },
      { string: "G", freq: "D3 (146 Hz)" }
    ] as TuningSettingInfo[],
    apps: [
      {
        name: "Soundcorset",
        platform: "Android/iOS",
        link: "https://play.google.com/store/apps/details?id=com.soundcorset.client.android&hl=en_IN&gl=US",
        image: "/lovable-uploads/f9ac38e5-1bd9-4dbe-ac19-73b8866cc805.png"
      },
      {
        name: "DA Tuner",
        platform: "Android",
        link: "https://play.google.com/store/search?q=da%20tuner&c=apps&hl=en_IN&gl=US",
        image: "/lovable-uploads/f762e275-6a46-45d4-98e1-75635c3d1091.png"
      }
    ] as TuningAppInfo[]
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-10 text-center">
          Know Your Instrument
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold text-maroon-800 mb-4">About the Violin</h3>
            <p className="text-gray-700 mb-6">
              The violin is a bowed string instrument from Italy, with four strings (G, D, A, E). 
              It's traditionally made of maple and spruce. Indian violinists typically play seated on the floor.
            </p>
            
            <div className="bg-amber-50 rounded-xl overflow-hidden mb-8">
              <img 
                src="/lovable-uploads/48f9d0f7-776f-493e-995f-6855aa1e6a6e.png" 
                alt="Violin Diagram" 
                className="w-full h-auto max-h-[300px] object-contain"
                onClick={() => setShowViolinModal(true)}
              />
              <div className="p-3 text-center text-sm text-gray-500">
                Click image to enlarge
              </div>
            </div>

            <h3 className="text-xl font-semibold text-maroon-800 mb-4">How to Tune the Violin</h3>
            <p className="text-gray-700 mb-4">
              Use pegs for major adjustments, fine tuners for minor tuning. Beginners should use tuning apps or seek help.
            </p>
            
            <div className="bg-maroon-50 rounded-lg p-5 mb-6">
              <h4 className="text-lg font-medium text-maroon-800 mb-3">Tuning Settings:</h4>
              <ul className="space-y-2">
                {tuningInfo.settings.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="font-medium w-10">{item.string} →</span>
                    <span className="text-gray-700">{item.freq}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-maroon-800 mb-4">How to Hold the Violin</h3>
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="md:w-1/2">
                <p className="text-gray-700 mb-4">
                  Sit cross-legged on a mat, rest scroll on right foot, keep spine straight.
                  Upper part rests above left collarbone for bow and finger movement.
                </p>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="/lovable-uploads/f762e275-6a46-45d4-98e1-75635c3d1091.png" 
                  alt="How to Hold the Violin" 
                  className="rounded-lg shadow-md w-full h-auto"
                />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-maroon-800 mb-4">How to Hold the Bow</h3>
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="md:w-1/2">
                <p className="text-gray-700 mb-4">
                  Maintain a firm but relaxed grip; avoid tight or loose hold. 
                  Fingers should be slightly bent as if holding a flower.
                </p>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="/lovable-uploads/0fe0e6d5-2dae-427c-a526-bdfa0ebd1cf1.png" 
                  alt="How to Hold the Bow" 
                  className="rounded-lg shadow-md w-full h-auto"
                />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-maroon-800 mb-4">Recommended Tuning Apps</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tuningInfo.apps.map((app, index) => (
                <a 
                  href={app.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  key={index}
                  className="block bg-white rounded-xl border border-amber-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  <img src={app.image} alt={app.name} className="w-full h-auto" />
                  <div className="p-3 text-center">
                    <h4 className="font-medium text-maroon-800">{app.name}</h4>
                    <p className="text-sm text-gray-500">{app.platform}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Large Violin Image Modal */}
        {showViolinModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl overflow-hidden relative">
              <button 
                onClick={() => setShowViolinModal(false)}
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
              >
                ✕
              </button>
              <img 
                src="/lovable-uploads/48f9d0f7-776f-493e-995f-6855aa1e6a6e.png" 
                alt="Violin Diagram" 
                className="w-full h-auto"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InstrumentSection;
