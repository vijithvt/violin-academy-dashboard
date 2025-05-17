
import { useState, useEffect } from "react";
import { useSupabase } from "@/context/SupabaseContext";
import { Loader2, Plus, Clock, Calendar, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { format, parseISO, isAfter, startOfDay } from "date-fns";
import { calculateDuration } from "@/lib/practice-utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [totalMinutesThisWeek, setTotalMinutesThisWeek] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [editingSession, setEditingSession] = useState<PracticeSession | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  
  const maxDate = format(new Date(), "yyyy-MM-dd");
  
  const fetchPracticeSessions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("practice_sessions")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false })
        .order("start_time", { ascending: false });

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

  // Calculate practice duration automatically when start and end times change
  useEffect(() => {
    if (startTime && endTime) {
      const calculatedDuration = calculateDuration(startTime, endTime);
      if (calculatedDuration > 0) {
        setMinutes(calculatedDuration);
      }
    }
  }, [startTime, endTime]);

  const resetForm = () => {
    setMinutes(30);
    setNotes("");
    setStartTime("");
    setEndTime("");
    setDate(format(new Date(), "yyyy-MM-dd"));
    setShowForm(false);
    setEditingSession(null);
  };

  const validateForm = () => {
    // Validate date is not in the future
    const selectedDate = new Date(date);
    selectedDate.setHours(23, 59, 59, 999);
    const now = new Date();
    
    if (isAfter(selectedDate, now)) {
      toast({
        title: "Invalid Date",
        description: "You cannot log practice sessions for future dates",
        variant: "destructive",
      });
      return false;
    }

    // Validate time inputs
    if (startTime && endTime) {
      const duration = calculateDuration(startTime, endTime);
      if (duration <= 0) {
        toast({
          title: "Invalid Time",
          description: "End time must be after start time",
          variant: "destructive",
        });
        return false;
      }
    } else if (!startTime || !endTime) {
      toast({
        title: "Missing Time",
        description: "Both start and end time are required",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const { data, error } = await supabase.from("practice_sessions").insert({
        user_id: user.id,
        minutes,
        notes,
        date,
        start_time: startTime,
        end_time: endTime
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Practice session logged successfully",
      });

      resetForm();
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

  const handleEdit = (session: PracticeSession) => {
    setEditingSession(session);
    setMinutes(session.minutes);
    setNotes(session.notes || "");
    setStartTime(session.start_time || "");
    setEndTime(session.end_time || "");
    setDate(session.date);
    setShowEditDialog(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !editingSession) return;

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from("practice_sessions")
        .update({
          minutes,
          notes,
          date,
          start_time: startTime,
          end_time: endTime
        })
        .eq("id", editingSession.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Practice session updated successfully",
      });

      setShowEditDialog(false);
      resetForm();
      fetchPracticeSessions();
    } catch (error: any) {
      console.error("Error updating practice:", error.message);
      toast({
        title: "Error",
        description: "Failed to update practice session",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("practice_sessions")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Practice session deleted successfully",
      });

      fetchPracticeSessions();
    } catch (error: any) {
      console.error("Error deleting practice:", error.message);
      toast({
        title: "Error",
        description: "Failed to delete practice session",
        variant: "destructive",
      });
    } finally {
      setShowDeleteDialog(false);
      setSessionToDelete(null);
    }
  };

  const confirmDelete = (id: string) => {
    setSessionToDelete(id);
    setShowDeleteDialog(true);
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
              <div className="space-y-2">
                <Label htmlFor="practiceDate">Practice Date</Label>
                <Input
                  type="date"
                  id="practiceDate"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  max={maxDate}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    type="time"
                    id="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    type="time"
                    id="endTime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="minutes">Practice Duration (calculated)</Label>
                <Input
                  type="number"
                  id="minutes"
                  value={minutes}
                  readOnly
                  className="bg-gray-100"
                />
                <p className="text-xs text-amber-700">Duration is calculated automatically from start and end times</p>
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
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-amber-50">
                      <th className="px-4 py-2 text-left font-medium">Date</th>
                      <th className="px-4 py-2 text-left font-medium hidden sm:table-cell">Time</th>
                      <th className="px-4 py-2 text-right font-medium">Duration</th>
                      <th className="px-4 py-2 text-right font-medium">Actions</th>
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
                        <td className="px-4 py-2 hidden sm:table-cell">
                          {session.start_time && session.end_time ? (
                            `${formatTime(session.start_time)} - ${formatTime(session.end_time)}`
                          ) : "-"}
                        </td>
                        <td className="px-4 py-2 text-right font-medium">
                          {formatDuration(session.minutes)}
                        </td>
                        <td className="px-4 py-2 text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleEdit(session)}
                              className="h-8 w-8 p-0 text-amber-700"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => confirmDelete(session.id)}
                                className="h-8 w-8 p-0 text-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                          </div>
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

      {/* Edit Practice Session Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Practice Session</DialogTitle>
            <DialogDescription>
              Update your practice session details
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleUpdate} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="editDate">Practice Date</Label>
              <Input
                type="date"
                id="editDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                max={maxDate}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editStartTime">Start Time</Label>
                <Input
                  type="time"
                  id="editStartTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editEndTime">End Time</Label>
                <Input
                  type="time"
                  id="editEndTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="editMinutes">Practice Duration (calculated)</Label>
              <Input
                type="number"
                id="editMinutes"
                value={minutes}
                readOnly
                className="bg-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="editNotes">Notes (optional)</Label>
              <Input
                id="editNotes"
                placeholder="What did you practice?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowEditDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-maroon-800 hover:bg-maroon-700"
                disabled={submitting}
              >
                {submitting ? 
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 
                  "Update Session"
                }
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this practice session. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => sessionToDelete && handleDelete(sessionToDelete)}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default PracticeHoursTracker;
