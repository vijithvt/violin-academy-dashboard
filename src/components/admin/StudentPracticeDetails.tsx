
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSupabase } from "@/context/SupabaseContext";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ChevronLeft, Calendar, Clock, Bookmark } from "lucide-react";
import { format, parseISO, startOfMonth, endOfMonth, differenceInDays } from "date-fns";

interface PracticeSession {
  id: string;
  user_id: string;
  date: string;
  minutes: number;
  notes: string | null;
  created_at: string;
}

interface MonthlyStats {
  month: string;
  totalMinutes: number;
  sessionCount: number;
  averageMinutes: number;
  monthIndex: number;
}

const StudentPracticeDetails = () => {
  const { id } = useParams();
  const { supabase } = useSupabase();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [studentName, setStudentName] = useState<string>("");
  const [practiceSessions, setPracticeSessions] = useState<PracticeSession[]>([]);
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats[]>([]);
  
  // Fetch student practice data
  useState(() => {
    const fetchStudentData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        // Get student name
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', id)
          .single();
          
        if (profileError) {
          throw profileError;
        }
        
        if (profileData) {
          setStudentName(profileData.name);
        }
        
        // Get practice sessions
        const { data: sessions, error: sessionsError } = await supabase
          .from('practice_sessions')
          .select('*')
          .eq('user_id', id)
          .order('date', { ascending: false });
          
        if (sessionsError) {
          throw sessionsError;
        }
        
        setPracticeSessions(sessions || []);
        
        // Calculate monthly statistics
        if (sessions && sessions.length > 0) {
          const monthStats = calculateMonthlyStats(sessions);
          setMonthlyStats(monthStats);
        }
      } catch (error: any) {
        toast({
          title: "Error loading data",
          description: error.message || "Failed to load student practice data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStudentData();
  }, [id, supabase, toast]);
  
  // Calculate monthly statistics from practice sessions
  const calculateMonthlyStats = (sessions: PracticeSession[]): MonthlyStats[] => {
    const monthMap = new Map<string, { 
      totalMinutes: number, 
      sessionCount: number, 
      monthIndex: number 
    }>();
    
    sessions.forEach(session => {
      const date = parseISO(session.date);
      const monthKey = format(date, 'yyyy-MM');
      const monthDisplay = format(date, 'MMMM yyyy');
      const monthIndex = date.getMonth() + (date.getFullYear() * 12);
      
      if (!monthMap.has(monthKey)) {
        monthMap.set(monthKey, { 
          totalMinutes: 0, 
          sessionCount: 0, 
          monthIndex 
        });
      }
      
      const monthData = monthMap.get(monthKey)!;
      monthData.totalMinutes += session.minutes;
      monthData.sessionCount += 1;
    });
    
    // Convert map to array and sort by month (most recent first)
    return Array.from(monthMap.entries())
      .map(([monthKey, data]) => ({
        month: format(parseISO(`${monthKey}-01`), 'MMMM yyyy'),
        totalMinutes: data.totalMinutes,
        sessionCount: data.sessionCount,
        averageMinutes: Math.round(data.totalMinutes / data.sessionCount),
        monthIndex: data.monthIndex
      }))
      .sort((a, b) => b.monthIndex - a.monthIndex);
  };
  
  // Calculate consistency score (percentage of days practiced in a month)
  const calculateConsistency = (sessions: PracticeSession[]): number => {
    if (sessions.length === 0) return 0;
    
    // Use the most recent month for consistency calculation
    const recentDate = parseISO(sessions[0].date);
    const monthStart = startOfMonth(recentDate);
    const monthEnd = endOfMonth(recentDate);
    const daysInMonth = differenceInDays(monthEnd, monthStart) + 1;
    
    // Count unique days practiced in this month
    const daysThisMonth = new Set(
      sessions
        .filter(session => {
          const sessionDate = parseISO(session.date);
          return sessionDate >= monthStart && sessionDate <= monthEnd;
        })
        .map(session => session.date)
    ).size;
    
    return Math.round((daysThisMonth / daysInMonth) * 100);
  };
  
  const totalHours = practiceSessions.reduce((sum, session) => 
    sum + session.minutes, 0) / 60;
  
  const consistencyScore = calculateConsistency(practiceSessions);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="mr-4"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Practice Details for {studentName}</h1>
      </div>
      
      {/* Practice Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Clock className="h-10 w-10 text-primary mx-auto mb-2" />
              <h3 className="text-lg font-medium text-gray-500">Total Practice</h3>
              <p className="text-3xl font-bold">{totalHours.toFixed(1)} hours</p>
              <p className="text-sm text-gray-500">({practiceSessions.length} sessions)</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Calendar className="h-10 w-10 text-indigo-500 mx-auto mb-2" />
              <h3 className="text-lg font-medium text-gray-500">Recent Practice</h3>
              {practiceSessions.length > 0 ? (
                <>
                  <p className="text-3xl font-bold">{format(parseISO(practiceSessions[0].date), 'MMM dd')}</p>
                  <p className="text-sm text-gray-500">{practiceSessions[0].minutes} minutes</p>
                </>
              ) : (
                <p className="text-xl font-medium text-gray-400">No sessions</p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Bookmark className="h-10 w-10 text-amber-500 mx-auto mb-2" />
              <h3 className="text-lg font-medium text-gray-500">Consistency</h3>
              <p className="text-3xl font-bold">{consistencyScore}%</p>
              <p className="text-sm text-gray-500">This month</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Monthly Stats */}
      {monthlyStats.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Monthly Practice Statistics</CardTitle>
            <CardDescription>
              Summary of practice hours by month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Total Time</TableHead>
                  <TableHead>Sessions</TableHead>
                  <TableHead>Average</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyStats.map((monthData, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{monthData.month}</TableCell>
                    <TableCell>
                      {(monthData.totalMinutes / 60).toFixed(1)} hours
                      <span className="text-gray-500 text-sm ml-1">({monthData.totalMinutes} mins)</span>
                    </TableCell>
                    <TableCell>{monthData.sessionCount} sessions</TableCell>
                    <TableCell>{monthData.averageMinutes} mins/session</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      
      {/* Practice Session History */}
      <Card>
        <CardHeader>
          <CardTitle>Practice Session History</CardTitle>
          <CardDescription>
            Detailed log of all recorded practice sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {practiceSessions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {practiceSessions.map(session => (
                  <TableRow key={session.id}>
                    <TableCell>{format(parseISO(session.date), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{session.minutes} minutes</TableCell>
                    <TableCell>{session.notes || '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-6 text-gray-500">
              No practice sessions recorded yet
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Return to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StudentPracticeDetails;
