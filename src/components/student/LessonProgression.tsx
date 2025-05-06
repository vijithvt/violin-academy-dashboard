
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "lucide-react";

interface LessonProps {
  id: number;
  title: string;
  status: "Completed" | "In Progress" | "Not Started";
  date: string;
}

const LessonProgression = ({ lessons }: { lessons: LessonProps[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Book className="h-5 w-5 mr-2 text-maroon-700" />
          Lesson Progress
        </CardTitle>
        <CardDescription>
          Track your progress through the curriculum
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {lessons.map((lesson) => (
            <div 
              key={lesson.id} 
              className="p-4 rounded-md border flex justify-between items-center"
              style={{
                borderColor: 
                  lesson.status === "Completed" ? "rgb(34, 197, 94)" : 
                  lesson.status === "In Progress" ? "rgb(234, 179, 8)" : 
                  "rgb(203, 213, 225)"
              }}
            >
              <div>
                <h3 className="font-medium">{lesson.title}</h3>
                <p className="text-sm text-gray-500">Scheduled: {lesson.date}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                lesson.status === "Completed" ? "bg-green-100 text-green-800" : 
                lesson.status === "In Progress" ? "bg-yellow-100 text-yellow-800" : 
                "bg-gray-100 text-gray-800"
              }`}>
                {lesson.status}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LessonProgression;
