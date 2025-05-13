
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ImageProtection } from "@/components/ui/image-protection";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // New student images from the latest upload
  const studentImages = [
    "/lovable-uploads/43b0be91-de0d-429d-b8e4-30aa2aa3d3b9.png",
    "/lovable-uploads/b5ee778e-38c9-4433-b6b9-895a2ac7cc12.png",
    "/lovable-uploads/8d02d87e-4d71-4e2e-9c9b-9c04f60bb9e5.png",
    "/lovable-uploads/70e4828b-0632-4f7e-997b-1ca7cb9de633.png",
    "/lovable-uploads/e583e518-a8b9-49e9-a0e5-bfb8b841f1d2.png",
    "/lovable-uploads/f02d4c17-6866-41de-944a-9ff258463736.png",
    "/lovable-uploads/9584e417-a142-479c-b43c-eabc571274d1.png",
    "/lovable-uploads/9381823b-5052-4ce7-9090-2c8e785fd687.png",
    "/lovable-uploads/d4f1f66c-dc34-4fb7-b262-ba92608d81be.png",
    "/lovable-uploads/48886e28-b10e-423e-9cc6-71652248cd11.png",
    "/lovable-uploads/9b3972e3-5502-488a-9eee-64d3ca531667.png",
    "/lovable-uploads/8307b89a-d2bc-4222-9dbf-b60833ff038e.png",
    "/lovable-uploads/06569ac2-a95b-47bc-a95e-b43a241cf6c3.png",
    "/lovable-uploads/d665f59f-cc1c-4742-b8a3-4a5530917fe9.png"
  ];
  
  // Randomize the student images on initial load
  const [randomizedImages, setRandomizedImages] = useState<string[]>([]);
  
  useEffect(() => {
    // Fisher-Yates shuffle algorithm for proper randomization
    const shuffleArray = (array: string[]) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };
    
    setRandomizedImages(shuffleArray(studentImages));
  }, []);
  
  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying && randomizedImages.length > 0) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % randomizedImages.length);
      }, 3000); // Change slide every 3 seconds
    }
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, randomizedImages.length]);

  // Add water ripple effect on interactions
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

  // Text animation variants
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        delay: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section ref={heroRef} className="relative min-h-[85vh] pt-16 md:pt-0 overflow-hidden">
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
      
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content with Animations */}
          <div className="space-y-6">
            <motion.div 
              className="relative inline-block"
              initial="hidden"
              animate="visible"
              variants={headingVariants}
            >
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-maroon-950 mb-2">
                Master the Art of <br />
                <span className="text-maroon-800 relative inline-block">
                  Carnatic Violin
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-500 scale-x-100 origin-left animate-[expandWidth_1.2s_ease-out]"></span>
                </span>
              </h1>
              <div className="absolute -bottom-2 left-0 w-24 h-1 bg-amber-500"></div>
            </motion.div>
            
            <motion.p 
              className="text-lg text-gray-700"
              initial="hidden"
              animate="visible"
              variants={paragraphVariants}
            >
              Learn the traditional South Indian violin technique from an experienced teacher. 
              Personalized lessons for beginners to advanced students.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
              whileHover="hover"
            >
              <Button
                size="lg"
                className="bg-maroon-700 hover:bg-maroon-800 transition-all duration-300"
                asChild
              >
                <a href="https://forms.gle/FCuVKb2bqED64QV3A" target="_blank" rel="noopener noreferrer">
                  Enroll Now
                </a>
              </Button>
            </motion.div>
          </div>
          
          {/* Image Carousel */}
          <div className="relative">
            {randomizedImages.length > 0 && (
              <Carousel className={cn(
                "w-full max-w-md mx-auto",
                "before:absolute before:inset-0 before:z-10 before:pointer-events-none",
                "before:bg-gradient-to-r before:from-transparent before:via-transparent",
                "hover:before:opacity-0 before:transition-opacity before:duration-300"
              )} 
              setApi={(api) => {
                if (api) {
                  api.scrollTo(currentSlide);
                  api.on("select", () => {
                    setCurrentSlide(api.selectedScrollSnap());
                  });
                }
              }}
              opts={{
                loop: true,
                align: "center",
              }}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <CarouselContent>
                {randomizedImages.map((src, index) => (
                  <CarouselItem key={index} className="p-1">
                    <div className="overflow-hidden group">
                      <div className="relative h-80 md:h-96 transition-all duration-500 group-hover:scale-[1.02]">
                        <div
                          className="absolute -top-4 -right-4 w-full h-full bg-amber-200 rounded-lg transform rotate-3 transition-transform duration-500 group-hover:rotate-2"
                          style={{ transformOrigin: "center" }}
                        ></div>
                        <div className="relative z-10 w-full h-full object-cover rounded-lg overflow-hidden shadow-lg transform -rotate-3 transition-transform duration-500 group-hover:rotate-0">
                          <ImageProtection
                            src={src}
                            alt={`Carnatic violin student ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="-left-8 bg-white/70 hover:bg-white" />
                <CarouselNext className="-right-8 bg-white/70 hover:bg-white" />
              </div>
              <div className="flex justify-center mt-4 gap-2">
                {randomizedImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentSlide === index ? "w-4 bg-amber-500" : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </Carousel>
            )}
          </div>
        </div>
      </div>

      {/* Add keyframe animations for ripple and expandWidth */}
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
    </section>
  );
};

export default HeroSection;
