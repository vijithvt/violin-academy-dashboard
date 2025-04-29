
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="relative bg-gradient-to-r from-maroon-900 to-amber-900 text-white py-20 md:py-28">
      <div className="absolute inset-0 opacity-20 bg-[url('/placeholder.svg')] bg-cover bg-center"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            Learn Carnatic Violin with Passion and Precision
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Online & offline violin classes by violinist Vijith V T
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#join">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                Join Now <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
