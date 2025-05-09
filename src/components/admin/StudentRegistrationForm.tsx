
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUpdateStudentProfile, useCreateStudentProfile } from "@/api/adminService";
import { uploadStudentPhoto } from "@/lib/storage";

// Define the form schema
const studentSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).optional().or(z.literal('')),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }).optional(),
  address: z.string().optional(),
  dob: z.string().optional(),
  gender: z.string().optional(),
  role: z.string().default("student"),
  course: z.string().optional(),
  level: z.string().optional(),
  preferredTiming: z.string().optional(),
  profession: z.string().optional(),
  referredBy: z.string().optional(),
  hearAbout: z.string().optional(),
});

type StudentFormValues = z.infer<typeof studentSchema>;

interface StudentRegistrationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingProfile?: any;
  onSuccess?: () => void;
}

const StudentRegistrationForm = ({ 
  open, 
  onOpenChange,
  existingProfile,
  onSuccess
}: StudentRegistrationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const { toast } = useToast();
  const updateProfile = useUpdateStudentProfile();
  const createProfile = useCreateStudentProfile();
  
  const isEditMode = !!existingProfile;

  // Initialize the form
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: existingProfile?.name || "",
      email: existingProfile?.email || "",
      password: "",
      phone: existingProfile?.phone || "",
      address: existingProfile?.address || "",
      dob: existingProfile?.dob || "",
      gender: existingProfile?.gender || "",
      role: existingProfile?.role || "student",
      course: existingProfile?.course || "",
      level: existingProfile?.level || "",
      preferredTiming: existingProfile?.preferred_timing || "",
      profession: existingProfile?.profession || "",
      referredBy: existingProfile?.referred_by || "",
      hearAbout: existingProfile?.hear_about || "",
    },
  });

  // Load the existing photo if available
  useEffect(() => {
    if (existingProfile?.photo_url) {
      setPhotoPreview(existingProfile.photo_url);
    }
  }, [existingProfile]);

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

      // Validate file size (max 1MB)
      if (file.size > 1 * 1024 * 1024) {
        setPhotoError("Image size should be less than 1MB");
        return;
      }

      setPhoto(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearPhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
  };

  const onSubmit = async (values: StudentFormValues) => {
    setIsLoading(true);
    
    try {
      let photoUrl = existingProfile?.photo_url || null;
      
      // Upload photo if exists
      if (photo) {
        try {
          const userId = existingProfile?.id || crypto.randomUUID();
          photoUrl = await uploadStudentPhoto(photo, userId);
        } catch (error: any) {
          console.error("Error uploading photo:", error);
          toast({
            variant: "destructive",
            title: "Photo Upload Failed",
            description: "Could not upload the photo, but will proceed with profile creation."
          });
        }
      }
      
      if (isEditMode) {
        // Update existing profile
        await updateProfile.mutateAsync({
          id: existingProfile.id,
          updates: {
            name: values.name,
            email: values.email,
            role: values.role,
            phone: values.phone,
            address: values.address,
            dob: values.dob,
            gender: values.gender,
            course: values.course,
            level: values.level,
            preferred_timing: values.preferredTiming,
            profession: values.profession,
            referred_by: values.referredBy,
            hear_about: values.hearAbout,
            photo_url: photoUrl
          }
        });
        
        toast({
          title: "Profile Updated",
          description: "Student profile has been updated successfully",
        });
      } else {
        // First, create new user account with Supabase Auth if password is provided
        if (values.password) {
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
            options: {
              data: {
                name: values.name,
              }
            }
          });
          
          if (authError) {
            throw new Error(authError.message);
          }
          
          // If user was created, use that ID
          if (authData.user) {
            await createProfile.mutateAsync({
              id: authData.user.id,
              name: values.name,
              email: values.email,
              role: values.role,
              phone: values.phone,
              address: values.address,
              dob: values.dob,
              gender: values.gender,
              course: values.course,
              level: values.level,
              preferred_timing: values.preferredTiming,
              profession: values.profession,
              referred_by: values.referredBy,
              hear_about: values.hearAbout,
              photo_url: photoUrl
            });
          }
        } else {
          // Create profile directly without auth
          await createProfile.mutateAsync({
            name: values.name,
            email: values.email,
            role: values.role,
            phone: values.phone,
            address: values.address,
            dob: values.dob,
            gender: values.gender,
            course: values.course,
            level: values.level,
            preferred_timing: values.preferredTiming,
            profession: values.profession,
            referred_by: values.referredBy,
            hear_about: values.hearAbout,
            photo_url: photoUrl
          });
        }
        
        toast({
          title: "Student Registered",
          description: "New student account has been created successfully",
        });
      }
      
      // Close the dialog and refresh data
      if (onSuccess) onSuccess();
      onOpenChange(false);
      
    } catch (error: any) {
      console.error("Error creating/updating student:", error);
      toast({
        variant: "destructive",
        title: "Operation failed",
        description: error.message || "An error occurred while processing your request",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Student Profile" : "Register New Student"}</DialogTitle>
          <DialogDescription>
            {isEditMode 
              ? "Update the student's information below."
              : "Enter the student's information to create a new account."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Photo Upload Section */}
            <div className="space-y-2">
              <FormLabel>Student Photo</FormLabel>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 border rounded-md flex items-center justify-center bg-gray-50 overflow-hidden relative">
                  {photoPreview ? (
                    <>
                      <img 
                        src={photoPreview} 
                        alt="Student preview"
                        className="w-full h-full object-cover" 
                      />
                      <button
                        type="button"
                        onClick={clearPhoto}
                        className="absolute top-1 right-1 bg-white/80 rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </>
                  ) : (
                    <Upload className="h-8 w-8 text-gray-300" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="text-sm"
                  />
                  {photoError && (
                    <p className="text-xs text-red-500">{photoError}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    Upload a clear photo of the student. Max size: 1MB.
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-500">Personal Details</h3>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Student's full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="student@example.com" 
                          {...field}
                          disabled={isEditMode} // Can't change email in edit mode
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {!isEditMode && (
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Set a password" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input 
                          type="date"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
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
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="profession"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profession</FormLabel>
                      <FormControl>
                        <Input placeholder="Student's profession" {...field} />
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
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="House Name, Locality, Pincode" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Course Details */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-500">Course Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Course</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select course" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="home_tuition">Home Tuition</SelectItem>
                          <SelectItem value="online_one_to_one">Online 1-to-1 Class</SelectItem>
                          <SelectItem value="online_batch">Online Batch Class</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Learning Level</FormLabel>
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
                          <SelectItem value="aarambha">AARAMBHA (Beginner)</SelectItem>
                          <SelectItem value="madhyama">MADHYAMA (Intermediate)</SelectItem>
                          <SelectItem value="utthama">UTTHAMA (Advanced)</SelectItem>
                          <SelectItem value="vidhwath">VIDHWATH (Professional)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="preferredTiming"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Timing</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 5 PM to 7 PM" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter preferred time slots between 5 AM to 12 PM or 1 PM to 10 PM
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Referral Information */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-500">Referral Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="hearAbout"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How did you hear about us?</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select source" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="referral">Friend / Referral</SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="referredBy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Referral Name (if any)</FormLabel>
                      <FormControl>
                        <Input placeholder="Name of existing student" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Role Selection (Admin Only) */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-500">System Role</h3>
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Role</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Determines the user's permissions in the system
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading 
                  ? "Processing..." 
                  : isEditMode 
                    ? "Update Profile" 
                    : "Create Account"
                }
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default StudentRegistrationForm;
