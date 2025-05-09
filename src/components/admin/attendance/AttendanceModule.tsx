
import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths } from "date-fns";
import { Calendar, Table } from "lucide-react";
import { Button } from "@/components/ui/button";
import AttendanceCalendarView from "./AttendanceCalendarView";
import AttendanceTableView from "./AttendanceTableView";
import AttendanceFilters from "./AttendanceFilters";
import { useToast } from "@/hooks/use-toast";

const VIEW_TYPES = {
  CALENDAR: "calendar",
  TABLE: "table",
};

const AttendanceModule = () => {
  const [viewType, setViewType] = useState(VIEW_TYPES.CALENDAR);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [filters, setFilters] = useState({
    level: "all",
    student: "all",
  });
  
  const { toast } = useToast();
  
  const dateRange = {
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  };
  
  const daysInMonth = eachDayOfInterval({
    start: dateRange.start,
    end: dateRange.end,
  });
  
  const handlePreviousMonth = () => {
    setCurrentMonth(prevMonth => subMonths(prevMonth, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => addMonths(prevMonth, 1));
  };
  
  const handleExport = (format: 'pdf' | 'csv') => {
    toast({
      title: "Exporting Attendance Report",
      description: `Your ${format.toUpperCase()} report is being prepared...`,
    });
    
    // TODO: Implement actual export functionality
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `Your ${format.toUpperCase()} report is ready to download.`,
      });
    }, 2000);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          Attendance for {format(currentMonth, "MMMM yyyy")}
        </h2>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={handleNextMonth}>
            Next
          </Button>
        </div>
      </div>
      
      <div className="flex justify-between items-center flex-wrap gap-4">
        <AttendanceFilters 
          onFilterChange={(newFilters) => setFilters({ ...filters, ...newFilters })}
        />
        
        <div className="flex gap-2">
          <Button
            variant={viewType === VIEW_TYPES.CALENDAR ? "default" : "outline"}
            size="sm"
            onClick={() => setViewType(VIEW_TYPES.CALENDAR)}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Calendar
          </Button>
          <Button
            variant={viewType === VIEW_TYPES.TABLE ? "default" : "outline"}
            size="sm"
            onClick={() => setViewType(VIEW_TYPES.TABLE)}
          >
            <Table className="h-4 w-4 mr-1" />
            Table
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('pdf')}
          >
            Export PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('csv')}
          >
            Export CSV
          </Button>
        </div>
      </div>
      
      <div className="transition-opacity duration-300 ease-in-out">
        {viewType === VIEW_TYPES.CALENDAR ? (
          <AttendanceCalendarView 
            days={daysInMonth}
            currentMonth={currentMonth}
            filters={filters}
          />
        ) : (
          <AttendanceTableView
            days={daysInMonth}
            filters={filters}
          />
        )}
      </div>
    </div>
  );
};

export default AttendanceModule;
