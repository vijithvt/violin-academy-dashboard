
import { useState, useEffect } from "react";
import { useSupabase } from "@/context/SupabaseContext";
import { Loader2, Plus, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";

interface PracticeSession {
  id: string;
  date: string;
  minutes: number;
  start_time?: string;
  end_time?: string;
  notes?: string;
  created_at: string;
}

const PracticeHoursTracker = () => {
  const { supabase, user } = useSupabase();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [minutes, setMinutes] = useState<number>(30);
  const [notes, setNotes] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [totalMinutesThisWeek, setTotalMinutesThisWeek] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  
  const fetchPracticeSessions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("practice_sessions")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false })
        .limit(10);

      if (error) {
        throw error;
      }

      if (data) {
        setSessions(data);
        calculateTotalMinutesThisWeek(data);
        calculateCurrentStreak(data);
      }
    } catch (error: any) {
      console.error("Error fetching practice sessions:", error.message);
      toast({
        title: "Error",
        description: "Failed to load practice sessions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalMinutesThisWeek = (data: PracticeSession[]) => {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    
    const thisWeekSessions = data.filter(session => {
      const sessionDate = new Date(session.date);
      return sessionDate >= oneWeekAgo && sessionDate <= today;
    });
    
    const total = thisWeekSessions.reduce((sum, session) => sum + session.minutes, 0);
    setTotalMinutesThisWeek(total);
  };

  const calculateCurrentStreak = (data: PracticeSession[]) => {
    if (!data.length) {
      setCurrentStreak(0);
      return;
    }
    
    // Sort by date
    const sortedSessions = [...data].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Check if practiced today or yesterday
    const mostRecentSessionDate = new Date(sortedSessions[0].date);
    mostRecentSessionDate.setHours(0, 0, 0, 0);
    
    if (mostRecentSessionDate.getTime() < yesterday.getTime()) {
      // Streak is broken
      setCurrentStreak(0);
      return;
    }
    
    // Calculate streak
    let streak = 1;
    for (let i = 1; i < sortedSessions.length; i++) {
      const currentDate = new Date(sortedSessions[i-1].date);
      currentDate.setHours(0, 0, 0, 0);
      
      const prevDate = new Date(sortedSessions[i].date);
      prevDate.setHours(0, 0, 0, 0);
      
      // Check if dates are consecutive (1 day apart)
      const diffTime = currentDate.getTime() - prevDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      
      if (diffDays === 1) {
        streak++;
      } else if (diffDays > 1) {
        // Break in streak
        break;
      }
    }
    
    setCurrentStreak(streak);
  };

  useEffect(() => {
    fetchPracticeSessions();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!minutes || minutes <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid practice duration in minutes",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const { data, error } = await supabase.from("practice_sessions").insert({
        user_id: user.id,
        minutes,
        notes,
        start_time: startTime || null,
        end_time: endTime || null
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Practice session logged successfully",
      });

      setMinutes(30);
      setNotes("");
      setStartTime("");
      setEndTime("");
      setShowForm(false);
      fetchPracticeSessions();
    } catch (error: any) {
      console.error("Error logging practice:", error.message);
      toast({
        title: "Error",
        description: "Failed to log practice session",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return "-";
    return timeString;
  };
  
  // Calculate hours and minutes from total minutes
  const formatDuration = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours > 0 ? `${hours}h ` : ''}${minutes > 0 ? `${minutes}m` : ''}`.trim();
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
    >
      <Card className="border-amber-100 shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
          <CardTitle className="flex justify-between items-center">
            <span className="text-maroon-800 flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Practice Log
            </span>
            {!showForm && (
              <Button 
                onClick={() => setShowForm(true)} 
                size="sm" 
                className="bg-maroon-800 hover:bg-maroon-700"
              >
                <Plus className="mr-1 h-4 w-4" /> Log Practice
              </Button>
            )}
          </CardTitle>
          <CardDescription>Track your daily violin practice sessions</CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-2 gap-4 mb-6"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
            }}
          >
            <motion.div 
              className="bg-amber-50 p-3 rounded-lg text-center"
              variants={cardVariants}
            >
              <h3 className="text-xs text-amber-800 uppercase font-semibold mb-1">Week Total</h3>
              <p className="text-2xl font-bold text-maroon-900">{formatDuration(totalMinutesThisWeek)}</p>
            </motion.div>
            
            <motion.div 
              className="bg-amber-50 p-3 rounded-lg text-center"
              variants={cardVariants}
            >
              <h3 className="text-xs text-amber-800 uppercase font-semibold mb-1">Current Streak</h3>
              <p className="text-2xl font-bold text-maroon-900">{currentStreak} {currentStreak === 1 ? 'day' : 'days'}</p>
            </motion.div>
          </motion.div>

          {showForm ? (
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-4 border p-4 rounded-lg bg-amber-50/30 mb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    type="time"
                    id="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    type="time"
                    id="endTime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="minutes">Practice Duration (minutes)</Label>
                <Input
                  type="number"
                  id="minutes"
                  value={minutes}
                  onChange={(e) => setMinutes(parseInt(e.target.value))}
                  min="1"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Input
                  id="notes"
                  placeholder="What did you practice today?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  disabled={submitting}
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-maroon-800 hover:bg-maroon-700" 
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Practice"
                  )}
                </Button>
              </div>
            </motion.form>
          ) : null}

          {loading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="h-8 w-8 text-maroon-800 animate-spin" />
            </div>
          ) : sessions.length > 0 ? (
            <div className="space-y-2 mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Practice Sessions</h3>
              <div className="overflow-hidden rounded-lg border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-amber-50">
                      <th className="px-4 py-2 text-left font-medium">Date</th>
                      <th className="px-4 py-2 text-left font-medium">Time</th>
                      <th className="px-4 py-2 text-right font-medium">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((session, index) => (
                      <motion.tr
                        key={session.id}
                        className={`${index % 2 === 0 ? "bg-white" : "bg-amber-50/30"} border-t`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="px-4 py-2">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-amber-800" />
                            {format(new Date(session.date), "MMM d, yyyy")}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          {session.start_time && session.end_time ? (
                            `${formatTime(session.start_time)} - ${formatTime(session.end_time)}`
                          ) : "-"}
                        </td>
                        <td className="px-4 py-2 text-right font-medium">
                          {formatDuration(session.minutes)}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No practice sessions recorded yet.</p>
              <Button 
                onClick={() => setShowForm(true)} 
                variant="outline" 
                className="mt-4"
              >
                <Plus className="mr-1 h-4 w-4" /> Log Your First Practice
              </Button>
            </div>
          )}
        </CardContent>

        <CardFooter className="bg-gradient-to-r from-amber-50 to-orange-50 border-t py-2 text-xs text-amber-800">
          Regular practice is the key to musical progress!
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PracticeHoursTracker;
