
import { useState } from "react";
import { format, isSameDay } from "date-fns";
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  X,
  Users,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

export interface AttendanceCalendarViewProps {
  currentMonth: Date;
  filters: {
    level: string;
    student: string;
  };
  days: Date[];
}

// Helper function for getting attendance summary for a day
const getSummary = (date: Date) => {
  // This would normally be fetched from a backend
  // Mock data for demonstration purposes
  if (date.getDay() === 1) return { present: 12, absent: 2, late: 1 };
  if (date.getDay() === 3) return { present: 10, absent: 4, late: 1 };
  if (date.getDay() === 5) return { present: 11, absent: 1, late: 3 };
  return { present: 0, absent: 0, late: 0 };
};

// Mock function to get student attendance for a specific day
const getStudentsForDay = (date: Date) => {
  // This would normally be fetched from a backend
  return [
    { id: "1", name: "Alice Johnson", status: "present" },
    { id: "2", name: "Bob Smith", status: "absent" },
    { id: "3", name: "Charlie Brown", status: "late" },
    { id: "4", name: "Diana Prince", status: "present" },
  ];
};

const AttendanceCalendarView = ({
  days,
  currentMonth,
  filters
}: AttendanceCalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  // Function to get status badge style
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return (
          <div className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Present
          </div>
        );
      case "absent":
        return (
          <div className="inline-flex items-center bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded">
            <X className="h-3 w-3 mr-1" />
            Absent
          </div>
        );
      case "late":
        return (
          <div className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded">
            <Clock className="h-3 w-3 mr-1" />
            Late
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex items-center">
        <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
        <h3 className="text-lg font-medium">
          Attendance Calendar: {format(currentMonth, "MMMM yyyy")}
        </h3>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}

        {days.map((day, dayIdx) => {
          const summary = getSummary(day);
          const isToday = isSameDay(day, new Date());
          const hasAttendance = summary.present > 0 || summary.absent > 0 || summary.late > 0;

          return (
            <HoverCard key={dayIdx} openDelay={200}>
              <HoverCardTrigger asChild>
                <div
                  onClick={() => handleDateClick(day)}
                  className={cn(
                    "h-24 p-2 bg-white border border-transparent hover:border-blue-200 hover:bg-blue-50 transition-colors cursor-pointer",
                    isToday && "bg-blue-50",
                    selectedDate && isSameDay(day, selectedDate) && "ring-2 ring-blue-500"
                  )}
                >
                  <div className="flex justify-between">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isToday ? "text-blue-600" : "text-gray-700"
                      )}
                    >
                      {format(day, "d")}
                    </span>
                    {hasAttendance && (
                      <div className="flex items-center">
                        <Users className="h-3 w-3 text-gray-400" />
                        <span className="text-xs ml-1 text-gray-500">
                          {summary.present + summary.absent + summary.late}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Attendance indicators */}
                  {hasAttendance && (
                    <div className="mt-2 flex gap-1 flex-wrap">
                      {summary.present > 0 && (
                        <div className="bg-green-400 h-2 w-2 rounded-full" title={`${summary.present} present`} />
                      )}
                      {summary.absent > 0 && (
                        <div className="bg-red-400 h-2 w-2 rounded-full" title={`${summary.absent} absent`} />
                      )}
                      {summary.late > 0 && (
                        <div className="bg-yellow-400 h-2 w-2 rounded-full" title={`${summary.late} late`} />
                      )}
                    </div>
                  )}
                </div>
              </HoverCardTrigger>
              <HoverCardContent
                className="w-80 p-0"
                align="start"
                sideOffset={5}
                side="right"
              >
                <div className="p-3 border-b bg-gray-50">
                  <h4 className="font-medium">
                    Attendance for {format(day, "MMM d, yyyy")}
                  </h4>
                </div>
                <div className="p-3 max-h-80 overflow-y-auto">
                  <h5 className="text-sm font-medium text-gray-500 mb-2">
                    Students: {summary.present + summary.absent + summary.late}
                  </h5>
                  <div className="space-y-2">
                    {getStudentsForDay(day).map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{student.name}</span>
                        {getStatusBadge(student.status)}
                      </div>
                    ))}
                  </div>
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
