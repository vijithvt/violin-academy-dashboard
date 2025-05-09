
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Trophy } from "lucide-react";
import { useTopStudents } from "@/api/adminService";
import { Skeleton } from "@/components/ui/skeleton";

interface TopStudentProps {
  limit?: number;
}

const TopStudents = ({ limit = 5 }: TopStudentProps) => {
  const { data: topStudents, isLoading, error } = useTopStudents(limit);
  
  // Get the user's initials for the avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Get rank color
  const getRankColor = (rank: number) => {
    switch(rank) {
      case 1: return "bg-amber-500";
      case 2: return "bg-gray-400";
      case 3: return "bg-amber-700";
      default: return "bg-maroon-300";
    }
  };

  if (error) {
    console.error("Error loading top students:", error);
  }
  
  return (
    <Card className="bg-gradient-to-br from-maroon-50 to-white border-maroon-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-maroon-700" />
          Top Students
        </CardTitle>
        <CardDescription>Students with the highest points</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Skeleton className="h-7 w-7 rounded-full mr-3" />
                  <Skeleton className="h-8 w-8 rounded-full mr-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-8" />
              </div>
            ))}
          </div>
        ) : topStudents && topStudents.length > 0 ? (
          <div className="space-y-3">
            {topStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 ${getRankColor(student.rank)}`}>
                    {student.rank}
                  </div>
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback className="bg-amber-100 text-amber-800">
                      {getInitials(student.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{student.name}</span>
                </div>
                <span className="font-bold text-maroon-800">{student.points}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-4">No student data available</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TopStudents;
