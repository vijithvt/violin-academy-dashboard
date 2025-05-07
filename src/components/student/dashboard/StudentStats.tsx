
import { Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StudentStatsProps {
  stats: {
    studentPoints: number;
  };
}

const StudentStats = ({ stats }: StudentStatsProps) => {
  return (
    <Card className="mt-6 bg-gradient-to-br from-amber-50 to-white border-amber-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Award className="h-5 w-5 mr-2 text-maroon-700" />
          Your Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Points:</span>
            <span className="font-bold text-maroon-800">{stats.studentPoints}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Rank:</span>
            <span className="font-bold text-maroon-800">8th</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Level:</span>
            <span className="font-bold text-maroon-800">Beginner</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Next milestone:</span>
            <span className="font-bold text-maroon-800">200 pts</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentStats;
