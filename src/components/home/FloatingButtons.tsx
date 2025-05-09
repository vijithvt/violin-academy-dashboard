
import { Phone, MessageCircle } from "lucide-react";

const FloatingButtons = () => {
  // Phone number for direct calling
  const phoneNumber = "+919496315903";
  
  // WhatsApp number with country code for direct messaging
  const whatsappNumber = "918301815324";

  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-3">
      {/* Call Button - Direct Link */}
      <a 
        href={`tel:${phoneNumber}`}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-maroon-700 text-white shadow-lg hover:bg-maroon-800 transition-colors"
        aria-label="Call Us"
        title={`Call us: ${phoneNumber}`}
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* WhatsApp Button - Direct Link */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-colors"
        aria-label="Chat on WhatsApp"
        title={`WhatsApp: ${whatsappNumber}`}
      >
        <MessageCircle className="w-5 h-5" />
      </a>
    </div>
  );
};

export default FloatingButtons;
