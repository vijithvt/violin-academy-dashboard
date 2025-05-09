
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, RotateCw, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  description: string;
}

const TasksContent = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Complete weekly practice recording",
      dueDate: "2023-04-18",
      status: "pending",
      description: "Record your practice of Varnam and upload via the student dashboard"
    },
    {
      id: 2,
      title: "Memorize lyrics for new song",
      dueDate: "2023-04-20",
      status: "pending",
      description: "Focus on pronunciation and meaning of each line"
    },
    {
      id: 3,
      title: "Work on finger exercises",
      dueDate: "2023-04-15",
      status: "overdue",
      description: "Complete the finger exercise routine shared in last class"
    },
    {
      id: 4,
      title: "Review class recording",
      dueDate: "2023-04-10",
      status: "completed",
      description: "Watch the latest class recording and note down questions"
    }
  ]);

  // Calculate completion percentage
  const completionPercentage = Math.round((tasks.filter(task => task.status === 'completed').length / tasks.length) * 100);

  const updateTaskStatus = (id: number, newStatus: 'pending' | 'completed' | 'overdue') => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));

    toast({
      title: "Task status updated",
      description: newStatus === 'completed' ? "Task marked as completed!" : "Task status changed.",
    });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'overdue': return <X className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const resetAllTasks = () => {
    setTasks(prevTasks => prevTasks.map(task => ({ ...task, status: 'pending' })));
    toast({
      title: "Tasks reset",
      description: "All tasks have been reset to pending status.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Practice Tasks</h2>
          <p className="text-gray-500">Track your weekly practice tasks</p>
        </div>
        <div className="flex items-center">
          <span className="mr-4 font-medium">{completionPercentage}% Complete</span>
          <Progress value={completionPercentage} className="w-[100px]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.map(task => (
          <Card key={task.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{task.title}</CardTitle>
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)} flex items-center`}>
                  {getStatusIcon(task.status)}
                  <span className="ml-1 capitalize">{task.status}</span>
                </div>
              </div>
              <CardDescription className="text-xs">Due: {task.dueDate}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-gray-600">{task.description}</p>
            </CardContent>
            
            <CardFooter className="bg-gray-50 pt-3 pb-3 flex justify-end space-x-2">
              {task.status !== 'pending' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => updateTaskStatus(task.id, 'pending')}
                >
                  Mark as Pending
                </Button>
              )}
              {task.status !== 'completed' && (
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => updateTaskStatus(task.id, 'completed')}
                >
                  Complete
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={resetAllTasks}
          className="flex items-center"
        >
          <RotateCw className="mr-2 h-4 w-4" /> 
          Reset All Tasks
        </Button>
      </div>
    </div>
  );
};

export default TasksContent;
