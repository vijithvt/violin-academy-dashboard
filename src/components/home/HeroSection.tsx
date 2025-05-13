
import React from "react";
import WaterRippleEffect from "./hero/WaterRippleEffect";
import BackgroundEffects from "./hero/BackgroundEffects";
import HeroText from "./hero/HeroText";
import StudentImageCarousel from "./hero/StudentImageCarousel";

const HeroSection = () => {
  return (
    <WaterRippleEffect>
      <BackgroundEffects />
      
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <HeroText />
          
          {/* Image Carousel */}
          <StudentImageCarousel />
        </div>
      </div>
    </WaterRippleEffect>
  );
};

export default HeroSection;
