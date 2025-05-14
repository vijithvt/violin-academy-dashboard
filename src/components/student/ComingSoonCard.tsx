
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Book, Award, CalendarCheck, BookOpen, Lightbulb, Star } from "lucide-react";

interface ComingSoonCardProps {
  title: string;
  icon: string;
}

const ComingSoonCard = ({ title, icon }: ComingSoonCardProps) => {
  let IconComponent;
  
  // Select the appropriate icon
  switch (icon) {
    case 'book':
      IconComponent = Book;
      break;
    case 'book-open':
      IconComponent = BookOpen;
      break;
    case 'calendar-check':
      IconComponent = CalendarCheck;
      break;
    case 'bulb':
    case 'lightbulb':
      IconComponent = Lightbulb;
      break;
    case 'award':
      IconComponent = Award;
      break;
    case 'star':
      IconComponent = Star;
      break;
    default:
      IconComponent = Book;
  }
  
  return (
    <Card className="border border-dashed border-gray-300 bg-gray-50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-gray-500">
          {IconComponent && <IconComponent className="mr-2 h-5 w-5" />}
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-gray-400 font-medium">Coming Soon</p>
          <p className="text-sm text-gray-400 mt-2 text-center">
            This feature is currently under development
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComingSoonCard;
