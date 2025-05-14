import { useState } from "react";
import { Youtube, Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const FooterSection = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <footer id="contact" className="bg-maroon-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {/* About */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Vijith Violinist</h3>
            <p className="text-maroon-200 mb-4">
              Carnatic Classical Violin Academy providing authentic South Indian violin instruction through personalized training programs.
            </p>
            <div className="flex space-x-4">
              <a href="https://youtube.com/@vijithviolinist" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-amber-300 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/violinwithvijith" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-amber-300 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com/vijithviolinist" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-amber-300 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-amber-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-maroon-100">Phone</p>
                  <p className="text-white">+91 9496315903</p>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-amber-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-maroon-100">Email</p>
                  <p className="text-white">vijithviolinist@gmail.com</p>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-maroon-100">WhatsApp</p>
                  <p className="text-white">+91 8301815324</p>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#home" className="text-maroon-200 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="/#courses" className="text-maroon-200 hover:text-white transition-colors">Courses</a>
              </li>
              <li>
                <a href="/#about" className="text-maroon-200 hover:text-white transition-colors">About</a>
              </li>
              <li>
                <a href="/login" className="text-maroon-200 hover:text-white transition-colors">Student Login</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-maroon-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-maroon-300">
            &copy; {new Date().getFullYear()} Vijith Violinist's Carnatic Classical Violin Academy. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <button 
              onClick={() => setShowTerms(true)} 
              className="text-maroon-300 hover:text-white transition-colors"
            >
              Terms & Conditions
            </button>
            <button 
              onClick={() => setShowPrivacy(true)}
              className="text-maroon-300 hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>

      {/* Terms & Conditions Dialog */}
      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif text-maroon-900">Terms & Conditions</DialogTitle>
            <DialogDescription>Last updated: May 11, 2025</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-gray-700 text-sm md:text-base">
            <p>
              <strong>1. Acceptance of Terms</strong>
            </p>
            <p>
              By accessing and using Vijith Violinist's Carnatic Classical Violin Academy's website and services, you agree to be bound by these Terms & Conditions.
            </p>
            <p>
              <strong>2. Use of Services</strong>
            </p>
            <p>
              Our services are intended for personal, non-commercial use. You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the service without express written permission from us.
            </p>
            <p>
              <strong>3. Intellectual Property</strong>
            </p>
            <p>
              All content, trademarks, and data on this website, including but not limited to software, databases, text, graphics, icons, hyperlinks, private information, and designs, are the property of Vijith Violinist's Academy.
            </p>
            <p>
              <strong>4. Limitation of Liability</strong>
            </p>
            <p>
              Vijith Violinist's Academy will not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or the inability to use our services.
            </p>
            <p>
              <strong>5. Governing Law</strong>
            </p>
            <p>
              These Terms & Conditions shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
            </p>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Privacy Policy Dialog */}
      <Dialog open={showPrivacy} onOpenChange={setShowPrivacy}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif text-maroon-900">Privacy Policy</DialogTitle>
            <DialogDescription>Last updated: May 11, 2025</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-gray-700 text-sm md:text-base">
            <p>
              <strong>1. Information Collection</strong>
            </p>
            <p>
              We collect personal information such as name, email address, and contact details when you register for our services or contact us.
            </p>
            <p>
              <strong>2. Use of Information</strong>
            </p>
            <p>
              The information we collect is used to provide and improve our services, personalize your experience, and communicate with you about updates and offers.
            </p>
            <p>
              <strong>3. Data Security</strong>
            </p>
            <p>
              We implement reasonable security measures to protect your personal information from unauthorized access, use, or disclosure.
            </p>
            <p>
              <strong>4. Data Sharing</strong>
            </p>
            <p>
              We do not share your personal information with third parties except as necessary to provide our services or as required by law.
            </p>
            <p>
              <strong>5. Your Rights</strong>
            </p>
            <p>
              You have the right to access, correct, or delete your personal information. Please contact us if you wish to exercise these rights.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default FooterSection;
