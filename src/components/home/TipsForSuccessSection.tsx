
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

const TipsForSuccessSection = () => {
  const tips = [
    "Practice at least 30 minutes daily for consistent progress",
    "Record your practice sessions to track improvements",
    "Focus on bow control first before complex fingering",
    "Use a metronome to develop perfect rhythm and timing",
    "Learn theory alongside practical playing for better understanding",
    "Listen to accomplished violinists regularly for inspiration",
    "Maintain proper posture to prevent strain and improve sound",
    "Clean your violin and change strings regularly for optimal sound",
    "Break difficult passages into smaller, manageable segments",
    "Join group sessions to develop ensemble playing skills"
  ];
  
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-amber-50 to-amber-100/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-maroon-900 mb-2">Tips For Success</h2>
          <div className="h-1 w-20 bg-amber-500 mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="border-amber-200 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 min-h-[100px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTipIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-start w-full"
                >
                  <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-0.5 flex-shrink-0" />
                  <p className="text-lg text-gray-800">{tips[currentTipIndex]}</p>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
          
          <div className="flex justify-center mt-3 gap-1.5">
            {tips.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTipIndex(index)}
                className={`w-2.5 h-2.5 rounded-full ${
                  index === currentTipIndex ? "bg-amber-500" : "bg-amber-300/50"
                } transition-colors`}
                aria-label={`Go to tip ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TipsForSuccessSection;
