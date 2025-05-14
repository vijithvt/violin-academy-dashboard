
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentRegistrationForm from "@/components/admin/StudentRegistrationForm";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PublicStudentRegistration = () => {
  const { trialId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(trialId ? true : false);
  const [trialData, setTrialData] = useState<any>(null);
  
  // Verify the trial ID and fetch the trial data if it exists
  useEffect(() => {
    const verifyTrialId = async () => {
      if (!trialId) {
        // No trial ID means this is direct registration from admin dashboard
        setIsVerifying(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from("free_trial_requests")
          .select("*")
          .eq("id", trialId)
          .eq("status", "completed") // Only allow registration for completed trials
          .single();
          
        if (error || !data) {
          throw new Error("Trial not found or not completed yet");
        }
        
        setTrialData(data);
      } catch (error) {
        console.error("Error verifying trial:", error);
        toast({
          title: "Invalid registration link",
          description: "This registration link is invalid, has expired, or the trial has not been completed",
          variant: "destructive"
        });
        navigate("/");
      } finally {
        setIsVerifying(false);
      }
    };
    
    if (trialId) {
      verifyTrialId();
    }
  }, [trialId, toast, navigate]);

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Verifying registration link...</span>
      </div>
    );
  }

  const isAdminDirectRegistration = !trialId;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-4">
      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-indigo-900">
            {isAdminDirectRegistration 
              ? "Register New Student" 
              : "Complete Your Registration"
            }
          </h1>
          <p className="text-gray-600 mt-2">
            {isAdminDirectRegistration 
              ? "Fill out the form below to register a new student" 
              : "Thank you for attending your trial class! Please complete your registration below."
            }
          </p>
        </div>
        
        {trialData && (
          <div className="mb-8 bg-indigo-50 rounded-lg border border-indigo-100 p-4">
            <h2 className="text-lg font-medium text-indigo-800">Trial Information</h2>
            <p className="text-gray-700">Student Name: <span className="font-semibold">{trialData.student_name}</span></p>
            <p className="text-gray-700">Course: <span className="font-semibold">{trialData.course === "one_to_one" ? "Online 1-to-1 Class" : trialData.course === "batch_class" ? "Online Batch Class" : "Home Tuition"}</span></p>
          </div>
        )}
        
        <StudentRegistrationForm 
          prefilledData={trialData && {
            studentName: trialData.student_name,
            parentName: trialData.name,
            email: trialData.email,
            mobileNumber: trialData.mobile_number,
            whatsappNumber: trialData.whatsapp_number,
            preferredCourse: trialData.course === "one_to_one" ? "onlineOneToOne" : 
                           trialData.course === "batch_class" ? "onlineBatch" : "homeTuition",
            learningLevel: trialData.level || "novice",
            trialRequestId: trialId
          }} 
          isPublic={!isAdminDirectRegistration} 
        />
      </div>
    </div>
  );
};

export default PublicStudentRegistration;
