
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const StudentRegistration = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Student Registration</h1>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Complete Student Registration Form</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-500">
            This is a placeholder for the full student registration form.
            You can use the simplified registration form for quick student creation.
          </p>
          <Button onClick={() => navigate("/student-registration-simple")}>
            Go to Simple Registration
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentRegistration;
