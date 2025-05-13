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
  
  // New student images (with the previously available musicians at the end)
  const studentImages = [
    "/lovable-uploads/b9c5bb6b-7f42-45c6-9e29-c3092129540a.png",
    "/lovable-uploads/2098a534-61c2-4aac-a0f5-89b3fb1c3a21.png",
    "/lovable-uploads/964099a6-72ea-4a23-a374-ac4baa79ea05.png",
    "/lovable-uploads/c1a60095-c2d8-4299-b970-63a203bda504.png",
    "/lovable-uploads/5aff10ea-3cd6-4b90-a074-bae496d7cc28.png",
    "/lovable-uploads/e58c9bd4-20fc-42cb-8eb5-40f1d3483f4b.png",
    "/lovable-uploads/e72b5498-1166-4da8-8d90-c7efba21bc8d.png",
    "/lovable-uploads/e3fbcddd-8adb-4994-9ffd-6fe4d4057e98.png",
    "/lovable-uploads/10dcede2-b081-4c3f-b30b-d339fb2b5c71.png",
    "/lovable-uploads/1d50b7f6-87d8-4f1b-a5cc-55e15198d453.png",
    "/lovable-uploads/32bc6224-5c73-4ed4-94a7-8f9a29393f62.png",
    "/lovable-uploads/2c620329-ace6-4026-8537-4129f1087ebe.png",
    "/lovable-uploads/1ccaf7f8-272d-42a9-a24b-c8a7bc9564a5.png",
    "/lovable-uploads/4b546ba2-9ba6-44a8-bf40-c05efd6868d3.png",
    // Keep previous musician images at the end
    "/lovable-uploads/659879b6-81cf-4269-80f1-20ec7d2d5cd3.png",
    "/lovable-uploads/0fe0e6d5-2dae-427c-a526-bdfa0ebd1cf1.png",
    "/lovable-uploads/d360aa7e-fe19-4f1d-9835-3b7e14e7b9ff.png",
    "/lovable-uploads/65a367ac-e8fa-48a2-80fa-7cbc03541542.png",
    "/lovable-uploads/cc04dd6a-b479-4eae-a679-718755823964.png",
    "/lovable-uploads/344318eb-d2db-4042-bc9a-5dfaa5558c2e.png",
    "/lovable-uploads/6f4fc66e-f728-44f8-a1da-6721b9682495.png"  
  ];
  
  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % studentImages.length);
      }, 3000); // Change slide every 3 seconds
    }
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, studentImages.length]);

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
                {studentImages.map((src, index) => (
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
                {studentImages.map((_, index) => (
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
