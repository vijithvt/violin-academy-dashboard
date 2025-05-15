
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CalendarCheck, Music, Lightbulb, Award, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ComingSoonCardProps {
  title: string;
  icon: "book" | "calendar-check" | "award" | "bulb" | "music";
}

const ComingSoonCard = ({ title, icon }: ComingSoonCardProps) => {
  // Map icon string to Lucide icon component
  const iconMap: Record<string, LucideIcon> = {
    "book": BookOpen,
    "calendar-check": CalendarCheck,
    "award": Award,
    "bulb": Lightbulb,
    "music": Music,
  };
  
  const IconComponent = iconMap[icon];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card className="border-amber-100 shadow-md overflow-hidden">
        <div className="absolute top-0 right-0 h-24 w-24 opacity-5 transform translate-x-8 -translate-y-8">
          {IconComponent && <IconComponent size={96} />}
        </div>
        <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 pb-2">
          <CardTitle className="flex items-center text-maroon-800">
            {IconComponent && <IconComponent className="mr-2 h-5 w-5" />}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 pb-8 text-center">
          <div className="py-8 px-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
              {IconComponent && (
                <IconComponent className="h-8 w-8 text-amber-700" />
              )}
            </div>
            <p className="text-muted-foreground">This feature is under development</p>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-amber-500 h-2 rounded-full w-1/4"></div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gradient-to-r from-amber-50 to-orange-50 border-t py-2 text-xs text-center text-amber-800">
          Coming Soon
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ComingSoonCard;
