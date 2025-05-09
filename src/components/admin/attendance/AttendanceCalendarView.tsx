
import { useState } from "react";
import { format, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AttendanceCalendarViewProps {
  days: Date[];
  currentMonth: Date;
  filters: {
    level: string;
    student: string;
  };
}

interface StudentAttendance {
  id: string;
  name: string;
  status: "present" | "absent" | "late";
}

// Mock data - replace with actual data from API
const getMockAttendanceForDate = (date: Date): StudentAttendance[] => {
  // Generate random attendance data for demo
  const statuses: ("present" | "absent" | "late")[] = ["present", "absent", "late"];
  const names = [
    "Arjun Kumar", "Priya Sharma", "Vikram Singh", "Neha Patel",
    "Rahul Gupta", "Ananya Desai", "Ravi Verma", "Meera Nair"
  ];
  
  const dayOfMonth = date.getDate();
  const count = 5 + (dayOfMonth % 4); // Between 5-8 students
  
  return Array.from({ length: count }, (_, i) => ({
    id: `student-${i}`,
    name: names[i % names.length],
    status: statuses[(i + dayOfMonth) % 3]
  }));
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
    case "present": return "bg-green-100 text-green-800";
    case "absent": return "bg-red-100 text-red-800";
    case "late": return "bg-amber-100 text-amber-800";
    default: return "";
  }
};

const AttendanceCalendarView = ({ days, currentMonth, filters }: AttendanceCalendarViewProps) => {
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  
  // Generate all days including blanks for the calendar grid
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const dayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const blanks = Array(dayOfWeek).fill(null);
  
  const allDays = [...blanks, ...days];
  
  // Calculate summary for a day
  const getSummary = (date: Date) => {
    const attendance = getMockAttendanceForDate(date);
    const presentCount = attendance.filter(a => a.status === "present").length;
    const absentCount = attendance.filter(a => a.status === "absent").length;
    const lateCount = attendance.filter(a => a.status === "late").length;
    
    return { presentCount, absentCount, lateCount, total: attendance.length };
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="grid grid-cols-7 gap-1 mb-2 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day} className="font-bold text-sm py-2">{day}</div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {allDays.map((day, index) => (
          <div key={index} className="aspect-square">
            {day ? (
              <Popover>
                <PopoverTrigger asChild>
                  <div
                    className={cn(
                      "h-full p-1 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors",
                      isToday(day) && "border-blue-500 bg-blue-50"
                    )}
                  >
                    <div className="text-xs font-medium mb-1">{format(day, "d")}</div>
                    <AttendanceDaySummary date={day} />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-0 animate-in fade-in-0 zoom-in-95">
                  <div className="p-4">
                    <h4 className="font-bold mb-2">{format(day, "EEEE, MMMM d")}</h4>
                    <AttendanceDayDetail date={day} />
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <div className="h-full border border-transparent"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Component for showing summary (tiny icons) in calendar cell
const AttendanceDaySummary = ({ date }: { date: Date }) => {
  const summary = getSummary(date);
  
  return (
    <div className="flex flex-wrap gap-1 justify-center items-center">
      {summary.presentCount > 0 && (
        <span className="inline-block h-2 w-2 rounded-full bg-green-500" title={`${summary.presentCount} present`}></span>
      )}
      {summary.lateCount > 0 && (
        <span className="inline-block h-2 w-2 rounded-full bg-amber-500" title={`${summary.lateCount} late`}></span>
      )}
      {summary.absentCount > 0 && (
        <span className="inline-block h-2 w-2 rounded-full bg-red-500" title={`${summary.absentCount} absent`}></span>
      )}
    </div>
  );
};

// Component for showing detailed attendance in popover
const AttendanceDayDetail = ({ date }: { date: Date }) => {
  const attendance = getMockAttendanceForDate(date);
  
  return (
    <div className="max-h-64 overflow-y-auto">
      <ul className="space-y-1">
        {attendance.map((student) => (
          <li 
            key={student.id}
            className={cn(
              "px-2 py-1 rounded text-sm flex items-center justify-between",
              getStatusClass(student.status)
            )}
          >
            <span>{student.name}</span>
            <span>{getStatusEmoji(student.status)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceCalendarView;
