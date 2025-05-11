
import { cn } from "@/lib/utils";
import CourseCard from "./CourseCard";
import { courseCards } from "./constants";

type CourseCardsListProps = {
  isVisible: boolean;
};

const CourseCardsList = ({ isVisible }: CourseCardsListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {courseCards.map((course, index) => (
        <div 
          key={index} 
          className={cn(
            "transform transition-all duration-700",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}
          style={{ transitionDelay: `${index * 200}ms` }}
        >
          <CourseCard {...course} />
        </div>
      ))}
    </div>
  );
};

export default CourseCardsList;
