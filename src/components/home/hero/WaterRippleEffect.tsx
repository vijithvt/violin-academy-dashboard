
import { useEffect, useRef } from "react";

interface WaterRippleEffectProps {
  children: React.ReactNode;
}

const WaterRippleEffect: React.FC<WaterRippleEffectProps> = ({ children }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;
    
    const createRipple = (event: MouseEvent) => {
      const ripple = document.createElement('div');
      const rect = heroElement.getBoundingClientRect();
      
      const size = Math.max(heroElement.offsetWidth, heroElement.offsetHeight);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.className = 'absolute rounded-full pointer-events-none bg-white/10 animate-[ripple_1s_ease-out_forwards]';
      
      heroElement.appendChild(ripple);
      
      setTimeout(() => {
        heroElement.removeChild(ripple);
      }, 1000);
    };
    
    heroElement.addEventListener('click', createRipple);
    
    return () => {
      heroElement.removeEventListener('click', createRipple);
    };
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-[85vh] pt-16 md:pt-0 overflow-hidden">
      {children}
      
      {/* Add keyframe animations for ripple */}
      <style>
        {`
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        @keyframes expandWidth {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
        `}
      </style>
    </div>
  );
};

export default WaterRippleEffect;
