
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Check, Book, Music, Play, Award, GraduationCap, ListVideo, FileMusic, CheckCheck } from "lucide-react";

const CourseLevel = ({
  level,
  title,
  description,
  duration,
  conceptGroups,
  songs,
  exercises,
  progress = 0
}: {
  level: string;
  title: string;
  description: string;
  duration: string;
  conceptGroups: { title: string; items: string[] }[];
  songs: string[];
  exercises: string[];
  progress?: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionItem value={`level-${level}`} className="border rounded-lg mb-4 overflow-hidden bg-white">
      <AccordionTrigger className="text-left py-4 px-4 hover:bg-amber-50 [&[data-state=open]]:bg-amber-50">
        <div className="flex items-center w-full">
          <div className="bg-amber-100 text-amber-800 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mr-4 border-2 border-amber-200">
            {level}
          </div>
          <div className="flex-grow">
            <div className="flex items-center justify-between w-full">
              <div>
                <h3 className="text-lg font-medium">{title}</h3>
                <p className="text-sm text-gray-500">{description} • {duration}</p>
              </div>
              <div className="hidden md:block text-sm text-gray-500">
                {conceptGroups.reduce((total, group) => total + group.items.length, 0) + songs.length + exercises.length} lessons
              </div>
            </div>
            {progress > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            )}
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-6 pt-2">
        <div className="space-y-4 ml-16">
          {conceptGroups.map((group, groupIndex) => (
            <Collapsible key={groupIndex} className="border border-gray-200 rounded-md">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50">
                <div className="flex items-center">
                  {groupIndex === 0 ? (
                    <Book className="h-5 w-5 text-amber-600 mr-2" />
                  ) : groupIndex === 1 ? (
                    <Music className="h-5 w-5 text-amber-600 mr-2" />
                  ) : (
                    <GraduationCap className="h-5 w-5 text-amber-600 mr-2" />
                  )}
                  <span className="font-medium">{group.title} ({group.items.length})</span>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-3 pt-0 bg-amber-50/30">
                <ul className="space-y-2">
                  {group.items.map((concept, i) => (
                    <li key={i} className="flex items-start py-2">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">{concept}</span>
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          ))}

          <Collapsible className="border border-gray-200 rounded-md">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50">
              <div className="flex items-center">
                <ListVideo className="h-5 w-5 text-amber-600 mr-2" />
                <span className="font-medium">Songs ({songs.length})</span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-3 pt-0 bg-amber-50/30">
              <ul className="space-y-2">
                {songs.map((song, i) => (
                  <li key={i} className="flex items-start py-2">
                    <Play className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm">{song}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible className="border border-gray-200 rounded-md">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50">
              <div className="flex items-center">
                <FileMusic className="h-5 w-5 text-amber-600 mr-2" />
                <span className="font-medium">Exercises ({exercises.length})</span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-3 pt-0 bg-amber-50/30">
              <ul className="space-y-2">
                {exercises.map((exercise, i) => (
                  <li key={i} className="flex items-start py-2">
                    <CheckCheck className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm">{exercise}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
          
          {level === "1" && (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
              <div className="flex">
                <Award className="h-5 w-5 text-blue-700 mr-2 flex-shrink-0 mt-1" />
                <p className="text-sm text-blue-800">
                  Completion of this level earns you a Certificate of Basic Proficiency in Carnatic Violin
                </p>
              </div>
            </div>
          )}
          
          {level === "4" && (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
              <div className="flex">
                <Award className="h-5 w-5 text-amber-700 mr-2 flex-shrink-0 mt-1" />
                <p className="text-sm text-amber-800">
                  This advanced level prepares you for professional performances and compositions
                </p>
              </div>
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

const CourseAccordion = () => {
  const courseLevels = [
    {
      level: "1",
      title: "AARAMBHA (Beginner)",
      description: "Varisais (Sarali Varisai - Alankaram)",
      duration: "9–12 months",
      conceptGroups: [
        {
          title: "Fundamental Techniques",
          items: [
            "Tuning", "Violin posture", "Bow hold", "Left-hand hold", "Metronome playing", 
          ]
        },
        {
          title: "Basic Skills Development",
          items: [
            "Basic bow strokes", "Basic string crossing", "3rd position playing", "Janta gamaka"
          ]
        },
        {
          title: "Music Theory",
          items: [
            "Tala and Raga Theory", "Notation reading"
          ]
        }
      ],
      songs: [
        "Twinkle Twinkle Little Star", "Rama Janardhana", "Santhatam Pahimam", 
        "Sakti Sahita Ganapatim", "Shyamale Meenakshi"
      ],
      exercises: [
        "Sarali Varisai", "Janta Varisai", "Thattuvarisa", "Mel Stayi Varisai", "Alankaram"
      ],
      progress: 0,
    },
    {
      level: "2",
      title: "MADHYAMA (Intermediate)",
      description: "Geethams, Bhajans",
      duration: "12–15 months",
      conceptGroups: [
        {
          title: "Intermediate Techniques",
          items: [
            "Basic Gamakas", "2nd position playing", "Important bow strokes"
          ]
        },
        {
          title: "Advanced Skills",
          items: [
            "String crossing dexterity", "String changing and bridge setting"
          ]
        },
        {
          title: "Music Theory",
          items: [
            "Raga theory", "Tala variations"
          ]
        }
      ],
      songs: [
        "Geethams", "Jathy Swaras", "Swarajathis", "Simple film songs"
      ],
      exercises: [
        "2nd position playing", "Important bow strokes", "String crossing", "Vibrato"
      ],
    },
    {
      level: "3",
      title: "UTTHAMA (Advanced)",
      description: "Varnams, Krithis",
      duration: "2.5–3 years",
      conceptGroups: [
        {
          title: "Advanced Techniques",
          items: [
            "Advanced Gamakas", "Raga delineation", "Alapana/Kalpanaswaram basics"
          ]
        },
        {
          title: "Advanced Positions",
          items: [
            "4th, 5th position playing", "Advanced bow strokes", "Advanced String crossing", "Advanced vibrato"
          ]
        },
        {
          title: "Recording & Processing",
          items: [
            "Advanced Tala methods", "Home recording", "Electric violin processing"
          ]
        }
      ],
      songs: [
        "Varnams", "Ata Thala Varnams", "Krithis (Maha Ganapathim, Deva Deva Kalayamithe, etc)", "Film songs"
      ],
      exercises: [
        "3rd and 4th position playing", "Advanced bow strokes", "Advanced string crossing", 
        "Advanced vibrato exercises", "Speed training", "Ear training"
      ],
    },
    {
      level: "4",
      title: "VIDHWATH (Professional)",
      description: "Krithis, Kalpana Swaram, Alapana, Performance",
      duration: "Ongoing",
      conceptGroups: [
        {
          title: "Performance Skills",
          items: [
            "Alapana", "Kalpana Swaras", "Improvisation"
          ]
        },
        {
          title: "Style Development",
          items: [
            "Fusion/Film music playing", "Performance expression"
          ]
        },
        {
          title: "Professional Training",
          items: [
            "Concert preparation", "Teaching methods"
          ]
        }
      ],
      songs: [
        "Krithis", "Thillanas", "Pancharatna Krithis"
      ],
      exercises: [
        "Alapana play-alongs and prompts in various ragas", 
        "Kalpana Swara patterns for various raga-tala combinations", 
        "Toolkits for improvisation"
      ],
    }
  ];

  return (
    <div className="overflow-hidden">
      <Accordion type="single" collapsible className="w-full">
        {courseLevels.map((level, index) => (
          <CourseLevel key={index} {...level} />
        ))}
      </Accordion>
    </div>
  );
};

export default CourseAccordion;
