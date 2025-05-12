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
  
  const musicianImages = [
    "/lovable-uploads/659879b6-81cf-4269-80f1-20ec7d2d5cd3.png", // Keeping one student image for consistency
    "/lovable-uploads/0fe0e6d5-2dae-427c-a526-bdfa0ebd1cf1.png", // L. Subramaniam
    "/lovable-uploads/d360aa7e-fe19-4f1d-9835-3b7e14e7b9ff.png", // Kunnakudi Vaidyanathan
    "/lovable-uploads/65a367ac-e8fa-48a2-80fa-7cbc03541542.png", // M.S. Gopalakrishnan
    "/lovable-uploads/cc04dd6a-b479-4eae-a679-718755823964.png", // A. Kanyakumari
    "/lovable-uploads/344318eb-d2db-4042-bc9a-5dfaa5558c2e.png", // Lalgudi Jayaraman
    "/lovable-uploads/6f4fc66e-f728-44f8-a1da-6721b9682495.png"  // T.N. Krishnan
  ];
  
  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % musicianImages.length);
      }, 3000); // Change slide every 3 seconds
    }
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, musicianImages.length]);

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
          
          {/* Image Carousel - Hidden temporarily */}
          {/* Commenting out the carousel but keeping the code for future reference */}
          {/*
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
                {musicianImages.map((src, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-80 md:h-96">
                      <div className="absolute -top-4 -right-4 w-full h-full bg-amber-200 rounded-lg transform rotate-3"></div>
                      <img
                        src={src}
                        alt={`Famous Carnatic ${index === 0 ? 'musician' : 'violinist'} ${index + 1}`}
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
              <div className="flex justify-center mt-4 gap-2">
                {musicianImages.map((_, index) => (
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
          */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
