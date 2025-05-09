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
  points: z.number().int().min(-1000, {
    message: "Points must be at least -1000.",
  }).max(1000, {
    message: "Points must be at most 1000.",
  }),
});

const PointsManagement = () => {
  const [showAddPoints, setShowAddPoints] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: students, isLoading: isLoadingStudents } = useStudents();
  const { toast } = useToast();
  const [selectedStudentId, setSelectedStudentId] = useState<string | undefined>(
    undefined
  );

  const { data: studentPoints, isLoading: isLoadingPoints } = useStudentPoints(
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
    if (students && students.length > 0) {
      form.setValue("studentId", students[0].id);
      setSelectedStudentId(students[0].id);
    }
  }, [students, form]);

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Points Management</h2>
        <Button onClick={() => setShowAddPoints(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Points
        </Button>
      </div>

      {/* Points Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-md p-4 shadow-sm">
          <h3 className="text-lg font-semibold">Total Students:</h3>
          <p className="text-2xl font-bold text-gray-800">
            {students ? students.length : "Loading..."}
          </p>
        </div>

        <div className="bg-white rounded-md p-4 shadow-sm">
          <h3 className="text-lg font-semibold">Total Points Awarded:</h3>
          <p className="text-2xl font-bold text-gray-800">
            {studentPoints
              ? studentPoints.reduce(
                  (acc, point) => acc + point.points_change,
                  0
                )
              : "Loading..."}
          </p>
        </div>

        <div className="bg-white rounded-md p-4 shadow-sm">
          <h3 className="text-lg font-semibold">Average Points per Student:</h3>
          <p className="text-2xl font-bold text-gray-800">
            {students && studentPoints
              ? (
                  studentPoints.reduce(
                    (acc, point) => acc + point.points_change,
                    0
                  ) / students.length
                ).toFixed(2)
              : "Loading..."}
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
                        <SelectItem value="" disabled className="text-gray-400">
                          Select a student
                        </SelectItem>
                        {students?.map((student) => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.name}
                          </SelectItem>
                        ))}
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
                        <SelectItem value="" disabled className="text-gray-400">
                          Select an activity
                        </SelectItem>
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
            {students?.find((student) => student.id === selectedStudentId)?.name}
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
                <TableCell colSpan={3} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            )}
            {!isLoadingPoints && studentPoints && studentPoints.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No points history found.
                </TableCell>
              </TableRow>
            )}
            {!isLoadingPoints &&
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
