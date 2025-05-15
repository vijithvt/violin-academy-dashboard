
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ImageProtection } from "@/components/ui/image-protection";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const StudentImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Student images from the latest upload
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

  return (
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
                      <div className="relative w-full h-full">
                        <ImageProtection
                          src={src}
                          alt={`Carnatic violin student ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {/* Diagonal watermark without background */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                          <div 
                            className="font-serif text-white text-opacity-70 text-xl md:text-2xl transform rotate-[-35deg] select-none"
                            style={{ 
                              textShadow: "1px 1px 3px rgba(0,0,0,0.7)", 
                              letterSpacing: "1px"
                            }}
                          >
                            Violin Academy
                          </div>
                        </div>
                      </div>
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
  );
};

export default StudentImageCarousel;
