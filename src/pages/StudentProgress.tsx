
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const StudentProgress = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8 flex items-center">
        <Button variant="outline" onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Student Progress</h1>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Student ID: {studentId}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            This page will display detailed progress information for this student.
            You can link to the StudentPracticeDetails component from here.
          </p>
          <Button 
            className="mt-4" 
            onClick={() => navigate(`/admin/student-practice/${studentId}`)}
          >
            View Practice Details
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProgress;
