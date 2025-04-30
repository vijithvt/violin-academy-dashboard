
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

const VideoSection = () => {
  const videos = [
    {
      id: "rCSxftS6Dv4", 
      title: "Carnatic Violin Tutorial"
    },
    {
      id: "o1w9aEgn2yM",
      title: "Violin Basics"
    },
    {
      id: "SYoQ8uPNvA0",
      title: "How to Start Learning Violin"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-2 text-center">
          Violin Shorts
        </h2>
        <p className="text-center text-gray-600 mb-10">Watch these short videos to learn more about violin techniques</p>
        
        <div className="max-w-5xl mx-auto">
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
                  <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="aspect-video">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${video.id}`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="p-3 bg-amber-50">
                      <h3 className="font-medium text-center">{video.title}</h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="static transform-none mx-1" />
              <CarouselNext className="static transform-none mx-1" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
