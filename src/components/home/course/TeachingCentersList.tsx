
import { cn } from "@/lib/utils";
import { Globe, MapPin } from "lucide-react";
import { TEACHING_CENTERS } from "./constants";

type TeachingCentersListProps = {
  isVisible: boolean;
};

const TeachingCentersList = ({ isVisible }: TeachingCentersListProps) => {
  return (
    <div className={cn(
      "transform transition-all duration-1000 mb-12",
      isVisible ? "translate-y-0 opacity-100 delay-300" : "translate-y-10 opacity-0"
    )}>
      <h3 className="text-2xl font-serif font-bold text-maroon-900 mb-6 text-center">
        Teaching Centers
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {TEACHING_CENTERS.map((center, index) => (
          <div 
            key={index} 
            className="bg-white p-4 rounded-lg shadow-md border border-amber-100 hover:shadow-lg transition-all"
            style={{ 
              transitionDelay: `${(index + 3) * 100}ms`,
              animation: isVisible ? `fade-in 0.5s ease-out ${(index + 3) * 0.1}s both` : 'none' 
            }}
          >
            <h4 className="font-medium text-maroon-800 mb-1">{center.name}</h4>
            <p className="text-sm text-gray-600 mb-1">{center.location}</p>
            <div className="flex items-center text-xs text-amber-700">
              {center.type === "Online" ? (
                <><Globe className="h-3 w-3 mr-1" /> Online Classes</>
              ) : (
                <><MapPin className="h-3 w-3 mr-1" /> In-person Classes</>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeachingCentersList;
