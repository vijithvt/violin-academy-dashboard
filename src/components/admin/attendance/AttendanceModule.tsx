
import { useState } from 'react';
import { addMonths, subMonths, format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AttendanceFilters from './AttendanceFilters';
import AttendanceCalendarView from './AttendanceCalendarView';
import AttendanceTableView from './AttendanceTableView';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AttendanceModule = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<'calendar' | 'table'>('calendar');
  const [filters, setFilters] = useState({
    level: 'all',
    course: 'all',
    status: 'all',
  });

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Management</CardTitle>
        <CardDescription>Track and manage student attendance.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={prevMonth}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Prev
            </Button>
            <Button variant="outline" size="sm" onClick={nextMonth}>
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <span>{format(currentMonth, 'MMMM yyyy')}</span>
          </div>
          <AttendanceFilters setFilters={setFilters} />
        </div>

        <Tabs defaultValue="calendar" className="space-y-4" onValueChange={(value) => setView(value as 'calendar' | 'table')}>
          <TabsList>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>
          <TabsContent value="calendar">
            <AttendanceCalendarView currentMonth={currentMonth} filters={filters} />
          </TabsContent>
          <TabsContent value="table">
            <AttendanceTableView currentMonth={currentMonth} filters={filters} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AttendanceModule;
