
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface TopStudent {
  id: string;
  name: string;
  points: number;
  rank: number;
}

const TopStudents = () => {
  const [topStudents, setTopStudents] = useState<TopStudent[]>([
    // Default mock data until real data is loaded from Supabase
    { id: "1", name: "Aishwarya", points: 350, rank: 1 },
    { id: "2", name: "Rohit", points: 310, rank: 2 },
    { id: "3", name: "Sneha", points: 290, rank: 3 },
    { id: "4", name: "Arjun", points: 265, rank: 4 },
    { id: "5", name: "Priya", points: 240, rank: 5 },
  ]);
  
  useEffect(() => {
    const fetchTopStudents = async () => {
      try {
        // In a real implementation, you would fetch this data from Supabase
        // For now, we'll use the mock data
        // Example of how this might work with real data:
        // const { data, error } = await supabase
        //   .from('profiles')
        //   .select('id, name, points')
        //   .order('points', { ascending: false })
        //   .limit(5);
        
        // if (error) throw error;
        // if (data) {
        //   setTopStudents(data.map((student, index) => ({
        //     ...student,
        //     rank: index + 1
        //   })));
        // }
      } catch (error) {
        console.error("Error fetching top students:", error);
      }
    };

    fetchTopStudents();
  }, []);

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
  
  return (
    <Card className="bg-gradient-to-br from-maroon-50 to-white border-maroon-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Award className="h-5 w-5 mr-2 text-maroon-700" />
          Top Students
        </CardTitle>
        <CardDescription>Students with the highest points</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default TopStudents;
