
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Upload, Calendar, ClipboardList } from "lucide-react";

const PracticeSuccessTips = () => {
  return (
    <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-maroon-700" />
          Tips for Success
        </CardTitle>
        <CardDescription>
          Follow these guidelines to maximize your learning
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          <li className="flex items-start bg-white p-3 rounded-md border border-amber-100 shadow-sm">
            <Upload className="h-5 w-5 text-maroon-700 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-maroon-800">Record weekly practice</p>
              <p className="text-sm text-gray-600">Upload your recordings via the student dashboard for feedback</p>
            </div>
          </li>
          
          <li className="flex items-start bg-white p-3 rounded-md border border-amber-100 shadow-sm">
            <Calendar className="h-5 w-5 text-maroon-700 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-maroon-800">Stay consistent</p>
              <p className="text-sm text-gray-600">Even 15-30 minutes of daily practice builds long-term skill</p>
            </div>
          </li>
          
          <li className="flex items-start bg-white p-3 rounded-md border border-amber-100 shadow-sm">
            <ClipboardList className="h-5 w-5 text-maroon-700 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-maroon-800">Track your progress</p>
              <p className="text-sm text-gray-600">Use your practice journal to set goals and monitor improvement</p>
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default PracticeSuccessTips;
