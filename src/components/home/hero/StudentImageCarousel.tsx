
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
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
  
  // Student images from the latest upload (with watermarks already included)
  const studentImages = [
    "lovable-uploads/1.jpg",
    "lovable-uploads/2.jpg",
    "lovable-uploads/3.jpg",
    "lovable-uploads/4.jpg"
  
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
                    <div className="relative z-10 w-full h-full rounded-lg overflow-hidden shadow-lg transform -rotate-3 transition-transform duration-500 group-hover:rotate-0">
                      <div className="relative w-full h-full">
                        <img
                          src={src}
                          alt={`Carnatic violin student ${index + 1}`}
                          className="w-full h-full object-cover object-top select-none"
                          style={{
                            pointerEvents: "none",
                            userSelect: "none",
                            WebkitUserSelect: "none"
                          }}
                          loading="lazy"
                        />
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
