
import { Phone, MessageCircle } from "lucide-react";
import { useState } from "react";

const FloatingButtons = () => {
  const [showCallInfo, setShowCallInfo] = useState(false);
  const [showWhatsAppInfo, setShowWhatsAppInfo] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
      {/* Call Button and Popup */}
      <div className="relative">
        {showCallInfo && (
          <div className="absolute bottom-full right-0 mb-2 bg-white p-3 rounded-lg shadow-lg min-w-[200px] animate-fade-in">
            <h4 className="font-medium mb-1">Call Us</h4>
            <a href="tel:+919496315903" className="text-blue-600 hover:underline">+91 9496315903</a>
            <div className="absolute bottom-0 right-5 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white"></div>
          </div>
        )}
        <button
          onClick={() => {
            setShowCallInfo(!showCallInfo);
            setShowWhatsAppInfo(false);
          }}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Call"
        >
          <Phone className="w-5 h-5" />
        </button>
      </div>

      {/* WhatsApp Button and Popup */}
      <div className="relative">
        {showWhatsAppInfo && (
          <div className="absolute bottom-full right-0 mb-2 bg-white p-3 rounded-lg shadow-lg min-w-[200px] animate-fade-in">
            <h4 className="font-medium mb-1">Chat with us</h4>
            <a href="http://wa.me/918301815324" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
              +91 8301815324
            </a>
            <div className="absolute bottom-0 right-5 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white"></div>
          </div>
        )}
        <button
          onClick={() => {
            setShowWhatsAppInfo(!showWhatsAppInfo);
            setShowCallInfo(false);
          }}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-colors"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default FloatingButtons;
