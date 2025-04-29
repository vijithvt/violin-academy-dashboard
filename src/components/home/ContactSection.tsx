
import { MessageCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
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
              <p className="text-gray-700 mb-6">
                Ready to begin your musical journey with Vijith Violinist? Fill out our admission form or contact us directly through WhatsApp for faster response.
              </p>
              
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
                  href="https://wa.me/8301815324" 
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
