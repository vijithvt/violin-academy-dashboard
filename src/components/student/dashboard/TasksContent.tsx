
import { useState } from "react";
import { CheckCircle, Circle, Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Task } from "@/api/adminService/types";

interface TasksContentProps {
  tasks: Task[];
}

export const TasksContent = ({ tasks }: TasksContentProps) => {
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const toggleTaskExpansion = (taskId: string) => {
    if (expandedTask === taskId) {
      setExpandedTask(null);
    } else {
      setExpandedTask(taskId);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "overdue":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-300" />;
    }
  };

  const formatDueDate = (dateString?: string) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg mb-3">Your Tasks</h3>
      
      {tasks.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <p className="text-gray-500">No tasks assigned yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                "border rounded-lg p-4 transition-all duration-200",
                task.status === "completed" && "bg-green-50 border-green-100",
                task.status === "pending" && "bg-amber-50 border-amber-100",
                task.status === "overdue" && "bg-red-50 border-red-100"
              )}
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleTaskExpansion(task.id)}
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(task.status)}
                  <span className="font-medium">{task.title}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Due: {formatDueDate(task.due_date)}
                </div>
              </div>
              
              {expandedTask === task.id && (
                <div className="mt-3 pt-3 border-t text-sm text-gray-600">
                  <p>{task.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      <button className="w-full mt-4 py-2 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium rounded-md transition-colors">
        Add Weekly Practice Log
      </button>
    </div>
  );
};

export default TasksContent;
