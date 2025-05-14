
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
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
          
          {/* Enroll Now Section (renamed from Free Trial) */}
          <div>
            <h3 className="text-lg font-medium mb-4">Join Our Academy</h3>
            <p className="text-maroon-200 mb-4">
              Experience the rich tradition of Carnatic violin with our personalized training. Join our academy today.
            </p>
            <Button 
              asChild
              className="bg-amber-500 hover:bg-amber-600 text-white transition-all duration-300 hover:shadow-amber-700/30 hover:shadow-lg"
            >
              <a href="https://forms.gle/FCuVKb2bqED64QV3A" target="_blank" rel="noopener noreferrer">Enroll Now</a>
            </Button>
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
            <section>
              <h3 className="font-medium text-lg text-maroon-800 mb-2">1. Acceptance of Terms</h3>
              <p>
                By accessing or using Vijith Violinist's Carnatic Classical Violin Academy services, website, or engaging in lessons, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
              </p>
            </section>
            
            <section>
              <h3 className="font-medium text-lg text-maroon-800 mb-2">2. Class Scheduling and Attendance</h3>
              <p>
                2.1. Classes are scheduled at mutually agreed times between the student and instructor.<br />
                2.2. Missed classes will not be rescheduled unless valid prior notice (minimum 6 hours) is provided.<br />
                2.3. Classes cancelled by the instructor will be rescheduled at a convenient time for the student.<br />
                2.4. Students are expected to join classes on time with their instruments properly tuned.
              </p>
            </section>
            
            <section>
              <h3 className="font-medium text-lg text-maroon-800 mb-2">3. Fees and Payments</h3>
              <p>
                3.1. Monthly fees are due on or before the 1st day of each month.<br />
                3.2. Fees are non-refundable except in serious cases such as prolonged illness or relocation.<br />
                3.3. Late payments may result in suspension of classes until payment is received.<br />
                3.4. A 5% discount is available for students who pay for three months in advance.
              </p>
            </section>
            
            <section>
              <h3 className="font-medium text-lg text-maroon-800 mb-2">4. Learning Materials</h3>
              <p>
                4.1. All learning materials including PDFs, audio recordings, and instructional videos are provided for personal use only.<br />
                4.2. Redistribution or sharing these materials with non-enrolled students is strictly prohibited.<br />
                4.3. The academy maintains copyright over all original teaching materials provided to students.
              </p>
            </section>
            
            <section>
              <h3 className="font-medium text-lg text-maroon-800 mb-2">5. Online Class Policy</h3>
              <p>
                5.1. For online classes, students must keep their video ON throughout the session.<br />
                5.2. A stable internet connection with minimum 2 Mbps speed is required.<br />
                5.3. Students are responsible for setting up their learning environment appropriately.
              </p>
            </section>
            
            <section>
              <h3 className="font-medium text-lg text-maroon-800 mb-2">6. Discontinuation</h3>
              <p>
                6.1. Students wishing to discontinue classes must provide at least one week's advance notice.<br />
                6.2. The academy reserves the right to terminate enrollment in cases of excessive absenteeism, misconduct, or consistent lack of practice.<br />
                6.3. Students who discontinue may rejoin within three months without paying a new registration fee.
              </p>
            </section>
            
            <section>
              <h3 className="font-medium text-lg text-maroon-800 mb-2">7. Changes to Terms</h3>
              <p>
                The academy reserves the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Continued use of our services after changes indicates acceptance of the modified terms.
              </p>
            </section>
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
            <section>
              <h3 className="font-medium text-lg text-maroon-800 mb-2">1. Information We Collect</h3>
              <p>
                We collect information that you provide directly to us, including:<br />
                • Personal information: name, email address, phone number, physical address<br />
                • Student information: age, musical background, learning goals<br />
                • Payment information: payment history and billing details<br />
                • Communications: messages sent to us via email, phone, or our contact forms<br />
                • Class recordings: video recordings of online classes (with your consent)
              </p>
            </section>
            
            <section>
              <h3 className="font-medium text-lg text-maroon-800 mb-2">2. How We Use Your Information</h3>
              <p>
                We use the information we collect to:<br />
                • Provide, maintain, and improve our services<br />
                • Process transactions and send related information<br />
                • Send confirmations, updates, and technical notices<br />
                • Respond to your comments, questions, and requests<br />
                • Monitor and analyze trends and usage<br />
                • Personalize your learning experience
              </p>
            </section>
            
            <section>
              <h3 className="font-medium text-lg text-maroon-800 mb-2">3. Information Sharing</h3>
              <p>
                We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
              </p>
            </section>
            
            <section>
              <h3 className="font-medium text-lg text-maroon-800 mb-2">4. Data Security</h3>
              <p>
                We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>
            
            <section>
              <h3 className="font-medium text-lg text-maroon-800 mb-2">5. Your Rights</h3>
              <p>
                You have the right to:<br />
                • Access your personal information<br />
                • Correct inaccurate information<br />
                • Delete your personal information<br />
                • Object to or restrict certain processing<br />
                • Data portability
              </p>
            </section>
            
            <section>
              <h3 className="font-medium text-lg text-maroon-800 mb-2">6. Children's Privacy</h3>
              <p>
                For students under 18, we require parent/guardian consent before collecting personal information. Parents/guardians have the right to review and request deletion of their child's information.
              </p>
            </section>
            
            <section>
              <h3 className="font-medium text-lg text-maroon-800 mb-2">7. Changes to This Privacy Policy</h3>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date.
              </p>
            </section>
            
            <section>
              <h3 className="font-medium text-lg text-maroon-800 mb-2">8. Contact Us</h3>
              <p>
                If you have any questions about this privacy policy, please contact us at:<br />
                Email: vijithviolinist@gmail.com<br />
                Phone: +91 9496315903
              </p>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default FooterSection;
