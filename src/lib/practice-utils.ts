
import { format, parseISO, differenceInMinutes } from "date-fns";

// Format time for display
export const formatTime = (timeString: string | null | undefined): string => {
  if (!timeString) return "—";
  
  try {
    // Create a full date with the time to parse it
    const today = new Date().toISOString().split('T')[0];
    const dateTime = parseISO(`${today}T${timeString}`);
    return format(dateTime, 'h:mm a');
  } catch (error) {
    console.error("Error formatting time:", error);
    return timeString;
  }
};

// Calculate minutes between start and end time
export const calculateDuration = (startTime: string, endTime: string): number => {
  try {
    const today = new Date().toISOString().split('T')[0];
    let startDateTime = parseISO(`${today}T${startTime}`);
    let endDateTime = parseISO(`${today}T${endTime}`);
    
    // Handle case where practice goes past midnight
    if (endDateTime < startDateTime) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];
      endDateTime = parseISO(`${tomorrowStr}T${endTime}`);
    }
    
    const minutes = differenceInMinutes(endDateTime, startDateTime);
    return minutes > 0 ? minutes : 0;
  } catch (error) {
    console.error("Error calculating duration:", error);
    return 0;
  }
};

// Calculate practice consistency as percentage of days practiced in current month
export const calculateConsistency = (
  sessions: { date: string }[]
): number => {
  if (sessions.length === 0) return 0;
  
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  // Get days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Get current day of month (to calculate percentage based on days passed)
  const currentDay = Math.min(now.getDate(), daysInMonth);
  
  // Count unique days practiced in current month
  const uniqueDaysThisMonth = new Set(
    sessions
      .filter(session => {
        const sessionDate = parseISO(session.date);
        return (
          sessionDate.getMonth() === currentMonth && 
          sessionDate.getFullYear() === currentYear
        );
      })
      .map(session => session.date)
  ).size;
  
  return Math.round((uniqueDaysThisMonth / currentDay) * 100);
};
