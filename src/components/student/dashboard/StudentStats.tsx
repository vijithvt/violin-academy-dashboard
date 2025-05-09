
import { Award, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTotalStudentPoints } from "@/api/adminService";
import { Skeleton } from "@/components/ui/skeleton";

interface StudentStatsProps {
  userId?: string;
}

const StudentStats = ({ userId }: StudentStatsProps) => {
  const { data: studentPoints, isLoading } = useTotalStudentPoints(userId);

  // Calculate level based on points
  const getLevel = (points: number) => {
    if (points >= 500) return "Expert";
    if (points >= 300) return "Advanced";
    if (points >= 100) return "Intermediate";
    return "Beginner";
  };

  // Calculate next milestone
  const getNextMilestone = (points: number) => {
    if (points < 100) return 100;
    if (points < 300) return 300;
    if (points < 500) return 500;
    return 1000;
  };

  // Calculate current rank (placeholder for now)
  const getRank = (points: number) => {
    // This would be replaced with an actual rank from the database
    return "8th";
  };

  return (
    <Card className="mt-6 bg-gradient-to-br from-amber-50 to-white border-amber-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Star className="h-5 w-5 mr-2 text-maroon-700" />
          Your Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-8" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Points:</span>
              <span className="font-bold text-maroon-800">{studentPoints}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Rank:</span>
              <span className="font-bold text-maroon-800">{getRank(studentPoints || 0)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Level:</span>
              <span className="font-bold text-maroon-800">{getLevel(studentPoints || 0)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Next milestone:</span>
              <span className="font-bold text-maroon-800">{getNextMilestone(studentPoints || 0)} pts</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentStats;
