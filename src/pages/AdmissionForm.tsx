
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "@/components/ui/sonner";

import { db, storage } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, ArrowLeft } from "lucide-react";

// Form validation schema
const admissionSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().min(10, "Please enter a valid mobile number"),
  gender: z.enum(["Male", "Female", "Other"]),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  guardianName: z.string().min(1, "Guardian name is required"),
  address: z.string().min(5, "Please enter a valid address"),
  learningLevel: z.enum(["Beginner", "Intermediate", "Advanced"]),
  guruName: z.string().optional(),
});

type AdmissionFormValues = z.infer<typeof admissionSchema>;

const AdmissionForm = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [storageDisabled, setStorageDisabled] = useState(false);
  const navigate = useNavigate();

  // Form initialization
  const form = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      gender: "Male",
      dateOfBirth: "",
      guardianName: "",
      address: "",
      learningLevel: "Beginner",
      guruName: "",
    },
  });

  // Handle photo upload
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError(null);
    const file = e.target.files && e.target.files[0];
    
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setPhotoError("Please upload an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setPhotoError("Image size should be less than 5MB");
        return;
      }

      setPhoto(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const onSubmit = async (values: AdmissionFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Upload photo if available
      let photoURL = "";
      if (photo && !storageDisabled) {
        try {
          const storageRef = ref(storage, `student-photos/${Date.now()}_${photo.name}`);
          const uploadResult = await uploadBytes(storageRef, photo);
          photoURL = await getDownloadURL(uploadResult.ref);
        } catch (error) {
          console.error("Storage error:", error);
          setStorageDisabled(true);
          toast.error("Photo upload failed. Student will be registered without photo.");
        }
      }

      // Add student to Firestore
      await addDoc(collection(db, "students"), {
        ...values,
        photoURL,
        createdAt: new Date().toISOString(),
      });

      toast.success("Student registered successfully!");
      // Navigate back to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="text-indigo-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-indigo-900">Student Admission Form</CardTitle>
            <CardDescription className="text-center">
              Fill out the form to register a new student
              {storageDisabled && (
                <p className="mt-2 text-orange-500 font-medium">
                  Note: Photo upload is currently unavailable. Students can be registered without photos.
                </p>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Photo upload section */}
                <div className="space-y-2">
                  <FormLabel>Student Photo {!storageDisabled && "(Optional)"}</FormLabel>
                  <div className="flex flex-col items-center sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="h-40 w-40 rounded-lg border-2 border-dashed border-indigo-300 flex items-center justify-center bg-indigo-50 overflow-hidden">
                      {photoPreview ? (
                        <img 
                          src={photoPreview} 
                          alt="Student preview" 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="text-center text-indigo-300">
                          <p className="text-sm">No photo selected</p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 flex-1">
                      {!storageDisabled && (
                        <>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="cursor-pointer"
                            id="photo-upload"
                            disabled={storageDisabled}
                          />
                          {photoError && (
                            <p className="text-sm text-red-500">{photoError}</p>
                          )}
                          <p className="text-xs text-gray-500">
                            Upload a clear photo of the student. Max size: 5MB. Recommended format: JPG, PNG
                          </p>
                        </>
                      )}
                      {storageDisabled && (
                        <p className="text-sm text-orange-500">
                          Photo upload is currently disabled due to storage limitations.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email*</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number*</FormLabel>
                        <FormControl>
                          <Input placeholder="1234567890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender*</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth*</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guardianName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guardian Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Parent/Guardian name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address*</FormLabel>
                      <FormControl>
                        <Input placeholder="Full address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Learning Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="learningLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Learning Level*</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guruName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guru Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Teacher name (optional)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-700 hover:bg-indigo-800"
                >
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Submitting..." : "Register Student"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdmissionForm;
