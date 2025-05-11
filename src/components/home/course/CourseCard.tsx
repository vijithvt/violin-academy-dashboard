
import { useState, useEffect, ChangeEvent } from "react";
import { Clock, Calculator, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseCardProps } from "./constants";
import CourseTravelCalculator from "./CourseTravelCalculator";

const CourseCard = ({ title, description, icon, fee, time, highlights, isHomeTuition }: CourseCardProps) => {
  return (
    <Card className="bg-white border border-amber-100 rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden transform hover:-translate-y-1 duration-300">
      <CardHeader className="pb-2 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-amber-50 rounded-full">
            {icon}
          </div>
        </div>
        <CardTitle className="text-xl text-maroon-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center pb-3">
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="text-amber-700 font-medium">{fee}</div>
        <div className="text-gray-500 text-sm mt-1 flex items-center justify-center">
          <Clock className="h-4 w-4 mr-1" /> {time}
        </div>
        
        {isHomeTuition && <CourseTravelCalculator />}
        
        {highlights && highlights.length > 0 && (
          <div className="mt-3 border-t pt-3 border-dashed border-amber-200">
            <ul className="text-left text-xs space-y-1">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-center">
                  <span className="text-green-500 mr-1">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseCard;
