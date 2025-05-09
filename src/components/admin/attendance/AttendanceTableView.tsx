
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Check, X, Clock } from 'lucide-react';

interface AttendanceTableViewProps {
  currentMonth: Date;
  filters: {
    level: string;
    course: string;
    status: string;
  };
}

// Sample attendance data - in a real app, this would come from your database
const sampleData = [
  { id: '1', name: 'Arjun Kumar', level: 'AARAMBHA', course: 'violin', date: '2023-06-01', status: 'present' },
  { id: '2', name: 'Priya Sharma', level: 'MADHYAMA', course: 'vocal', date: '2023-06-01', status: 'absent' },
  { id: '3', name: 'Rahul Singh', level: 'UTTHAMA', course: 'violin', date: '2023-06-01', status: 'late' },
  { id: '4', name: 'Ananya Patel', level: 'AARAMBHA', course: 'veena', date: '2023-06-01', status: 'present' },
  { id: '5', name: 'Vikram Mehta', level: 'VIDHWATH', course: 'mridangam', date: '2023-06-01', status: 'absent' },
];

const AttendanceTableView = ({ currentMonth, filters }: AttendanceTableViewProps) => {
  const [filteredData, setFilteredData] = useState(sampleData);

  useEffect(() => {
    let result = sampleData;
    
    // Filter by level
    if (filters.level !== 'all') {
      result = result.filter(item => item.level === filters.level);
    }
    
    // Filter by course
    if (filters.course !== 'all') {
      result = result.filter(item => item.course === filters.course);
    }
    
    // Filter by status
    if (filters.status !== 'all') {
      result = result.filter(item => item.status === filters.status);
    }
    
    // Here you would also filter by the current month
    // This is just a placeholder - in a real app you'd parse dates properly
    
    setFilteredData(result);
  }, [filters, currentMonth]);

  // Helper function to render status badges
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <Check size={14} className="mr-1" /> Present
          </Badge>
        );
      case 'absent':
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <X size={14} className="mr-1" /> Absent
          </Badge>
        );
      case 'late':
        return (
          <Badge className="bg-amber-500 hover:bg-amber-600">
            <Clock size={14} className="mr-1" /> Late
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No attendance records found
              </TableCell>
            </TableRow>
          ) : (
            filteredData.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{format(new Date(record.date), 'dd MMM yyyy')}</TableCell>
                <TableCell className="font-medium">{record.name}</TableCell>
                <TableCell>{record.level}</TableCell>
                <TableCell className="capitalize">{record.course}</TableCell>
                <TableCell>{getStatusBadge(record.status)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendanceTableView;
