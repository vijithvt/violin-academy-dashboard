
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TrialRequests = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Trial Requests</h1>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Trial Lesson Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 mb-4">
            This page will show all incoming trial lesson requests.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrialRequests;
