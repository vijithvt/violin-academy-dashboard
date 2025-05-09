
import { useState } from "react";
import { Calendar as CalendarIcon, Filter } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

interface AttendanceFiltersProps {
  onFilterChange: (filters: any) => void;
}

const AttendanceFilters = ({ onFilterChange }: AttendanceFiltersProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [level, setLevel] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const handleLevelChange = (value: string) => {
    setLevel(value);
    onFilterChange({ level: value });
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onFilterChange({ student: e.target.value || "all" });
  };
  
  const handleDateChange = (date: Date | undefined, isStart: boolean) => {
    if (isStart) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    
    if (startDate && endDate) {
      onFilterChange({ startDate, endDate });
    }
  };
  
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="justify-start">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "MMM dd") : "Start date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={(date) => handleDateChange(date, true)}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="justify-start">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, "MMM dd") : "End date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={(date) => handleDateChange(date, false)}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-gray-400" />
        <Select value={level} onValueChange={handleLevelChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Aarambha">Aarambha</SelectItem>
            <SelectItem value="Madhyama">Madhyama</SelectItem>
            <SelectItem value="Utthama">Utthama</SelectItem>
            <SelectItem value="Vidhwath">Vidhwath</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="relative flex-1 min-w-[200px]">
        <Input
          type="search"
          placeholder="Search student..."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-8"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default AttendanceFilters;
