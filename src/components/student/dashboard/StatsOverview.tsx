
import { BookOpen, Clock, ListTodo } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StatsOverviewProps {
  stats: {
    lessonsCompleted: number;
    progressPercentage: number;
    practiceHours: number;
    studentPoints: number;
    pendingTasks: number;
  };
  totalLessons: number;
}

const StatsOverview = ({ stats, totalLessons }: StatsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="bg-gradient-to-br from-maroon-50 to-white border-maroon-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-maroon-700" />
            Lessons Completed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-maroon-800">{stats.lessonsCompleted}</p>
          <p className="text-sm text-gray-500">of {totalLessons} total lessons</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-maroon-50 to-white border-maroon-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-maroon-700" />
            Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Progress value={stats.progressPercentage} className="h-2" />
            <p className="text-3xl font-bold text-maroon-800">{stats.progressPercentage}%</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-maroon-50 to-white border-maroon-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Clock className="h-5 w-5 mr-2 text-maroon-700" />
            Weekly Practice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-maroon-800">{stats.practiceHours}h</p>
          <p className="text-sm text-gray-500">Goal: 5 hours</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-maroon-50 to-white border-maroon-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <ListTodo className="h-5 w-5 mr-2 text-maroon-700" />
            Pending Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-maroon-800">{stats.pendingTasks}</p>
          <p className="text-sm text-gray-500">Due this week</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsOverview;
