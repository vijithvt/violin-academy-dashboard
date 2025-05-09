
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Import form section components
import ContactDetailsSection from "./registration/ContactDetailsSection";
import CourseDetailsSection from "./registration/CourseDetailsSection";
import StudentDetailsSection from "./registration/StudentDetailsSection";
import ReferralSection from "./registration/ReferralSection";

// Define the form schema with validation
const studentFormSchema = z.object({
  // Parent/Guardian Details
  parentName: z.string().min(2, "Parent name must be at least 2 characters"),
  mobileNumber: z.string().min(10, "Mobile number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  
  // Course Details
  preferredCourse: z.enum(["homeTuition", "onlineOneToOne", "onlineBatch"]),
  preferredTimings: z.array(z.string()).min(1, "Select at least one time slot"),
  preferredDays: z.array(z.string()).min(1, "Select at least one day"),
  
  // Student Details
  studentName: z.string().min(2, "Student name must be at least 2 characters"),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
  gender: z.enum(["male", "female"]),
  profession: z.string().min(2, "Profession must be at least 2 characters"),
  learningLevel: z.enum(["novice", "beginner", "intermediate", "advanced"]),
  
  // Referral Information
  heardFrom: z.enum(["friend", "youtube", "website", "other", "trial"]),
  referralDetails: z.string().optional(),
  
  // Password
  password: z.string().min(6, "Password must be at least 6 characters"),
  
  // Trial request ID if coming from a trial
  trialRequestId: z.string().optional()
});

// Type for form data
type StudentFormData = z.infer<typeof studentFormSchema>;

type PrefilledData = {
  studentName?: string;
  parentName?: string;
  email?: string;
  mobileNumber?: string;
  whatsappNumber?: string;
  preferredCourse?: string;
  learningLevel?: string;
  trialRequestId?: string;
};

interface StudentRegistrationFormProps {
  prefilledData?: PrefilledData;
  isPublic?: boolean;
}

export const StudentRegistrationForm = ({ prefilledData, isPublic }: StudentRegistrationFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState("");
  
  // State for day-specific timings
  const [daySpecificTimings, setDaySpecificTimings] = useState<Record<string, string[]>>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  });
  
  // State for whether to use day-specific timings
  const [useDaySpecificTimings, setUseDaySpecificTimings] = useState(false);
  
  // Initialize the form
  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      parentName: prefilledData?.parentName || "",
      mobileNumber: prefilledData?.mobileNumber || "",
      email: prefilledData?.email || "",
      address: "",
      preferredCourse: (prefilledData?.preferredCourse as any) || "onlineOneToOne",
      preferredTimings: [],
      preferredDays: [],
      studentName: prefilledData?.studentName || "",
      gender: "male",
      profession: "",
      learningLevel: (prefilledData?.learningLevel as any) || "novice",
      heardFrom: prefilledData?.trialRequestId ? "trial" : "website",
      referralDetails: "",
      password: "",
      trialRequestId: prefilledData?.trialRequestId
    },
  });
  
  // Handle form submission
  const onSubmit = async (data: StudentFormData) => {
    if (!photoFile) {
      setPhotoError("Please upload a photo");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Step 1: Register the user in auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.studentName,
          },
        }
      });
      
      if (authError) throw new Error(authError.message);
      
      if (!authData.user) {
        throw new Error("Failed to create user account");
      }
      
      // Step 2: Upload the photo
      const photoFilename = `${Date.now()}-${photoFile.name}`;
      const photoPath = `student-photos/${authData.user.id}/${photoFilename}`;
      
      const { error: uploadError } = await supabase.storage
        .from('student-assets')
        .upload(photoPath, photoFile);
        
      if (uploadError) throw new Error(`Failed to upload photo: ${uploadError.message}`);
      
      // Step 3: Create the student profile with additional details
      const { error: profileError } = await supabase
        .from('student_profiles')
        .insert({
          user_id: authData.user.id,
          parent_name: data.parentName,
          mobile_number: data.mobileNumber,
          address: data.address,
          preferred_course: data.preferredCourse,
          preferred_timings: data.preferredTimings,
          preferred_days: data.preferredDays,
          date_of_birth: format(data.dateOfBirth, 'yyyy-MM-dd'),
          gender: data.gender,
          profession: data.profession,
          learning_level: data.learningLevel,
          photo_url: photoPath,
          heard_from: data.heardFrom,
          referral_details: data.referralDetails || null,
          day_specific_timings: useDaySpecificTimings ? daySpecificTimings : null,
          trial_request_id: data.trialRequestId || null
        });
        
      if (profileError) throw new Error(profileError.message);
      
      // Step 4: Initialize student progress
      const { error: progressError } = await supabase
        .from('student_progress')
        .insert({
          user_id: authData.user.id,
          level: mapLearningLevelToProgressLevel(data.learningLevel),
          current_module: getFirstModuleForLevel(data.learningLevel),
          progress_percentage: 0,
          last_updated: new Date().toISOString()
        });
        
      if (progressError) throw new Error(progressError.message);
      
      // Step 5: If this was a trial conversion, update the trial status
      if (data.trialRequestId) {
        const { error: trialUpdateError } = await supabase
          .from('free_trial_requests')
          .update({ status: 'converted', notes: `Converted to student on ${new Date().toISOString()}` })
          .eq('id', data.trialRequestId);
          
        if (trialUpdateError) {
          console.error("Error updating trial status:", trialUpdateError);
          // Don't throw error here, as the student registration is complete
        }
      }
      
      toast({
        title: "Student registered successfully",
        description: `${data.studentName} has been added to the system.`,
      });
      
      // Navigate based on whether this is a public or admin form
      if (isPublic) {
        navigate("/");
      } else {
        navigate("/dashboard/students");
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Helper to map learning level to progress level
  const mapLearningLevelToProgressLevel = (level: string): number => {
    switch (level) {
      case "novice": return 1;
      case "beginner": return 1;
      case "intermediate": return 2;
      case "advanced": return 3;
      default: return 1;
    }
  };
  
  // Helper to get first module for level
  const getFirstModuleForLevel = (level: string): string => {
    switch (level) {
      case "novice": return "Basic Tuning";
      case "beginner": return "Varisai Practice";
      case "intermediate": return "Geethams";
      case "advanced": return "Varnams";
      default: return "Basic Tuning";
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ContactDetailsSection />
        
        <CourseDetailsSection 
          useDaySpecificTimings={useDaySpecificTimings}
          setUseDaySpecificTimings={setUseDaySpecificTimings}
          daySpecificTimings={daySpecificTimings}
          setDaySpecificTimings={setDaySpecificTimings}
        />
        
        <StudentDetailsSection 
          photoFile={photoFile}
          photoError={photoError}
          setPhotoFile={setPhotoFile}
          setPhotoError={setPhotoError}
        />
        
        <ReferralSection />
        
        {/* Hidden field for trial request ID */}
        {prefilledData?.trialRequestId && (
          <input type="hidden" name="trialRequestId" value={prefilledData.trialRequestId} />
        )}
        
        <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Registering...
            </>
          ) : (
            "Register Student"
          )}
        </Button>
      </form>
    </FormProvider>
  );
};

export default StudentRegistrationForm;
