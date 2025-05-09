
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface AttendanceFiltersProps {
  setFilters: (filters: { level: string; course: string; status: string }) => void;
}

const AttendanceFilters = ({ setFilters }: AttendanceFiltersProps) => {
  const [level, setLevel] = useState("all");
  const [course, setCourse] = useState("all");
  const [status, setStatus] = useState("all");

  const handleLevelChange = (value: string) => {
    setLevel(value);
    setFilters({ level: value, course, status });
  };

  const handleCourseChange = (value: string) => {
    setCourse(value);
    setFilters({ level, course: value, status });
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setFilters({ level, course, status: value });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Select value={level} onValueChange={handleLevelChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          <SelectItem value="AARAMBHA">AARAMBHA (Beginner)</SelectItem>
          <SelectItem value="MADHYAMA">MADHYAMA (Intermediate)</SelectItem>
          <SelectItem value="UTTHAMA">UTTHAMA (Advanced)</SelectItem>
          <SelectItem value="VIDHWATH">VIDHWATH (Professional)</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={course} onValueChange={handleCourseChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Course" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Courses</SelectItem>
          <SelectItem value="violin">Carnatic Violin</SelectItem>
          <SelectItem value="vocal">Carnatic Vocal</SelectItem>
          <SelectItem value="veena">Veena</SelectItem>
          <SelectItem value="mridangam">Mridangam</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={status} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="present">Present</SelectItem>
          <SelectItem value="absent">Absent</SelectItem>
          <SelectItem value="late">Late</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AttendanceFilters;
