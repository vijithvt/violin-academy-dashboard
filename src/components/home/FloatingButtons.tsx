
import { Phone, MessageCircle } from "lucide-react";

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-3">
      {/* Call Button with Direct Link */}
      <a 
        href="tel:+919496315903"
        className="w-12 h-12 flex items-center justify-center rounded-full bg-maroon-700 text-white shadow-lg hover:bg-maroon-800 transition-colors"
        aria-label="Call"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* WhatsApp Button with Direct Link */}
      <a 
        href="https://wa.me/918301815324"
        target="_blank" 
        rel="noopener noreferrer"
        className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-colors"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
    </div>
  );
};

export default FloatingButtons;
