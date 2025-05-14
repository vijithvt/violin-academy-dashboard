
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const StudentRegistrationSimple = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Simple Student Registration</h1>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p>
          This is the simple student registration form. You can implement the actual form here
          or use the AdminSimpleStudentRegistration component that was previously created.
        </p>
        <Button 
          className="mt-4" 
          onClick={() => navigate("/dashboard/admin/register-student-simple")}
        >
          Go to Admin Simple Registration
        </Button>
      </div>
    </div>
  );
};

export default StudentRegistrationSimple;
