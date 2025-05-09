
import { useState } from "react";
import { format, startOfWeek, addDays, isToday, isValid } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check, X, Clock } from "lucide-react";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { motion } from "framer-motion";

export interface AttendanceCalendarViewProps {
  currentMonth: Date;
  filters: {
    level: string;
    student: string;
  };
}

// Define a type for the attendance summary
interface AttendanceSummary {
  present: number;
  absent: number;
  late: number;
  studentCount: number;
}

// Sample data for demonstration
const getSampleData = () => {
  // Generate 30 days of data with random statuses
  const sampleData: Record<string, AttendanceSummary> = {};
  
  const startDate = new Date();
  startDate.setDate(1); // Start from the 1st of current month
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    if (date.getMonth() === startDate.getMonth()) {
      const dateString = format(date, "yyyy-MM-dd");
      
      // Random number of students (between 10-20)
      const studentCount = Math.floor(Math.random() * 11) + 10;
      
      // Random attendance with reasonable distribution
      const present = Math.floor(Math.random() * (studentCount - 2)) + 1;
      const absent = Math.floor(Math.random() * (studentCount - present - 1)) + 1;
      const late = studentCount - present - absent;
      
      sampleData[dateString] = {
        present,
        absent,
        late,
        studentCount
      };
    }
  }
  
  return sampleData;
};

export const AttendanceCalendarView = ({ currentMonth, filters }: AttendanceCalendarViewProps) => {
  const [attendanceData] = useState(getSampleData());
  
  // Function to get attendance summary for a specific date
  const getSummary = (date: Date): AttendanceSummary | undefined => {
    if (!isValid(date)) return undefined;
    
    const dateString = format(date, "yyyy-MM-dd");
    return attendanceData[dateString];
  };
  
  // Configure the calendar grid
  const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday as start of week
  
  // Generate calendar rows
  const rows = [];
  let days = [];
  let day = startDate;
  
  // Header row with day names
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Generate 6 weeks to cover the month
  for (let i = 0; i < 42; i++) {
    // Format the current day
    const formattedDate = format(day, "d");
    const dateString = format(day, "yyyy-MM-dd");
    const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
    
    // Get attendance summary
    const summary = getSummary(day);
    
    days.push(
      <div
        key={i}
        className={`relative h-24 border p-1 ${
          !isCurrentMonth ? "bg-gray-100" : isToday(day) ? "bg-blue-50 border-blue-500" : "bg-white"
        } ${i % 7 === 6 ? "border-r" : ""}`}
      >
        <div className={`text-right ${!isCurrentMonth ? "text-gray-400" : ""}`}>
          {formattedDate}
        </div>
        
        {isCurrentMonth && summary && (
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="mt-2 flex flex-col items-center cursor-default">
                <motion.div 
                  className="flex gap-1 flex-wrap justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.01 }}
                >
                  {summary.present > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs bg-green-500 text-white">
                      {summary.present}
                    </span>
                  )}
                  {summary.absent > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs bg-red-500 text-white">
                      {summary.absent}
                    </span>
                  )}
                  {summary.late > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs bg-amber-500 text-white">
                      {summary.late}
                    </span>
                  )}
                </motion.div>
                <div className="text-xs text-gray-500 mt-1">{summary.studentCount} students</div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-72 p-0">
              <div className="p-4">
                <h4 className="font-semibold">{format(day, "EEEE, MMMM d, yyyy")}</h4>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-1" />
                      <span>Present:</span>
                    </div>
                    <span className="font-medium">{summary.present} students</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <X className="h-4 w-4 text-red-500 mr-1" />
                      <span>Absent:</span>
                    </div>
                    <span className="font-medium">{summary.absent} students</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-amber-500 mr-1" />
                      <span>Late:</span>
                    </div>
                    <span className="font-medium">{summary.late} students</span>
                  </div>
                </div>
              </div>
              <div className="border-t p-4 bg-gray-50">
                <Button size="sm" className="w-full">View Details</Button>
              </div>
            </HoverCardContent>
          </HoverCard>
        )}
      </div>
    );
    
    // Add a new row after 7 days
    if ((i + 1) % 7 === 0) {
      rows.push(<div key={`row-${i}`} className="grid grid-cols-7">{days}</div>);
      days = [];
    }
    
    // Move to the next day
    day = addDays(day, 1);
  }

  // Calendar animation variants
  const calendarVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.05 
      }
    }
  };
  
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-medium">Attendance Calendar</h3>
        <div className="text-sm text-gray-500">
          <span className="mr-4">Level: {filters.level || "All"}</span>
          <span>Student: {filters.student || "All"}</span>
        </div>
      </div>
      <motion.div 
        className="p-2"
        initial="hidden"
        animate="visible"
        variants={calendarVariants}
      >
        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center font-medium py-2">{day}</div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <motion.div className="space-y-1" variants={rowVariants}>
          {rows}
        </motion.div>
        
        {/* Legend */}
        <div className="mt-4 pt-2 border-t flex justify-center gap-4 text-xs">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span>
            <span>Present</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1"></span>
            <span>Absent</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-1"></span>
            <span>Late</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
