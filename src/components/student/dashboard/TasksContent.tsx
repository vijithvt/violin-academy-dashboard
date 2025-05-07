
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Task {
  id: number;
  title: string;
  dueDate: string;
}

interface TasksContentProps {
  tasks: Task[];
}

const TasksContent = ({ tasks }: TasksContentProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks Due</CardTitle>
        <CardDescription>
          Assignments that need your attention
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="p-4 rounded-md border border-amber-200 bg-amber-50">
              <div className="flex justify-between">
                <h3 className="font-medium">{task.title}</h3>
                <span className="text-sm text-maroon-700 font-medium">Due: {task.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksContent;
