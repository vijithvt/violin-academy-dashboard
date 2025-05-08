
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SparklesIcon } from "lucide-react";
import FreeTrialForm from "./FreeTrialForm";

const FloatingTrialButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <>
      <div 
        className={`fixed bottom-20 right-8 z-40 transition-all duration-500 transform ${
          isVisible 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-10 opacity-0 scale-90'
        }`}
      >
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="rounded-full bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-6 shadow-lg hover:shadow-amber-500/30 transition-all duration-300 flex items-center gap-2 group"
          size="lg"
        >
          <SparklesIcon className="h-5 w-5 transition-all duration-300 group-hover:rotate-12" />
          <span>Book a Free Trial</span>
        </Button>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <FreeTrialForm onClose={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingTrialButton;
