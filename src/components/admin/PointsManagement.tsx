
import { useState } from "react";
import { useStudentProfiles, useAddStudentPoints } from "@/api/adminService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search, Plus, Minus } from "lucide-react";

const POINTS_ACTIVITIES = [
  { name: "Regular attendance", points: 10, type: "positive" },
  { name: "Practicing daily", points: 5, type: "positive" },
  { name: "Completing lessons", points: 15, type: "positive" },
  { name: "Monthly assessment participation", points: 20, type: "positive" },
  { name: "Good assessment score (above 80%)", points: 25, type: "positive" },
  { name: "Learning a new song", points: 20, type: "positive" },
  { name: "Exploring a new raga", points: 10, type: "positive" },
  { name: "Completing 10-day practice streak", points: 30, type: "positive" },
  { name: "Helping peers / group performance", points: 15, type: "positive" },
  { name: "Performing in a recital", points: 25, type: "positive" },
  { name: "Late arrival", points: -5, type: "negative" },
  { name: "Uninformed absence", points: -10, type: "negative" },
  { name: "No practice updates", points: -5, type: "negative" },
  { name: "Skipping monthly assessment", points: -15, type: "negative" },
  { name: "Showing no interest in lessons", points: -10, type: "negative" },
];

const PointsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [customActivity, setCustomActivity] = useState("");
  const [customPoints, setCustomPoints] = useState<number | null>(null);
  const [isCustom, setIsCustom] = useState(false);

  const { data: students, isLoading: loadingStudents } = useStudentProfiles(
    searchTerm,
    { role: "student" }
  );

  const addPointsMutation = useAddStudentPoints();

  const handleActivityChange = (value: string) => {
    if (value === "custom") {
      setIsCustom(true);
      setSelectedActivity("custom");
      setCustomPoints(null);
      setCustomActivity("");
    } else {
      setIsCustom(false);
      setSelectedActivity(value);
      const activity = POINTS_ACTIVITIES.find(a => a.name === value);
      if (activity) {
        setCustomPoints(activity.points);
        setCustomActivity(activity.name);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStudent || (!selectedActivity && !isCustom) || (isCustom && !customActivity) || customPoints === null) {
      return;
    }

    addPointsMutation.mutate({
      userId: selectedStudent,
      activity: isCustom ? customActivity : (customActivity || ""),
      points: customPoints
    });

    // Reset form after submission
    setSelectedActivity(null);
    setCustomActivity("");
    setCustomPoints(null);
    setIsCustom(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Add Points</CardTitle>
            <CardDescription>
              Reward or deduct points for student activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Student</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search student by name"
                    className="pl-8 mb-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {loadingStudents ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
                    <span>Loading students...</span>
                  </div>
                ) : (
                  <Select value={selectedStudent || ""} onValueChange={setSelectedStudent}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students && students.length > 0 ? (
                        students
                          .filter(student => student.role === "student")
                          .map(student => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.name}
                            </SelectItem>
                          ))
                      ) : (
                        <SelectItem value="none" disabled>
                          No students found
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Activity</label>
                <Select value={selectedActivity || ""} onValueChange={handleActivityChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an activity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom">Custom Activity</SelectItem>
                    
                    <SelectItem disabled className="font-semibold text-green-600">
                      --- Positive Points ---
                    </SelectItem>
                    {POINTS_ACTIVITIES
                      .filter(activity => activity.type === "positive")
                      .map(activity => (
                        <SelectItem key={activity.name} value={activity.name}>
                          {activity.name} (+{activity.points})
                        </SelectItem>
                      ))
                    }
                    
                    <SelectItem disabled className="font-semibold text-red-600">
                      --- Negative Points ---
                    </SelectItem>
                    {POINTS_ACTIVITIES
                      .filter(activity => activity.type === "negative")
                      .map(activity => (
                        <SelectItem key={activity.name} value={activity.name}>
                          {activity.name} ({activity.points})
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>
              
              {isCustom && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Custom Activity Description</label>
                    <Input
                      value={customActivity}
                      onChange={(e) => setCustomActivity(e.target.value)}
                      placeholder="Describe the activity"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Points</label>
                    <div className="flex items-center space-x-2">
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={() => setCustomPoints((prev) => (prev !== null ? prev - 5 : -5))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={customPoints !== null ? customPoints : ""}
                        onChange={(e) => setCustomPoints(parseInt(e.target.value) || 0)}
                        className="text-center"
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={() => setCustomPoints((prev) => (prev !== null ? prev + 5 : 5))}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
              
              <Button 
                type="submit" 
                className="w-full mt-4"
                disabled={!selectedStudent || (!selectedActivity && !isCustom) || (isCustom && !customActivity) || customPoints === null || addPointsMutation.isPending}
              >
                {addPointsMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding Points...
                  </>
                ) : (
                  "Add Points"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Points System Guidelines</CardTitle>
            <CardDescription>
              How the points system works
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-green-700 mb-2">Positive Points</h3>
                <ul className="space-y-2 text-sm">
                  {POINTS_ACTIVITIES
                    .filter(activity => activity.type === "positive")
                    .map(activity => (
                      <li key={activity.name} className="flex justify-between">
                        <span>{activity.name}</span>
                        <span className="font-medium text-green-600">+{activity.points}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-red-700 mb-2">Negative Points</h3>
                <ul className="space-y-2 text-sm">
                  {POINTS_ACTIVITIES
                    .filter(activity => activity.type === "negative")
                    .map(activity => (
                      <li key={activity.name} className="flex justify-between">
                        <span>{activity.name}</span>
                        <span className="font-medium text-red-600">{activity.points}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h3 className="font-medium mb-2">Level Multipliers</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>AARAMBHA (Beginner)</span>
                    <span className="font-medium">x1</span>
                  </li>
                  <li className="flex justify-between">
                    <span>MADHYAMA (Intermediate)</span>
                    <span className="font-medium">x1.2</span>
                  </li>
                  <li className="flex justify-between">
                    <span>UTTHAMA (Advanced)</span>
                    <span className="font-medium">x1.5</span>
                  </li>
                  <li className="flex justify-between">
                    <span>VIDHWATH (Expert)</span>
                    <span className="font-medium">x2</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PointsManagement;
