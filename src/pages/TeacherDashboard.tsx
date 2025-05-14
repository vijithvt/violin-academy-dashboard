
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TeacherDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Teacher Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Students</CardTitle>
            <CardDescription>Manage your students</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Coming soon: View and manage student profiles</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
            <CardDescription>Upcoming lessons</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Coming soon: View and manage your teaching schedule</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Lesson Plans</CardTitle>
            <CardDescription>Your teaching materials</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Coming soon: Create and manage lesson plans</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
