
import { useState, useEffect } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval,
  getDay,
  addDays
} from 'date-fns';
import { cn } from '@/lib/utils';
import { Check, X, Clock } from 'lucide-react';

interface AttendanceCalendarViewProps {
  currentMonth: Date;
  filters: {
    level: string;
    course: string;
    status: string;
  };
}

interface AttendanceRecord {
  date: string;
  student: string;
  status: 'present' | 'absent' | 'late';
}

// Sample data - in a real app, this would come from your API/database
const sampleAttendance: AttendanceRecord[] = [
  { date: '2023-06-01', student: 'Arjun Kumar', status: 'present' },
  { date: '2023-06-02', student: 'Arjun Kumar', status: 'present' },
  { date: '2023-06-05', student: 'Arjun Kumar', status: 'absent' },
  { date: '2023-06-08', student: 'Arjun Kumar', status: 'late' },
  { date: '2023-06-12', student: 'Arjun Kumar', status: 'present' },
  { date: '2023-06-15', student: 'Arjun Kumar', status: 'present' },
];

const AttendanceCalendarView = ({ currentMonth, filters }: AttendanceCalendarViewProps) => {
  const [days, setDays] = useState<Date[]>([]);
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);

  // Get all days in the current month
  useEffect(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    setDays(daysInMonth);
  }, [currentMonth]);

  // Filter attendance data based on filters
  useEffect(() => {
    // In a real app, you'd fetch data from your API here
    // For now, we'll just use the sample data
    setAttendanceData(sampleAttendance);
  }, [filters]);

  // Helper function to get the status class for a day
  const getStatusClass = (day: Date) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const record = attendanceData.find(a => a.date === dateStr);
    
    if (!record) return 'bg-gray-100';
    
    switch (record.status) {
      case 'present':
        return 'bg-green-100 hover:bg-green-200';
      case 'absent':
        return 'bg-red-100 hover:bg-red-200';
      case 'late':
        return 'bg-amber-100 hover:bg-amber-200';
      default:
        return 'bg-gray-100';
    }
  };

  // Helper function to get the status icon for a day
  const getStatusIcon = (day: Date) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const record = attendanceData.find(a => a.date === dateStr);
    
    if (!record) return null;
    
    switch (record.status) {
      case 'present':
        return <Check size={14} className="text-green-600" />;
      case 'absent':
        return <X size={14} className="text-red-600" />;
      case 'late':
        return <Clock size={14} className="text-amber-600" />;
      default:
        return null;
    }
  };

  // Generate the calendar grid
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Get offset for the first day of the month
  const firstDayOfMonth = startOfMonth(currentMonth);
  const startOffset = getDay(firstDayOfMonth); // 0 for Sunday, 1 for Monday, etc.
  
  // Create calendar days including offset days
  const calendarDays: (Date | null)[] = [];
  
  // Add offset days as null
  for (let i = 0; i < startOffset; i++) {
    calendarDays.push(null);
  }
  
  // Add actual days of the month
  days.forEach(day => {
    calendarDays.push(day);
  });

  return (
    <div className="rounded-md border p-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {/* Render weekday headers */}
        {weekdays.map(day => (
          <div 
            key={day} 
            className="p-2 text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
        
        {/* Render calendar days */}
        {calendarDays.map((day, index) => day ? (
          <div 
            key={index}
            className={cn(
              "p-2 border rounded-md cursor-pointer text-center hover:shadow-sm transition-all flex flex-col items-center justify-center min-h-12",
              getStatusClass(day)
            )}
          >
            <span className="text-sm font-medium">
              {format(day, 'd')}
            </span>
            <div className="mt-1">
              {getStatusIcon(day)}
            </div>
          </div>
        ) : (
          <div 
            key={index}
            className="p-2 text-center text-gray-300"
          >
            {/* Empty cell for offset days */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceCalendarView;
