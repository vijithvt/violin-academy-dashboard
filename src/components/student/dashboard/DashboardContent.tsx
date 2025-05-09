import { useState, useEffect } from "react";
import { CalendarDays, CheckCircle2, Loader2, ListChecks } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStudentById } from "@/api/adminService/profileService";
import { useAuth } from "@/providers/AuthProvider";
import { Link } from "react-router-dom";

// Update Task type import to match the one from our API
import { Task as ApiTask } from '@/api/adminService/types';

// Define local task type for component
interface Task {
  id: string;
  title: string;
  description: string;
  status: "completed" | "pending" | "overdue";
  due_date?: string;
}

const DashboardContent = () => {
  const { user } = useAuth();
  const userId = user?.id;
  const { data: student, isLoading: isStudentLoading } = useStudentById(userId || "");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching tasks from an API
    const fetchTasks = async () => {
      setLoading(true);
      // Replace this with your actual API call
      setTimeout(() => {
        const mockTasks: Task[] = [
          {
            id: "1",
            title: "Complete Module 1",
            description: "Read the introduction to Carnatic Violin and complete the exercises.",
            status: "pending",
            due_date: "2024-08-15",
          },
          {
            id: "2",
            title: "Practice Basic Scales",
            description: "Practice the Mayamalavagowla scale for 30 minutes daily.",
            status: "pending",
            due_date: "2024-08-20",
          },
          {
            id: "3",
            title: "Submit Recording",
            description: "Record yourself playing the scale and submit it for review.",
            status: "overdue",
            due_date: "2024-08-01",
          },
          {
            id: "4",
            title: "Attend Online Class",
            description: "Join the online class on August 10th at 6 PM.",
            status: "completed",
            due_date: "2024-08-10",
          },
        ];
        setTasks(mockTasks);
        setLoading(false);
      }, 1500);
    };

    fetchTasks();
  }, []);

  if (isStudentLoading) {
    return <StudentLoading />;
  }

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg text-gray-500">
          No student profile found. Please contact your administrator.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDays className="mr-2 h-4 w-4" />
              Attendance
            </CardTitle>
            <CardDescription>Your attendance record for this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">8/10</div>
            <p className="text-sm text-gray-500">You attended 8 out of 10 classes this month.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ListChecks className="mr-2 h-4 w-4" />
              Tasks
            </CardTitle>
            <CardDescription>Your assigned tasks and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {tasks.filter((task) => task.status === "pending").length}
              /{tasks.length}
            </div>
            <p className="text-sm text-gray-500">
              {tasks.filter((task) => task.status === "pending").length} pending out of {tasks.length} total
              tasks.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Level
            </CardTitle>
            <CardDescription>Your current learning level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{student.level}</div>
            <p className="text-sm text-gray-500">Keep up the great work!</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
          <CardDescription>Your assigned tasks and their status</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-4">
              <TaskSkeleton />
            </div>
          ) : (
            <ScrollArea className="rounded-md border">
              <div className="p-4">
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <div key={task.id} className="mb-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{task.title}</p>
                          <p className="text-sm text-gray-500">{task.description}</p>
                          {task.due_date && (
                            <p className="text-xs text-gray-400">Due: {task.due_date}</p>
                          )}
                        </div>
                        <Badge
                          variant="secondary"
                          className={`capitalize ${
                            task.status === "completed"
                              ? "bg-green-100 text-green-500"
                              : task.status === "pending"
                              ? "bg-yellow-100 text-yellow-500"
                              : "bg-red-100 text-red-500"
                          }`}
                        >
                          {task.status}
                        </Badge>
                      </div>
                      <Separator className="my-2" />
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500">No tasks assigned yet.</div>
                )}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardContent;

const TaskSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
          <Skeleton className="h-4 w-[400px]" />
          <Skeleton className="h-4 w-[300px]" />
          <Separator />
        </div>
      ))}
    </div>
  );
};

const StudentLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2">Loading student data...</span>
    </div>
  );
};
