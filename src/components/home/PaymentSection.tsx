
const PaymentSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-10 text-center">
          Payment Information
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <div className="md:w-1/3">
            <div className="bg-amber-50 rounded-xl shadow-md p-8 text-center">
              <img 
                src="/lovable-uploads/d794e0b0-1ad6-4554-9bc1-ee438054131d.png" 
                alt="Payment QR Code" 
                className="mx-auto w-48 h-48 object-contain mb-4"
              />
              <p className="text-center font-medium text-maroon-800">Scan to Pay</p>
              <p className="text-center text-gray-500 text-sm mt-1">UPI ID: vijithcapt-1@okicici</p>
            </div>
          </div>
          
          <div className="md:w-1/3">
            <div className="bg-amber-50 rounded-xl shadow-md p-8">
              <h3 className="text-xl font-bold text-maroon-800 mb-4">Bank Details</h3>
              <ul className="space-y-3">
                <li className="flex">
                  <span className="font-medium w-32">Name:</span>
                  <span>Vijith V T</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">Account No:</span>
                  <span>026410101120</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">IFSC:</span>
                  <span>IPOS0000001</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">Google Pay:</span>
                  <span>9496315903</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-amber-100 text-sm text-gray-500">
                <p>Please send payment screenshot via WhatsApp after making the payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
