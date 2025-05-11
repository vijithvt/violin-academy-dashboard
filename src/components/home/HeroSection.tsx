
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const studentImages = [
    "/lovable-uploads/64ab8fd2-ed27-4e9b-b0db-65a08587711f.png",
    "/lovable-uploads/add05238-49bf-41fe-83ea-e15bb94c47f3.png",
    "/lovable-uploads/906762ba-e107-4464-ab59-bea05f89e50f.png",
    "/lovable-uploads/dfaa7752-b5f2-419f-bc41-71d3ffeed5fc.png",
    "/lovable-uploads/297c58a8-7554-41c1-859f-411333f2b6cc.png",
    "/lovable-uploads/887ef074-d0d0-4beb-af40-6cf0e5701738.png",
    "/lovable-uploads/0825a141-e012-4cef-93e7-676a745756da.png",
    "/lovable-uploads/659879b6-81cf-4269-80f1-20ec7d2d5cd3.png"
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

  return (
    <section className="relative pt-16 md:pt-0 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50 to-white pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="relative inline-block">
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-maroon-950 mb-2">
                Master the Art of <br />
                <span className="text-maroon-800">Carnatic Violin</span>
              </h1>
              <div className="absolute -bottom-2 left-0 w-24 h-1 bg-amber-500"></div>
            </div>
            
            <p className="text-lg text-gray-700">
              Learn the traditional South Indian violin technique from an experienced teacher. 
              Personalized lessons for beginners to advanced students.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-maroon-700 hover:bg-maroon-800"
                asChild
              >
                <a href="https://forms.gle/FCuVKb2bqED64QV3A" target="_blank" rel="noopener noreferrer">
                  Enroll Now
                </a>
              </Button>
            </div>
          </div>
          
          {/* Image Carousel */}
          <div className="relative">
            <Carousel className="w-full max-w-md mx-auto" 
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
                    onMouseLeave={() => setIsAutoPlaying(true)}>
              <CarouselContent>
                {studentImages.map((src, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-80 md:h-96">
                      <div className="absolute -top-4 -right-4 w-full h-full bg-amber-200 rounded-lg transform rotate-3"></div>
                      <img
                        src={src}
                        alt={`Violin student ${index + 1}`}
                        className="relative z-10 w-full h-full object-cover rounded-lg shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-500"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="-left-8 bg-white/70 hover:bg-white" />
                <CarouselNext className="-right-8 bg-white/70 hover:bg-white" />
              </div>
              {/* Carousel indicators */}
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
    </section>
  );
};

export default HeroSection;
