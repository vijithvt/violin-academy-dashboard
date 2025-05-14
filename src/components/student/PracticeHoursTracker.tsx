import { useState, useEffect } from "react";
import { useSupabase } from "@/context/SupabaseContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Clock, Calendar, Plus, Check, X, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, isToday, parseISO, addDays } from "date-fns";
import { formatTime, calculateDuration, calculateConsistency } from "@/lib/practice-utils";

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

const PracticeHoursTracker = () => {
  const { supabase, user } = useSupabase();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [practiceSessions, setPracticeSessions] = useState<PracticeSession[]>([]);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [expandForm, setExpandForm] = useState(false);
  const [consistency, setConsistency] = useState(0);
  
  const fetchPracticeSessions = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("practice_sessions")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false })
        .order("start_time", { ascending: false })
        .limit(20);
        
      if (error) {
        throw error;
      }
      
      setPracticeSessions(data || []);
      
      // Calculate consistency
      const consistencyValue = calculateConsistency(data || []);
      setConsistency(consistencyValue);
      
    } catch (error: any) {
      toast({
        title: "Error loading practice data",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPracticeSessions();
  }, [user]);
  
  const validateTimes = (): boolean => {
    if (!startTime || !endTime) {
      toast({
        title: "Missing time information",
        description: "Please enter both start and end time",
        variant: "destructive"
      });
      return false;
    }
    
    const calculatedMinutes = calculateDuration(startTime, endTime);
    if (calculatedMinutes <= 0) {
      toast({
        title: "Invalid time range",
        description: "End time must be after start time",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    if (!validateTimes()) {
      return;
    }
    
    const calculatedMinutes = calculateDuration(startTime, endTime);
    
    setIsSaving(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from("practice_sessions")
        .insert({
          user_id: user.id,
          date: today,
          minutes: calculatedMinutes,
          notes: notes || null,
          start_time: startTime,
          end_time: endTime,
        })
        .select();
        
      if (error) {
        throw error;
      }
      
      toast({
        title: "Practice logged successfully",
        description: `You've logged ${calculatedMinutes} minutes of practice. Great job!`,
      });
      
      // Reset form and refresh data
      setStartTime("");
      setEndTime("");
      setNotes("");
      setExpandForm(false);
      fetchPracticeSessions();
      
    } catch (error: any) {
      toast({
        title: "Error saving practice data",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Group sessions by date
  const groupedSessions = practiceSessions.reduce<Record<string, PracticeSession[]>>((acc, session) => {
    if (!acc[session.date]) {
      acc[session.date] = [];
    }
    acc[session.date].push(session);
    return acc;
  }, {});
  
  const totalHours = practiceSessions.reduce((sum, session) => sum + session.minutes, 0) / 60;
  
  const practiceCount = Object.keys(groupedSessions).length;
  const streakCount = calculateStreak(groupedSessions);
  
  // Calculate current streak
  function calculateStreak(grouped: Record<string, PracticeSession[]>): number {
    const dates = Object.keys(grouped).sort().reverse(); // Most recent first
    if (dates.length === 0) return 0;
    
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    // If today is already logged, start counting from today
    if (grouped[currentDate.toISOString().split('T')[0]]) {
      streak = 1;
    } else {
      // If today not logged, check if yesterday was logged
      const yesterday = addDays(currentDate, -1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      if (!grouped[yesterdayStr]) {
        return 0; // No streak if yesterday wasn't logged
      }
      currentDate = yesterday;
      streak = 1;
    }
    
    // Keep checking previous days
    for (let i = 1; i < 100; i++) { // Limiting to 100 days max
      const prevDate = addDays(currentDate, -i);
      const prevDateStr = prevDate.toISOString().split('T')[0];
      
      if (grouped[prevDateStr]) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }
  
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="bg-amber-50 rounded-t-lg border-b border-amber-100">
        <CardTitle className="flex items-center text-maroon-900">
          <Clock className="mr-2 h-5 w-5 text-amber-600" />
          Practice Hours
        </CardTitle>
        <CardDescription>
          Log your daily violin practice sessions
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        {isLoading ? (
          <div className="flex justify-center p-6">
            <Loader2 className="h-6 w-6 animate-spin text-maroon-800" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-amber-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500">Total Practice</p>
                <p className="text-2xl font-bold text-maroon-900">{totalHours.toFixed(1)} hours</p>
                <p className="text-xs text-gray-500">{practiceSessions.length} sessions</p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500">Current Streak</p>
                <p className="text-2xl font-bold text-maroon-900">{streakCount} days</p>
                <p className="text-xs text-gray-500">{practiceCount} practice days</p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500">Consistency</p>
                <p className="text-2xl font-bold text-maroon-900">{consistency}%</p>
                <p className="text-xs text-gray-500">This month</p>
              </div>
            </div>
            
            {/* Log New Practice Session Button */}
            <div className="mb-4">
              <Button
                type="button"
                variant="outline"
                className="w-full flex justify-between items-center"
                onClick={() => setExpandForm(!expandForm)}
              >
                <span className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Log New Practice Session
                </span>
                {expandForm ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
            
            {/* Practice Form */}
            {expandForm && (
              <form onSubmit={handleSubmit} className="p-4 border rounded-lg mb-6 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input 
                      id="startTime" 
                      type="time"
                      value={startTime} 
                      onChange={e => setStartTime(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input 
                      id="endTime" 
                      type="time"
                      value={endTime} 
                      onChange={e => setEndTime(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Input 
                    id="notes" 
                    value={notes} 
                    onChange={e => setNotes(e.target.value)}
                    className="mt-1"
                    placeholder="What did you practice today?"
                  />
                </div>
                
                <div className="text-right">
                  <Button 
                    type="button" 
                    variant="outline"
                    className="mr-2"
                    onClick={() => setExpandForm(false)}
                  >
                    Cancel
                  </Button>
                  
                  <Button 
                    type="submit" 
                    className="bg-maroon-800 hover:bg-maroon-700"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Log Session"
                    )}
                  </Button>
                </div>
              </form>
            )}
            
            {/* Recent Sessions List */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Recent Practice Sessions
              </h3>
              
              {Object.keys(groupedSessions).length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {Object.entries(groupedSessions).map(([date, sessions]) => (
                    <div key={date} className="border rounded-md overflow-hidden">
                      <div className={`flex justify-between items-center p-3 ${
                        isToday(parseISO(date)) ? 'bg-green-50 text-green-800' : 'bg-gray-50'
                      }`}>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span className="font-medium">
                            {format(parseISO(date), 'MMM dd, yyyy')}
                            {isToday(parseISO(date)) && (
                              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                Today
                              </span>
                            )}
                          </span>
                        </div>
                        <span className="text-sm">
                          {sessions.reduce((sum, s) => sum + s.minutes, 0)} mins total
                        </span>
                      </div>
                      
                      <div className="divide-y divide-gray-100">
                        {sessions.map(session => (
                          <div key={session.id} className="p-3 bg-white">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-amber-600 mr-2" />
                                <span>
                                  {formatTime(session.start_time)} - {formatTime(session.end_time)}
                                </span>
                              </div>
                              <span className="font-medium">{session.minutes} mins</span>
                            </div>
                            {session.notes && (
                              <p className="mt-1 text-sm text-gray-500 pl-6">{session.notes}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic text-center p-6">
                  No practice sessions logged yet. Start tracking your practice today!
                </p>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PracticeHoursTracker;
