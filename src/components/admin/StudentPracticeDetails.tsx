
import { useState, useEffect } from "react";
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
import { Loader2, ChevronLeft, Calendar, Clock, Bookmark, LineChart, Timer } from "lucide-react";
import { format, parseISO, startOfMonth, endOfMonth, differenceInDays, addDays } from "date-fns";
import { formatTime, calculateConsistency } from "@/lib/practice-utils";

interface PracticeSession {
  id: string;
  user_id: string;
  date: string;
  minutes: number;
  notes: string | null;
  created_at: string;
  start_time: string | null;
  end_time: string | null;
}

interface MonthlyStats {
  month: string;
  totalMinutes: number;
  sessionCount: number;
  averageMinutes: number;
  monthIndex: number;
  daysLogged: number;
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
  useEffect(() => {
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
          .order('date', { ascending: false })
          .order('start_time', { ascending: false });
          
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
      monthIndex: number,
      practicesByDay: Set<string>,
    }>();
    
    sessions.forEach(session => {
      const date = parseISO(session.date);
      const monthKey = format(date, 'yyyy-MM');
      const monthDisplay = format(date, 'MMMM yyyy');
      const monthIndex = date.getMonth() + (date.getFullYear() * 12);
      const dayKey = session.date;
      
      if (!monthMap.has(monthKey)) {
        monthMap.set(monthKey, { 
          totalMinutes: 0, 
          sessionCount: 0, 
          monthIndex,
          practicesByDay: new Set(),
        });
      }
      
      const monthData = monthMap.get(monthKey)!;
      monthData.totalMinutes += session.minutes;
      monthData.sessionCount += 1;
      monthData.practicesByDay.add(dayKey);
    });
    
    // Convert map to array and sort by month (most recent first)
    return Array.from(monthMap.entries())
      .map(([monthKey, data]) => ({
        month: format(parseISO(`${monthKey}-01`), 'MMMM yyyy'),
        totalMinutes: data.totalMinutes,
        sessionCount: data.sessionCount,
        averageMinutes: Math.round(data.totalMinutes / data.sessionCount),
        monthIndex: data.monthIndex,
        daysLogged: data.practicesByDay.size,
      }))
      .sort((a, b) => b.monthIndex - a.monthIndex);
  };
  
  // Calculate consistency score (percentage of days practiced in a month)
  const calculateConsistencyScore = (sessions: PracticeSession[]): number => {
    if (sessions.length === 0) return 0;
    
    // Use the most recent month for consistency calculation
    const recentDate = parseISO(sessions[0].date);
    const monthStart = startOfMonth(recentDate);
    const monthEnd = endOfMonth(recentDate);
    const daysInMonth = differenceInDays(monthEnd, monthStart) + 1;
    
    // Get the current day of month (to calculate based on days that have passed)
    const currentDay = Math.min(new Date().getDate(), daysInMonth);
    
    // Count unique days practiced in this month
    const daysThisMonth = new Set(
      sessions
        .filter(session => {
          const sessionDate = parseISO(session.date);
          return sessionDate >= monthStart && sessionDate <= monthEnd;
        })
        .map(session => session.date)
    ).size;
    
    return Math.round((daysThisMonth / currentDay) * 100);
  };
  
  // Group sessions by date for display
  const groupedSessions = practiceSessions.reduce<Record<string, PracticeSession[]>>((acc, session) => {
    if (!acc[session.date]) {
      acc[session.date] = [];
    }
    acc[session.date].push(session);
    return acc;
  }, {});
  
  // Calculate streak
  const calculateStreak = (sessions: PracticeSession[]): number => {
    if (sessions.length === 0) return 0;
    
    // Group by date for easier access
    const dateSet = new Set(sessions.map(s => s.date));
    const sortedDates = Array.from(dateSet).sort().reverse(); // most recent first
    
    if (sortedDates.length === 0) return 0;
    
    let streak = 1; // Start with the most recent day
    let currentDate = parseISO(sortedDates[0]);
    
    for (let i = 1; i < 100; i++) { // Limit to 100 days to avoid infinite loop
      const prevDate = addDays(currentDate, -1);
      const prevDateStr = format(prevDate, 'yyyy-MM-dd');
      
      if (dateSet.has(prevDateStr)) {
        streak++;
        currentDate = prevDate;
      } else {
        break;
      }
    }
    
    return streak;
  };
  
  const totalHours = practiceSessions.reduce((sum, session) => 
    sum + session.minutes, 0) / 60;
  
  const consistencyScore = calculateConsistencyScore(practiceSessions);
  const currentStreak = calculateStreak(practiceSessions);
  const uniquePracticeDays = new Set(practiceSessions.map(s => s.date)).size;
  
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
              <h3 className="text-lg font-medium text-gray-500">Practice Days</h3>
              <p className="text-3xl font-bold">{uniquePracticeDays}</p>
              <p className="text-sm text-gray-500">Logged since joining</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Timer className="h-10 w-10 text-green-500 mx-auto mb-2" />
              <h3 className="text-lg font-medium text-gray-500">Current Streak</h3>
              <p className="text-3xl font-bold">{currentStreak} days</p>
              <p className="text-sm text-gray-500">Consecutive practice</p>
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
            <CardTitle className="flex items-center">
              <LineChart className="h-5 w-5 mr-2 text-primary" />
              Monthly Practice Statistics
            </CardTitle>
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
                  <TableHead>Days Practiced</TableHead>
                  <TableHead>Avg. Session</TableHead>
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
                    <TableCell>{monthData.daysLogged} days</TableCell>
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
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary" />
            Practice Session History
          </CardTitle>
          <CardDescription>
            Detailed log of all recorded practice sessions
          </CardDescription>
        </CardHeader>
        <CardContent className="max-h-[600px] overflow-y-auto">
          {Object.entries(groupedSessions).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(groupedSessions).map(([date, sessions]) => (
                <div key={date} className="border rounded-md overflow-hidden">
                  <div className="bg-gray-50 p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="font-medium">
                          {format(parseISO(date), 'MMMM dd, yyyy')}
                        </span>
                      </div>
                      <span className="text-sm">
                        {sessions.reduce((sum, s) => sum + s.minutes, 0)} mins total
                      </span>
                    </div>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sessions.map(session => (
                        <TableRow key={session.id}>
                          <TableCell>
                            {formatTime(session.start_time)} - {formatTime(session.end_time)}
                          </TableCell>
                          <TableCell>{session.minutes} minutes</TableCell>
                          <TableCell>{session.notes || '—'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </div>
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
