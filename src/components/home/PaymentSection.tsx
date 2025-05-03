
import { QrCode, Smartphone, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaymentSection = () => {
  const { toast } = useToast();
  
  const handleCopyAccount = () => {
    navigator.clipboard.writeText("026410101120");
    toast({
      title: "Copied!",
      description: "Account number copied to clipboard",
      duration: 3000,
    });
  };
  
  const handleCopyIFSC = () => {
    navigator.clipboard.writeText("IPOS0000001");
    toast({
      title: "Copied!",
      description: "IFSC code copied to clipboard",
      duration: 3000,
    });
  };
  
  const handleCopyPhone = () => {
    navigator.clipboard.writeText("9496315903");
    toast({
      title: "Copied!",
      description: "Phone number copied to clipboard",
      duration: 3000,
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-10 text-center">
          Payment Information
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-stretch gap-8">
            <div className="md:w-1/2 flex flex-col">
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-md p-8 flex flex-col items-center justify-center h-full">
                <div className="mb-6">
                  <QrCode className="w-12 h-12 text-maroon-800" />
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
                  <img 
                    src="/lovable-uploads/d794e0b0-1ad6-4554-9bc1-ee438054131d.png" 
                    alt="Payment QR Code" 
                    className="mx-auto w-48 h-48 object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-center text-maroon-800 mb-2">Scan to Pay</h3>
                <p className="text-center text-gray-600">UPI ID: vijithcapt-1@okicici</p>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText("vijithcapt-1@okicici");
                    toast({
                      title: "Copied!",
                      description: "UPI ID copied to clipboard",
                      duration: 3000,
                    });
                  }}
                  className="mt-3 text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <span>Copy UPI ID</span>
                </button>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-md p-8 h-full">
                <div className="mb-6 flex items-center">
                  <CreditCard className="w-8 h-8 text-maroon-800 mr-3" />
                  <h3 className="text-xl font-bold text-maroon-800">Bank Details</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white p-5 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Name</span>
                      <span className="font-medium">Vijith V T</span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-5 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Account Number</span>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">026410101120</span>
                        <button 
                          onClick={handleCopyAccount}
                          className="text-blue-600 hover:text-blue-800"
                          aria-label="Copy account number"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16V4a2 2 0 0 1 2-2h10"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-5 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">IFSC</span>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">IPOS0000001</span>
                        <button 
                          onClick={handleCopyIFSC}
                          className="text-blue-600 hover:text-blue-800"
                          aria-label="Copy IFSC code"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16V4a2 2 0 0 1 2-2h10"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-5 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Smartphone className="w-4 h-4 mr-1 text-green-600" />
                        <span className="text-gray-500">Google Pay</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">9496315903</span>
                        <button 
                          onClick={handleCopyPhone}
                          className="text-blue-600 hover:text-blue-800"
                          aria-label="Copy phone number"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16V4a2 2 0 0 1 2-2h10"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-amber-200 text-center">
                  <p className="text-sm text-gray-600">
                    Please send payment screenshot via WhatsApp after making the payment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
