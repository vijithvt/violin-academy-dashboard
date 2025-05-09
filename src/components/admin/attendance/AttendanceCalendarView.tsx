
import { useState } from "react";
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay,
  addMonths,
  subMonths,
  getDay
} from "date-fns";
import { ChevronLeft, ChevronRight, Calendar, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { AttendanceStatus } from "@/api/adminService/types";

// Mock data for student attendance - will be replaced with API data
interface StudentAttendance {
  id: string;
  name: string;
  status: AttendanceStatus;
}

interface DateAttendanceSummary {
  present: number;
  absent: number;
  late: number;
  total: number;
}

// Function to get mock attendance for a specific day
const getMockAttendanceForDay = (date: Date): StudentAttendance[] => {
  // This would be replaced by real data from API
  const statuses: AttendanceStatus[] = ["present", "absent", "late"];
  const students = [
    { id: "1", name: "Arjun Kumar" },
    { id: "2", name: "Priya Sharma" },
    { id: "3", name: "Vikram Singh" },
    { id: "4", name: "Neha Patel" },
    { id: "5", name: "Rahul Gupta" }
  ];

  return students.map(student => {
    const dateNum = date.getDate();
    const studentNum = parseInt(student.id);
    const statusIndex = (dateNum + studentNum) % 3;
    
    return {
      id: student.id,
      name: student.name,
      status: statuses[statusIndex]
    };
  });
};

// Function to get attendance summary for a day
const getAttendanceSummary = (attendanceList: StudentAttendance[]): DateAttendanceSummary => {
  return attendanceList.reduce((summary, student) => {
    summary[student.status]++;
    summary.total++;
    return summary;
  }, { present: 0, absent: 0, late: 0, total: 0 });
};

// Get emoji for attendance status
const getStatusEmoji = (status: AttendanceStatus): string => {
  switch (status) {
    case "present": return "✅";
    case "absent": return "❌";
    case "late": return "🕒";
    default: return "";
  }
};

// Get badge color for attendance status
const getStatusBadgeColor = (status: AttendanceStatus): string => {
  switch (status) {
    case "present": return "bg-green-100 text-green-800";
    case "absent": return "bg-red-100 text-red-800";
    case "late": return "bg-amber-100 text-amber-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

interface AttendanceCalendarViewProps {
  filters: {
    level: string;
    student: string;
  };
}

const AttendanceCalendarView = ({ filters }: AttendanceCalendarViewProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Calculate calendar days for current month
  const firstDayCurrentMonth = startOfMonth(currentDate);
  const lastDayCurrentMonth = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: firstDayCurrentMonth, end: lastDayCurrentMonth });
  
  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  
  return (
    <div className="border rounded-md p-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">
          {format(currentDate, "MMMM yyyy")}
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={previousMonth}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentDate(new Date())}
          >
            <Calendar className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextMonth}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {/* Empty cells before the first day of the month */}
        {Array.from({ length: getDay(firstDayCurrentMonth) }).map((_, index) => (
          <div key={`empty-${index}`} className="h-24 border rounded-md bg-gray-50"></div>
        ))}
        
        {/* Calendar days */}
        {days.map((day) => {
          // Get mock attendance data for this day
          const attendanceList = getMockAttendanceForDay(day);
          const summary = getAttendanceSummary(attendanceList);
          
          return (
            <HoverCard key={day.toString()} openDelay={300}>
              <HoverCardTrigger asChild>
                <div 
                  className={cn(
                    "h-24 border rounded-md p-1 overflow-hidden hover:bg-gray-50 transition-colors",
                    isSameMonth(day, currentDate) ? "bg-white" : "bg-gray-50 text-gray-400"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <span className={cn(
                      "text-sm font-medium",
                      isSameDay(day, new Date()) && "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center"
                    )}>
                      {format(day, "d")}
                    </span>
                    <HelpCircle className="h-3 w-3 text-gray-300" />
                  </div>
                  
                  {/* Attendance summary */}
                  <div className="mt-2">
                    {summary.total > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {summary.present > 0 && (
                          <Badge variant="outline" className="bg-green-50 text-xs">
                            ✅ {summary.present}
                          </Badge>
                        )}
                        {summary.absent > 0 && (
                          <Badge variant="outline" className="bg-red-50 text-xs">
                            ❌ {summary.absent}
                          </Badge>
                        )}
                        {summary.late > 0 && (
                          <Badge variant="outline" className="bg-amber-50 text-xs">
                            🕒 {summary.late}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-0">
                <div className="p-2 border-b">
                  <h4 className="font-semibold">{format(day, "EEEE, MMMM d, yyyy")}</h4>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline" className="bg-green-50">✅ {summary.present}</Badge>
                    <Badge variant="outline" className="bg-red-50">❌ {summary.absent}</Badge>
                    <Badge variant="outline" className="bg-amber-50">🕒 {summary.late}</Badge>
                  </div>
                </div>
                <div className="p-2 max-h-60 overflow-auto space-y-1">
                  {attendanceList.map((attendance) => (
                    <div key={attendance.id} className="flex items-center justify-between py-1">
                      <span>{attendance.name}</span>
                      <Badge variant="outline" className={getStatusBadgeColor(attendance.status)}>
                        {getStatusEmoji(attendance.status)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </HoverCardContent>
            </HoverCard>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceCalendarView;
