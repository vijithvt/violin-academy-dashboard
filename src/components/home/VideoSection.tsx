
import { useState, useRef, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const VideoSection = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const videoRefs = useRef<Array<HTMLIFrameElement | null>>([]);
  const [isVisible, setIsVisible] = useState(false);
  
  const videos = [
    {
      id: "rCSxftS6Dv4", 
      title: "Carnatic Violin Tutorial",
      thumbnail: "/lovable-uploads/64ab8fd2-ed27-4e9b-b0db-65a08587711f.png"
    },
    {
      id: "o1w9aEgn2yM",
      title: "Violin Basics",
      thumbnail: "/lovable-uploads/d360aa7e-fe19-4f1d-9835-3b7e14e7b9ff.png"
    },
    {
      id: "SYoQ8uPNvA0",
      title: "How to Start Learning Violin",
      thumbnail: "/lovable-uploads/ddbf5914-5683-4ad3-a520-ce04446ee41a.png"
    }
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    const currentElement = document.getElementById("video-section");
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  const handleVideoPlay = (index: number) => {
    setActiveVideo(index);
  };

  return (
    <section id="video-section" className="py-20 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-amber-50 to-transparent"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-200 rounded-full blur-3xl opacity-40"></div>
      
      <div className="container mx-auto px-4">
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-12 transition-all duration-1000 transform",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <h2 className="text-4xl font-serif font-bold text-purple-900 mb-2">
            Violin Shorts
          </h2>
          <p className="text-lg text-gray-600 mb-4">Watch these short videos to learn more about violin techniques</p>
          <div className="h-1 w-24 bg-amber-400 mx-auto"></div>
        </div>
        
        <div className={cn(
          "max-w-5xl mx-auto transition-all duration-1000 delay-300 transform",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <Carousel
            opts={{
              align: "start",
              loop: true
            }}
            className="w-full"
          >
            <CarouselContent>
              {videos.map((video, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pt-6 pb-10">
                  <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white border border-purple-100">
                    <div className="aspect-video relative group">
                      {activeVideo !== index ? (
                        <>
                          <img 
                            src={video.thumbnail || `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} 
                            alt={video.title} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-all">
                            <button 
                              onClick={() => handleVideoPlay(index)} 
                              className="w-14 h-14 rounded-full bg-purple-600/90 flex items-center justify-center transition-transform transform group-hover:scale-110"
                            >
                              <Play className="h-6 w-6 text-white fill-white" />
                            </button>
                          </div>
                        </>
                      ) : (
                        <iframe
                          ref={el => videoRefs.current[index] = el}
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      )}
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="font-medium text-center text-purple-800">{video.title}</h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static transform-none w-12 h-12 rounded-full bg-white border border-purple-200 text-purple-700 hover:bg-purple-50" />
              <CarouselNext className="static transform-none w-12 h-12 rounded-full bg-white border border-purple-200 text-purple-700 hover:bg-purple-50" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
