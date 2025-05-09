
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStudentPoints } from "@/api/adminService";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

interface PointsHistoryProps {
  userId?: string;
}

const PointsHistory = ({ userId }: PointsHistoryProps) => {
  const { data: pointsHistory, isLoading } = useStudentPoints(userId);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  // Get badge color based on points value
  const getBadgeColor = (points: number) => {
    if (points > 0) return "bg-green-100 text-green-800";
    if (points < 0) return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <Card className="bg-white border-amber-100 mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Star className="h-5 w-5 mr-2 text-maroon-700" />
          Points History
        </CardTitle>
        <CardDescription>Your recent activities and points</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <Skeleton className="h-4 w-40 mb-1" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-5 w-12 rounded-full" />
              </div>
            ))}
          </div>
        ) : pointsHistory && pointsHistory.length > 0 ? (
          <div className="max-h-64 overflow-y-auto">
            {pointsHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{item.activity}</p>
                  <p className="text-xs text-gray-500">{formatDate(item.created_at)}</p>
                </div>
                <Badge variant="outline" className={`${getBadgeColor(item.points_change)}`}>
                  {item.points_change > 0 ? `+${item.points_change}` : item.points_change}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-4">No points activity yet</p>
        )}
      </CardContent>
    </Card>
  );
};

export default PointsHistory;
