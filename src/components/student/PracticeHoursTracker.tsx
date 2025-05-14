
import { useState, useEffect } from "react";
import { useSupabase } from "@/context/SupabaseContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Clock, Calendar, Plus, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, isToday, parseISO } from "date-fns";

interface PracticeSession {
  id: string;
  user_id: string;
  date: string;
  minutes: number;
  notes: string;
  created_at: string;
}

const PracticeHoursTracker = () => {
  const { supabase, user } = useSupabase();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [practiceSessions, setPracticeSessions] = useState<PracticeSession[]>([]);
  const [minutes, setMinutes] = useState<number>(30);
  const [notes, setNotes] = useState<string>("");
  
  // Check if already practiced today
  const hasLoggedToday = practiceSessions.some(session => 
    isToday(parseISO(session.date))
  );

  const fetchPracticeSessions = async () => {
    if (!user) return;
    
    setIsLoading(true);
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
      
      setPracticeSessions(data || []);
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    if (minutes <= 0) {
      toast({
        title: "Invalid practice time",
        description: "Please enter a valid practice time in minutes",
        variant: "destructive"
      });
      return;
    }
    
    setIsSaving(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from("practice_sessions")
        .insert({
          user_id: user.id,
          date: today,
          minutes: minutes,
          notes: notes,
        })
        .select();
        
      if (error) {
        throw error;
      }
      
      toast({
        title: "Practice logged successfully",
        description: `You've logged ${minutes} minutes of practice. Great job!`,
      });
      
      // Reset form and refresh data
      setMinutes(30);
      setNotes("");
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
  
  const totalHours = practiceSessions.reduce((sum, session) => sum + session.minutes, 0) / 60;
  
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="bg-amber-50 rounded-t-lg border-b border-amber-100">
        <CardTitle className="flex items-center text-maroon-900">
          <Clock className="mr-2 h-5 w-5 text-amber-600" />
          Practice Hours
        </CardTitle>
        <CardDescription>
          Log your daily violin practice
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        {isLoading ? (
          <div className="flex justify-center p-6">
            <Loader2 className="h-6 w-6 animate-spin text-maroon-800" />
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-500">Total Practice</p>
                <p className="text-2xl font-bold text-maroon-900">{totalHours.toFixed(1)} hours</p>
              </div>
              
              {hasLoggedToday && (
                <div className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Check className="h-4 w-4 mr-1" />
                  Logged today
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Sessions</h3>
              
              {practiceSessions.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {practiceSessions.map(session => (
                    <div 
                      key={session.id} 
                      className="flex justify-between items-center p-2 bg-amber-50 rounded-md"
                    >
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-amber-600 mr-2" />
                        <span className="text-sm">{format(parseISO(session.date), 'MMM dd, yyyy')}</span>
                      </div>
                      <span className="font-medium">{session.minutes} mins</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic">No practice sessions logged yet</p>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="border-t border-gray-100 pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Plus className="h-4 w-4 mr-1 text-maroon-800" />
                Log New Practice Session
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="minutes">Practice Duration (minutes)</Label>
                  <Input 
                    id="minutes" 
                    type="number" 
                    min="1"
                    value={minutes} 
                    onChange={e => setMinutes(parseInt(e.target.value))}
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Input 
                    id="notes" 
                    value={notes} 
                    onChange={e => setNotes(e.target.value)}
                    className="mt-1"
                    placeholder="What did you practice today?"
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full mt-4 bg-maroon-800 hover:bg-maroon-700"
                disabled={isSaving || hasLoggedToday}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : hasLoggedToday ? (
                  "Already logged today"
                ) : (
                  "Log Practice Session"
                )}
              </Button>
            </form>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PracticeHoursTracker;
