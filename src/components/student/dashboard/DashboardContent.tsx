
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsOverview from "./StatsOverview";
import QuoteCard from "./QuoteCard";
import LessonProgression from "@/components/student/LessonProgression";
import TasksContent from "./TasksContent";
import TopStudents from "@/components/student/TopStudents";
import StudentStats from "./StudentStats";

interface SyllabusItem {
  id: number;
  title: string;
  level: number;
  status: "Completed" | "In Progress" | "Not Started";
  date: string;
}

interface Task {
  id: number;
  title: string;
  dueDate: string;
}

interface DashboardContentProps {
  stats: {
    lessonsCompleted: number;
    progressPercentage: number;
    practiceHours: number;
    studentPoints: number;
    pendingTasks: number;
  };
  syllabus: SyllabusItem[];
  tasks: Task[];
}

const DashboardContent = ({ stats, syllabus, tasks }: DashboardContentProps) => {
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-maroon-900 mb-6">
        Student Dashboard
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          {/* Stats Overview */}
          <StatsOverview stats={stats} totalLessons={syllabus.length} />
          
          {/* Daily Quote */}
          <QuoteCard />
          
          {/* Tabs for different sections */}
          <Tabs defaultValue="lessons" className="space-y-4">
            <TabsList className="bg-amber-100">
              <TabsTrigger value="lessons" className="data-[state=active]:bg-amber-200">My Lessons</TabsTrigger>
              <TabsTrigger value="tasks" className="data-[state=active]:bg-amber-200">Pending Tasks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="lessons" className="space-y-4">
              <LessonProgression lessons={syllabus.slice(0, 6)} />
            </TabsContent>
            
            <TabsContent value="tasks" className="space-y-4">
              <TasksContent tasks={tasks} />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right Sidebar - Top Students */}
        <div>
          <TopStudents />
          <StudentStats stats={stats} />
        </div>
      </div>
    </>
  );
};

export default DashboardContent;
