
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

interface AttendanceTableViewProps {
  days: Date[];
  filters: {
    level: string;
    student: string;
  };
}

interface Student {
  id: string;
  name: string;
}

// Mock student data - replace with actual data from API
const mockStudents: Student[] = [
  { id: "1", name: "Arjun Kumar" },
  { id: "2", name: "Priya Sharma" },
  { id: "3", name: "Vikram Singh" },
  { id: "4", name: "Neha Patel" },
  { id: "5", name: "Rahul Gupta" }
];

// Generate mock attendance data
const getMockAttendanceStatus = (studentId: string, date: Date): "present" | "absent" | "late" => {
  const statuses: ("present" | "absent" | "late")[] = ["present", "absent", "late"];
  const dateNum = date.getDate();
  const studentNum = parseInt(studentId);
  const statusIndex = (dateNum + studentNum) % 3;
  return statuses[statusIndex];
};

// Get emoji for attendance status
const getStatusEmoji = (status: "present" | "absent" | "late"): string => {
  switch (status) {
    case "present": return "✅";
    case "absent": return "❌";
    case "late": return "🕒";
    default: return "";
  }
};

// Get class for attendance status
const getStatusClass = (status: "present" | "absent" | "late"): string => {
  switch (status) {
    case "present": return "bg-green-50 hover:bg-green-100";
    case "absent": return "bg-red-50 hover:bg-red-100";
    case "late": return "bg-amber-50 hover:bg-amber-100";
    default: return "";
  }
};

const AttendanceTableView = ({ days, filters }: AttendanceTableViewProps) => {
  // Filter the dates to show only first 10 days to avoid very wide table
  const shownDays = days.slice(0, 10);
  
  // Filter students based on filters (mock implementation)
  const filteredStudents = mockStudents;
  
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="sticky left-0 bg-white z-10">Student</TableHead>
            {shownDays.map((day) => (
              <TableHead key={day.toString()} className="text-center">
                {format(day, "d")}
                <div className="text-xs text-gray-500">
                  {format(day, "EEE")}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium sticky left-0 bg-white z-10">{student.name}</TableCell>
              {shownDays.map((day) => {
                const status = getMockAttendanceStatus(student.id, day);
                return (
                  <TableCell 
                    key={`${student.id}-${day.toString()}`}
                    className={cn(
                      "text-center transition-colors animate-[pulse_0.5s_ease-in-out]",
                      getStatusClass(status)
                    )}
                  >
                    {getStatusEmoji(status)}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendanceTableView;
