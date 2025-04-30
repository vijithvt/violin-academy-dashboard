
import { MessageCircle, Phone, Mail, Award, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

const ContactSection = () => {
  const [isJoiningOpen, setIsJoiningOpen] = useState(true);

  const joiningSteps = [
    {
      title: "Fill the admission form",
      description: "Complete our online admission form with your details"
    },
    {
      title: "Pay admission fee",
      description: "One-time fee of ₹500 which includes welcome kit"
    },
    {
      title: "Schedule your first class",
      description: "Choose your preferred time slot and mode of learning"
    },
    {
      title: "Begin your musical journey",
      description: "Start learning with our structured curriculum"
    }
  ];

  return (
    <section id="join" className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-10 text-center">
          Join Now
        </h2>
        
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-8 h-full">
              <h3 className="text-xl font-bold text-maroon-800 mb-6">Get Started Today</h3>
              
              {/* Joining Process */}
              <Collapsible 
                open={isJoiningOpen}
                onOpenChange={setIsJoiningOpen}
                className="mb-6"
              >
                <CollapsibleTrigger className="flex items-center w-full text-left font-medium text-maroon-800 mb-4">
                  <span>How to Join</span>
                  <ChevronRight className={`ml-auto h-5 w-5 transition-transform ${isJoiningOpen ? 'rotate-90' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="pl-4 border-l-2 border-amber-200 mb-6">
                    {joiningSteps.map((step, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex items-start">
                          <div className="bg-amber-100 text-maroon-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-2">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium text-maroon-800">{step.title}</h4>
                            <p className="text-sm text-gray-600">{step.description}</p>
                          </div>
                        </div>
                        {index < joiningSteps.length - 1 && (
                          <div className="border-l-2 border-dashed border-amber-200 h-4 ml-3"></div>
                        )}
                      </div>
                    ))}
                    <div className="mt-4 flex items-start">
                      <div className="text-amber-600 mr-2">
                        <Award className="h-5 w-5" />
                      </div>
                      <p className="text-sm text-gray-700">
                        Welcome kit includes course materials, practice sheets, and a personalized learning plan.
                      </p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              <div className="space-y-4">
                <a 
                  href="https://forms.gle/FCuVKb2bqED64QV3A" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-maroon-800 hover:bg-maroon-900 text-white">
                    Fill Admission Form
                  </Button>
                </a>
                
                <a 
                  href="http://wa.me/918301815324" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" /> Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-bold text-maroon-800 mb-6">Contact Information</h3>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <MessageCircle className="h-6 w-6 text-maroon-600 mr-3" />
                  <div>
                    <p className="font-medium text-maroon-800">WhatsApp</p>
                    <p className="text-gray-700">8301815324</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className="h-6 w-6 text-maroon-600 mr-3" />
                  <div>
                    <p className="font-medium text-maroon-800">Phone</p>
                    <p className="text-gray-700">9496315903</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mail className="h-6 w-6 text-maroon-600 mr-3" />
                  <div>
                    <p className="font-medium text-maroon-800">Email</p>
                    <p className="text-gray-700">vijithviolinist@gmail.com</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
