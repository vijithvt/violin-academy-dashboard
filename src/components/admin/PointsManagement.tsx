
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast, Toaster } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Spinner } from "@/components/ui/spinner";
import {
  useStudents,
  useStudentPoints,
  addPointsToStudent,
} from "@/api/adminService";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const formSchema = z.object({
  studentId: z.string().min(1, {
    message: "Please select a student.",
  }),
  activity: z.string().min(2, {
    message: "Activity must be at least 2 characters.",
  }),
  points: z.coerce.number().int().min(-1000, {
    message: "Points must be at least -1000.",
  }).max(1000, {
    message: "Points must be at most 1000.",
  }),
});

const PointsManagement = () => {
  const [showAddPoints, setShowAddPoints] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: students, isLoading: isLoadingStudents, error: studentsError, refetch: refetchStudents } = useStudents();
  const { toast } = useToast();
  const [selectedStudentId, setSelectedStudentId] = useState<string | undefined>(
    undefined
  );

  const { data: studentPoints, isLoading: isLoadingPoints, error: pointsError, refetch: refetchPoints } = useStudentPoints(
    selectedStudentId
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: "",
      activity: "",
      points: 0,
    },
  });

  useEffect(() => {
    if (studentsError) {
      toast({
        variant: "destructive",
        title: "Error loading students",
        description: studentsError.message,
      });
    }
    
    if (pointsError) {
      toast({
        variant: "destructive",
        title: "Error loading points",
        description: pointsError.message,
      });
    }
  }, [studentsError, pointsError, toast]);

  useEffect(() => {
    if (students && students.length > 0) {
      form.setValue("studentId", students[0].id);
      setSelectedStudentId(students[0].id);
    }
  }, [students, form]);

  const handleRefresh = () => {
    refetchStudents();
    refetchPoints();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      await addPointsToStudent(
        values.studentId,
        values.points,
        values.activity
      );
      toast({
        title: "Success!",
        description: "Points added successfully.",
      });
      form.reset();
      setShowAddPoints(false);
      refetchPoints();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPoints = studentPoints
    ? studentPoints.reduce((acc, point) => acc + point.points_change, 0)
    : 0;
    
  const avgPointsPerStudent = students && students.length > 0
    ? (totalPoints / students.length).toFixed(2)
    : "0.00";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Points Management</h2>
        <div className="space-x-2">
          <Button onClick={handleRefresh} variant="outline">
            Refresh Data
          </Button>
          <Button onClick={() => setShowAddPoints(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Points
          </Button>
        </div>
      </div>

      {/* Points Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-md p-4 shadow-sm">
          <h3 className="text-lg font-semibold">Total Students:</h3>
          <p className="text-2xl font-bold text-gray-800">
            {isLoadingStudents ? (
              <span className="flex items-center"><Spinner className="mr-2" /> Loading...</span>
            ) : studentsError ? (
              <span className="text-red-500">Error loading data</span>
            ) : (
              students ? students.length : "0"
            )}
          </p>
        </div>

        <div className="bg-white rounded-md p-4 shadow-sm">
          <h3 className="text-lg font-semibold">Total Points Awarded:</h3>
          <p className="text-2xl font-bold text-gray-800">
            {isLoadingPoints ? (
              <span className="flex items-center"><Spinner className="mr-2" /> Loading...</span>
            ) : pointsError ? (
              <span className="text-red-500">Error loading data</span>
            ) : (
              totalPoints
            )}
          </p>
        </div>

        <div className="bg-white rounded-md p-4 shadow-sm">
          <h3 className="text-lg font-semibold">Average Points per Student:</h3>
          <p className="text-2xl font-bold text-gray-800">
            {isLoadingStudents || isLoadingPoints ? (
              <span className="flex items-center"><Spinner className="mr-2" /> Loading...</span>
            ) : studentsError || pointsError ? (
              <span className="text-red-500">Error loading data</span>
            ) : (
              avgPointsPerStudent
            )}
          </p>
        </div>
      </div>

      {/* Add Points Dialog */}
      <Dialog open={showAddPoints} onOpenChange={setShowAddPoints}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Student Points</DialogTitle>
            <DialogDescription>
              Award points to students for their achievements and progress.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedStudentId(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a student" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoadingStudents ? (
                          <SelectItem value="loading" disabled>Loading students...</SelectItem>
                        ) : studentsError ? (
                          <SelectItem value="error" disabled>Error loading students</SelectItem>
                        ) : students?.length === 0 ? (
                          <SelectItem value="none" disabled>No students found</SelectItem>
                        ) : (
                          students?.map((student) => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="activity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an activity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Weekly Practice Completed">
                          Weekly Practice Completed
                        </SelectItem>
                        <SelectItem value="New Raga Learned">
                          New Raga Learned
                        </SelectItem>
                        <SelectItem value="Assignment Completed">
                          Assignment Completed
                        </SelectItem>
                        <SelectItem value="Performance">Performance</SelectItem>
                        <SelectItem value="Monthly Assessment">
                          Monthly Assessment
                        </SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="points"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Points</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? ""
                              : parseInt(e.target.value, 10)
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Points can be positive or negative values
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setShowAddPoints(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Spinner /> : "Save"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Student Points Table */}
      <div className="rounded-md border">
        <Table>
          <TableCaption>
            Student Points History -{" "}
            {students?.find((student) => student.id === selectedStudentId)?.name || "Select a student"}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Activity</TableHead>
              <TableHead>Points Change</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingPoints && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center">
                    <Spinner className="h-8 w-8 mb-2" />
                    <span>Loading points data...</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {!isLoadingPoints && pointsError && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8">
                  <div className="text-red-500 flex flex-col items-center">
                    <span className="font-bold mb-2">Error loading points data</span>
                    <Button variant="outline" onClick={handleRefresh}>Try Again</Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {!isLoadingPoints && !pointsError && studentPoints && studentPoints.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8">
                  <span className="text-gray-500">No points history found for this student.</span>
                </TableCell>
              </TableRow>
            )}
            {!isLoadingPoints &&
              !pointsError &&
              studentPoints &&
              studentPoints.map((point) => (
                <TableRow key={point.id}>
                  <TableCell>{point.activity}</TableCell>
                  <TableCell>{point.points_change}</TableCell>
                  <TableCell>
                    {new Date(point.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <Toaster />
    </div>
  );
};

export default PointsManagement;
