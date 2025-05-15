
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Calendar, Search, Filter, ArrowDownUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

// Define types for better type safety
interface Student {
  id: string;
  name: string;
  email: string;
  level?: string;
}

interface PracticeSession {
  id: string;
  user_id: string;
  date: string;
  minutes: number;
  notes: string;
  created_at: string;
}

// This is the component to display student practice details
const StudentPracticeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<PracticeSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPeriod, setFilterPeriod] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Filter options
  const filterOptions = [
    { value: "all", label: "All Time" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "3months", label: "Last 3 Months" },
    { value: "year", label: "This Year" },
  ];

  // Helper function to format dates
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  // Helper function to get date ranges for filtering
  const getDateRange = (period: string) => {
    const now = new Date();
    const start = new Date();
    
    switch(period) {
      case "week":
        start.setDate(now.getDate() - 7);
        break;
      case "month":
        start.setMonth(now.getMonth() - 1);
        break;
      case "3months":
        start.setMonth(now.getMonth() - 3);
        break;
      case "year":
        start.setFullYear(now.getFullYear() - 1);
        break;
      default:
        start.setFullYear(1970); // All time
    }
    
    return { start, end: now };
  };

  // Apply filters to sessions
  const applyFilters = () => {
    let result = [...sessions];
    
    // Apply date filter
    if (filterPeriod !== "all") {
      const { start, end } = getDateRange(filterPeriod);
      result = result.filter(session => {
        const sessionDate = new Date(session.date);
        return sessionDate >= start && sessionDate <= end;
      });
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(session => 
        session.notes.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    
    setFilteredSessions(result);
  };

  // Fetch student data and practice sessions
  useEffect(() => {
    const fetchStudentData = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        
        // Fetch basic student data
        const { data: studentData, error: studentError } = await supabase
          .from("profiles")
          .select("id, name")
          .eq("id", id)
          .single();
          
        if (studentError) {
          throw new Error(studentError.message);
        }
        
        // Fetch extended profile data to get learning level
        const { data: extendedProfile, error: extendedError } = await supabase
          .from("student_profiles")
          .select("learning_level")
          .eq("user_id", id)
          .maybeSingle();
          
        // Map learning level to display format
        let studentLevel = "AARAMBHA (Beginner)";
        
        if (!extendedError && extendedProfile?.learning_level) {
          switch(extendedProfile.learning_level) {
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
              studentLevel = "AARAMBHA (Beginner)";
          }
        }
        
        // Fetch practice sessions
        const { data: sessions, error: sessionsError } = await supabase
          .from("practice_sessions")
          .select("*")
          .eq("user_id", id)
          .order("date", { ascending: false });
          
        if (sessionsError) {
          throw new Error(sessionsError.message);
        }

        // Fix here: only access properties if studentData is valid
        if (studentData) {
          setStudent({ 
            id: studentData.id, 
            name: studentData.name, 
            email: '', // We don't have email in this query
            level: studentLevel 
          });
        }
        
        setSessions(sessions || []);
        setFilteredSessions(sessions || []);
        
      } catch (error) {
        console.error("Error fetching student data:", error);
        toast({
          title: "Error",
          description: "Failed to load student data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStudentData();
  }, [id]);
  
  // Apply filters when filter states change
  useEffect(() => {
    applyFilters();
  }, [searchTerm, filterPeriod, sortOrder, sessions]);

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };
  
  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Navigate back to student list
  const handleBack = () => {
    navigate("/dashboard/admin/students");
  };
  
  // Calculate total practice hours for a period
  const calculatePeriodStats = (period: string) => {
    const { start, end } = getDateRange(period);
    
    const periodSessions = sessions.filter(session => {
      const sessionDate = new Date(session.date);
      return sessionDate >= start && sessionDate <= end;
    });
    
    const totalMinutes = periodSessions.reduce((sum, session) => sum + session.minutes, 0);
    const sessionCount = periodSessions.length;
    
    return {
      hours: Math.floor(totalMinutes / 60),
      minutes: totalMinutes % 60,
      sessionCount
    };
  };
  
  // Calculate total practice time
  const calculateTotalHours = (sessions: PracticeSession[]) => {
    const totalMinutes = sessions.reduce((sum, session) => sum + session.minutes, 0);
    return {
      hours: Math.floor(totalMinutes / 60),
      minutes: totalMinutes % 60
    };
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-maroon-700"></div>
      </div>
    );
  }

  // Student not found state
  if (!student) {
    return (
      <div className="p-6">
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-gray-800">Student Not Found</h2>
          <p className="text-gray-600 mt-2">The student you're looking for doesn't exist or you don't have permission to view their details.</p>
          <Button onClick={handleBack} className="mt-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Students
          </Button>
        </div>
      </div>
    );
  }

  // Stats for different time periods
  const weekStats = calculatePeriodStats("week");
  const monthStats = calculatePeriodStats("month");
  const yearStats = calculatePeriodStats("year");
  
  // Calculate total practice time for filtered sessions
  const { hours: totalHours, minutes: totalMinutes } = calculateTotalHours(filteredSessions);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center mb-6 space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBack}
          className="border-maroon-600 text-maroon-700 hover:bg-maroon-50"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-serif font-bold text-maroon-900">{student.name}'s Practice Log</h1>
        <Badge className="bg-amber-500 hover:bg-amber-600 text-white ml-2">
          {student.level || "AARAMBHA (Beginner)"}
        </Badge>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-900">Total Practice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-amber-700" />
              <span className="text-2xl font-bold text-amber-900">{totalHours}h {totalMinutes}m</span>
            </div>
            <p className="text-xs text-amber-700 mt-1">{filteredSessions.length} sessions recorded</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-900">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-amber-700" />
              <span className="text-2xl font-bold text-amber-900">{weekStats.hours}h {weekStats.minutes}m</span>
            </div>
            <p className="text-xs text-amber-700 mt-1">{weekStats.sessionCount} sessions recorded</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-900">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-amber-700" />
              <span className="text-2xl font-bold text-amber-900">{monthStats.hours}h {monthStats.minutes}m</span>
            </div>
            <p className="text-xs text-amber-700 mt-1">{monthStats.sessionCount} sessions recorded</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-900">This Year</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-amber-700" />
              <span className="text-2xl font-bold text-amber-900">{yearStats.hours}h {yearStats.minutes}m</span>
            </div>
            <p className="text-xs text-amber-700 mt-1">{yearStats.sessionCount} sessions recorded</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Practice Log Table with Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-serif font-bold text-maroon-900">Practice Sessions</h2>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Search notes..." 
                className="pl-10 pr-4 w-full md:w-64" 
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                <SelectTrigger className="w-32 md:w-40">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={toggleSortOrder}
                className="h-10 w-10"
              >
                <ArrowDownUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {filteredSessions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No practice sessions found for this period.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Recorded</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">{new Date(session.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-amber-700" />
                        {Math.floor(session.minutes / 60)}h {session.minutes % 60}m
                      </div>
                    </TableCell>
                    <TableCell className="max-w-sm truncate">{session.notes}</TableCell>
                    <TableCell className="text-gray-500 text-sm">
                      {formatDistanceToNow(new Date(session.created_at), { addSuffix: true })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPracticeDetails;
