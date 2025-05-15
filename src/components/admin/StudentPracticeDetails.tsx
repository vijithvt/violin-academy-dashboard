import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { AlertCircle, Calendar, Clock, ArrowLeft, FilterX, Filter, ArrowDownUp } from "lucide-react";
import { format, parseISO, startOfWeek, endOfWeek, addDays, subDays, isWithinInterval } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type PracticeSession = {
  id: string;
  date: string;
  minutes: number;
  start_time: string | null;
  end_time: string | null;
  notes: string | null;
  created_at: string;
};

type StudentDetails = {
  id: string;
  name: string;
  email: string;
  level?: string;
};

const StudentPracticeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<PracticeSession[]>([]);
  const [student, setStudent] = useState<StudentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [sortField, setSortField] = useState<'date' | 'minutes'>('date');
  
  // Filter states
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [minDuration, setMinDuration] = useState<string>("");
  const [maxDuration, setMaxDuration] = useState<string>("");
  const [filterActive, setFilterActive] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError("No student ID provided");
        setLoading(false);
        return;
      }

      try {
        // First, get student profile information
        const { data: studentData, error: studentError } = await supabase
          .from("profiles")
          .select("id, name, email")
          .eq("id", id)
          .single();

        if (studentError) {
          throw new Error(studentError.message);
        }
        
        // Then get any additional student profile info like level
        const { data: extendedProfile, error: extendedError } = await supabase
          .from("student_profiles")
          .select("learning_level")
          .eq("user_id", id)
          .maybeSingle();
          
        let studentLevel = "Unknown";
        
        if (!extendedError && extendedProfile?.learning_level) {
          // Map learning level to display format
          switch(extendedProfile.learning_level) {
            case "beginner":
              studentLevel = "AARAMBHA (Beginner)";
              break;
            case "intermediate":
              studentLevel = "MADHYAMA (Intermediate)";
              break;
            case "advanced":
              studentLevel = "UTTHAMA (Advanced)";
              break;
            case "professional":
              studentLevel = "VIDHWATH (Professional)";
              break;
            default:
              studentLevel = extendedProfile.learning_level;
          }
        }

        // Get practice sessions
        const { data: sessions, error: sessionsError } = await supabase
          .from("practice_sessions")
          .select("*")
          .eq("user_id", id)
          .order("date", { ascending: false });

        if (sessionsError) {
          throw new Error(sessionsError.message);
        }

        setStudent({ 
          id: studentData.id, 
          name: studentData.name, 
          email: studentData.email || '', 
          level: studentLevel 
        });
        setSessions(sessions || []);
        setFilteredSessions(sessions || []);

        // Generate weekly summary data
        generateWeeklyData(sessions || []);
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError("Failed to load student data");
        toast({
          title: "Error",
          description: "Failed to load student data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, toast]);
  
  // Generate weekly practice data for the chart
  const generateWeeklyData = (practiceData: PracticeSession[]) => {
    const today = new Date();
    const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 });
    const endOfCurrentWeek = endOfWeek(today, { weekStartsOn: 1 });
    
    // Get data for last 4 weeks
    const currentWeekData = getWeekData(practiceData, startOfCurrentWeek, endOfCurrentWeek, "This Week");
    const lastWeekData = getWeekData(
      practiceData,
      subDays(startOfCurrentWeek, 7),
      subDays(endOfCurrentWeek, 7),
      "Last Week"
    );
    const twoWeeksAgoData = getWeekData(
      practiceData,
      subDays(startOfCurrentWeek, 14),
      subDays(endOfCurrentWeek, 14),
      "2 Weeks Ago"
    );
    const threeWeeksAgoData = getWeekData(
      practiceData,
      subDays(startOfCurrentWeek, 21),
      subDays(endOfCurrentWeek, 21),
      "3 Weeks Ago"
    );

    setWeeklyData([threeWeeksAgoData, twoWeeksAgoData, lastWeekData, currentWeekData]);
  };
  
  // Calculate weekly summary
  const getWeekData = (
    practiceData: PracticeSession[],
    start: Date,
    end: Date,
    label: string
  ) => {
    const filteredSessions = practiceData.filter((session) => {
      const sessionDate = new Date(session.date);
      return isWithinInterval(sessionDate, { start, end });
    });
    
    const totalMinutes = filteredSessions.reduce((sum, session) => sum + session.minutes, 0);
    const sessionsCount = filteredSessions.length;
    
    return {
      week: label,
      minutes: totalMinutes,
      sessions: sessionsCount,
    };
  };

  
  // Calculate total practice time
  const calculateTotalHours = (sessions: PracticeSession[]) => {
    const totalMinutes = sessions.reduce((sum, session) => sum + session.minutes, 0);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };
  
  // Sort sessions based on current sort state
  const sortSessions = (data: PracticeSession[]) => {
    return [...data].sort((a, b) => {
      if (sortField === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        return sortDirection === 'asc' ? a.minutes - b.minutes : b.minutes - a.minutes;
      }
    });
  };
  
  // Handle sort change
  const handleSort = (field: 'date' | 'minutes') => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc'); // Default to descending when changing sort field
    }
    
    const sorted = sortSessions(filteredSessions);
    setFilteredSessions(sorted);
  };
  
  // Apply filters
  const applyFilters = () => {
    let filtered = [...sessions];
    
    if (dateFrom) {
      filtered = filtered.filter(session => {
        return session.date >= dateFrom;
      });
    }
    
    if (dateTo) {
      filtered = filtered.filter(session => {
        return session.date <= dateTo;
      });
    }
    
    if (minDuration) {
      const min = parseInt(minDuration);
      if (!isNaN(min)) {
        filtered = filtered.filter(session => session.minutes >= min);
      }
    }
    
    if (maxDuration) {
      const max = parseInt(maxDuration);
      if (!isNaN(max)) {
        filtered = filtered.filter(session => session.minutes <= max);
      }
    }
    
    setFilterActive(dateFrom !== "" || dateTo !== "" || minDuration !== "" || maxDuration !== "");
    const sortedAndFiltered = sortSessions(filtered);
    setFilteredSessions(sortedAndFiltered);
    setFilterOpen(false);
  };
  
  // Reset filters
  const resetFilters = () => {
    setDateFrom("");
    setDateTo("");
    setMinDuration("");
    setMaxDuration("");
    setFilterActive(false);
    
    const sorted = sortSessions(sessions);
    setFilteredSessions(sorted);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
          <div>
            <h3 className="font-medium text-red-800">Error</h3>
            <p className="text-red-700">{error || "Failed to load student data"}</p>
            <Button 
              variant="outline" 
              className="mt-2"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center mb-6 space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">{student.name}'s Practice History</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Practice Time</CardTitle>
            <CardDescription>All time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{calculateTotalHours(sessions)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Practice Sessions</CardTitle>
            <CardDescription>Total count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{sessions.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Level</CardTitle>
            <CardDescription>Current student level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-amber-700">{student.level}</div>
          </CardContent>
        </Card>
      </div>
      
      {sessions.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Weekly Practice Summary</CardTitle>
            <CardDescription>Minutes practiced over the last 4 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis label={{ value: "Minutes", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="minutes"
                    name="Minutes Practiced"
                    fill="#8884d8"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Practice Sessions</h2>
          <div className="flex space-x-2">
            {/* Filter Button */}
            <Popover open={filterOpen} onOpenChange={setFilterOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant={filterActive ? "default" : "outline"} 
                  size="sm" 
                  className={filterActive ? "bg-amber-600 hover:bg-amber-700" : ""}
                >
                  {filterActive ? <FilterX className="h-4 w-4 mr-2" /> : <Filter className="h-4 w-4 mr-2" />}
                  {filterActive ? "Filters Applied" : "Filter"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4 p-2">
                  <h3 className="font-medium">Filter Practice Sessions</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateFrom">Date From</Label>
                      <Input
                        id="dateFrom"
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateTo">Date To</Label>
                      <Input
                        id="dateTo"
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minDuration">Min Duration (min)</Label>
                      <Input
                        id="minDuration"
                        type="number"
                        placeholder="0"
                        value={minDuration}
                        onChange={(e) => setMinDuration(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxDuration">Max Duration (min)</Label>
                      <Input
                        id="maxDuration"
                        type="number"
                        placeholder="180"
                        value={maxDuration}
                        onChange={(e) => setMaxDuration(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={resetFilters}
                    >
                      Reset
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={applyFilters}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            {/* Sort Fields */}
            <Select
              value={`${sortField}-${sortDirection}`}
              onValueChange={(value) => {
                const [field, direction] = value.split('-') as ['date' | 'minutes', 'asc' | 'desc'];
                setSortField(field);
                setSortDirection(direction);
                
                const sorted = [...filteredSessions].sort((a, b) => {
                  if (field === 'date') {
                    const dateA = new Date(a.date).getTime();
                    const dateB = new Date(b.date).getTime();
                    return direction === 'asc' ? dateA - dateB : dateB - dateA;
                  } else {
                    return direction === 'asc' ? a.minutes - b.minutes : b.minutes - a.minutes;
                  }
                });
                
                setFilteredSessions(sorted);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <span className="flex items-center">
                  <ArrowDownUp className="h-4 w-4 mr-2" />
                  <span>Sort by</span>
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Date (Newest First)</SelectItem>
                <SelectItem value="date-asc">Date (Oldest First)</SelectItem>
                <SelectItem value="minutes-desc">Duration (Highest First)</SelectItem>
                <SelectItem value="minutes-asc">Duration (Lowest First)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {filteredSessions.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center">
                      Date
                      {sortField === 'date' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead 
                    className="text-right cursor-pointer"
                    onClick={() => handleSort('minutes')}
                  >
                    <div className="flex items-center justify-end">
                      Duration
                      {sortField === 'minutes' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        {format(parseISO(session.date), "MMM d, yyyy")}
                      </span>
                    </TableCell>
                    <TableCell>
                      {session.start_time && session.end_time 
                        ? `${session.start_time} - ${session.end_time}` 
                        : "—"}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      <span className="flex items-center justify-end">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        {session.minutes} min
                      </span>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {session.notes || "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">
              {sessions.length > 0 
                ? "No sessions match the current filters." 
                : "No practice sessions have been recorded yet."}
            </p>
            {sessions.length > 0 && filterActive && (
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={resetFilters}
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPracticeDetails;
