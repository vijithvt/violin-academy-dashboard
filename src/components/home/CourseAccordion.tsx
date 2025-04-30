
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const CourseLevel = ({ 
  level, 
  title, 
  description, 
  duration, 
  concepts, 
  songs,
  exercises 
}: {
  level: string;
  title: string;
  description: string;
  duration: string;
  concepts: string[];
  songs: string[];
  exercises: string[];
}) => (
  <AccordionItem value={`level-${level}`}>
    <AccordionTrigger className="text-left py-4 px-4 hover:bg-amber-50">
      <div className="flex items-center">
        <span className="text-amber-800 font-semibold mr-2">{level}</span>
        <span className="font-medium">{title}</span>
      </div>
    </AccordionTrigger>
    <AccordionContent className="px-4 pb-6 pt-2">
      <div className="space-y-4">
        <div>
          <p className="font-medium text-amber-800">Description:</p>
          <p className="text-gray-700">{description}</p>
        </div>
        
        <div>
          <p className="font-medium text-amber-800">Duration:</p>
          <p className="text-gray-700">{duration}</p>
        </div>
        
        <div>
          <p className="font-medium text-amber-800">Key Concepts:</p>
          <ul className="list-disc pl-5 text-gray-700">
            {concepts.map((concept, i) => <li key={i}>{concept}</li>)}
          </ul>
        </div>
        
        <div>
          <p className="font-medium text-amber-800">Songs:</p>
          <p className="text-gray-700">{songs.join(", ")}</p>
        </div>
        
        <div>
          <p className="font-medium text-amber-800">Exercises:</p>
          <p className="text-gray-700">{exercises.join(", ")}</p>
        </div>
      </div>
    </AccordionContent>
  </AccordionItem>
);

const CourseAccordion = () => {
  const courseLevels = [
    {
      level: "LEVEL 1",
      title: "AARAMBHA (Beginner)",
      description: "Varisais (Sarali Varisai - Alankaram)",
      duration: "9–12 months",
      concepts: [
        "Tuning", "Violin posture", "Bow hold", "Left-hand hold", "Metronome playing", 
        "Basic bow strokes", "Basic string crossing", "3rd position playing", 
        "Tala and Raga Theory", "Janta gamaka"
      ],
      songs: [
        "Twinkle Twinkle Little Star", "Rama Janardhana", "Santhatam Pahimam", 
        "Sakti Sahita Ganapatim", "Shyamale Meenakshi"
      ],
      exercises: [
        "Sarali Varisai", "Janta Varisai", "Thattuvarisa", "Mel Stayi Varisai", "Alankaram"
      ]
    },
    {
      level: "LEVEL 2",
      title: "MADHYAMA (Intermediate)",
      description: "Geethams, Bhajans",
      duration: "12–15 months",
      concepts: [
        "Basic Gamakas", "Raga theory", "2nd position playing", "Important bow strokes", 
        "String crossing dexterity", "String changing and bridge setting workshop"
      ],
      songs: [
        "Geethams", "Jathy Swaras", "Swarajathis", "Simple film songs"
      ],
      exercises: [
        "2nd position playing", "Important bow strokes", "String crossing", "Vibrato"
      ]
    },
    {
      level: "LEVEL 3",
      title: "UTTHAMA (Advanced)",
      description: "Varnams, Krithis",
      duration: "2.5–3 years",
      concepts: [
        "Advanced Gamakas", "Raga delineation", "Alapana/Kalpanaswaram basics", 
        "Advanced Tala methods", "4th, 5th position playing", "Advanced bow strokes", 
        "Advanced String crossing", "Advanced vibrato", "Home recording and electric violin processing workshop"
      ],
      songs: [
        "Varnams", "Ata Thala Varnams", "Krithis (Maha Ganapathim, Deva Deva Kalayamithe, etc)", "Film songs"
      ],
      exercises: [
        "3rd and 4th position playing", "Advanced bow strokes", "Advanced string crossing", 
        "Advanced vibrato exercises", "Speed training", "Ear training"
      ]
    },
    {
      level: "LEVEL 4",
      title: "VIDHWATH (Professional)",
      description: "Krithis, Kalpana Swaram, Alapana, Performance (Carnatic/Fusion/Film)",
      duration: "Ongoing",
      concepts: [
        "Alapana", "Kalpana Swaras", "Improvisation", "Fusion/Film music playing", 
        "Guidance on performance and expression"
      ],
      songs: [
        "Krithis", "Thillanas", "Pancharatna Krithis"
      ],
      exercises: [
        "Alapana play-alongs and prompts in various ragas", 
        "Kalpana Swara patterns for various raga-tala combinations", 
        "Toolkits for improvisation"
      ]
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <Accordion type="single" collapsible className="w-full">
        {courseLevels.map((level, index) => (
          <CourseLevel key={index} {...level} />
        ))}
      </Accordion>
    </div>
  );
};

export default CourseAccordion;
