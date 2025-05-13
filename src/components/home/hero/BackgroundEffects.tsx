
import React from "react";

const BackgroundEffects = () => {
  return (
    <>
      {/* Background gradient with radial glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50 to-white pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-300/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-maroon-300/10 rounded-full blur-[80px]" />
      </div>
      
      {/* Floating musical note particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="absolute text-amber-400/30 animate-float-up" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100 + 50}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            ♪
          </div>
        ))}
        {[...Array(6)].map((_, i) => (
          <div 
            key={i + 8} 
            className="absolute text-maroon-400/20 animate-float-up" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100 + 50}%`,
              fontSize: `${Math.random() * 20 + 15}px`,
              animationDuration: `${Math.random() * 10 + 15}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            ♫
          </div>
        ))}
      </div>
    </>
  );
};

export default BackgroundEffects;
