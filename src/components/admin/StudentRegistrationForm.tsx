
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

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
  heardFrom: z.enum(["friend", "youtube", "website", "other"]),
  referralDetails: z.string().optional(),
  
  // The photo will be handled separately
  password: z.string().min(6, "Password must be at least 6 characters")
});

// Type for form data
type StudentFormData = z.infer<typeof studentFormSchema>;

// Available time slots
const TIME_SLOTS = [
  "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM",
  "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM"
];

// Available days
const DAYS_OF_WEEK = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

export const StudentRegistrationForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState("");
  const [activeTab, setActiveTab] = useState<string>("general");
  
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
      parentName: "",
      mobileNumber: "",
      email: "",
      address: "",
      preferredCourse: "onlineOneToOne",
      preferredTimings: [],
      preferredDays: [],
      studentName: "",
      gender: "male",
      profession: "",
      learningLevel: "novice",
      heardFrom: "website",
      referralDetails: "",
      password: ""
    },
  });

  // Handle photo upload
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPhotoError("");
    
    if (!file) {
      return;
    }
    
    // Validate file size (max 1MB)
    if (file.size > 1024 * 1024) {
      setPhotoError("Photo size must be less than 1MB");
      return;
    }
    
    // Validate file type
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setPhotoError("Only JPEG, PNG, and WebP images are allowed");
      return;
    }
    
    setPhotoFile(file);
  };
  
  // Handle timings change for a specific day
  const handleDayTimingsChange = (day: string, timeSlot: string) => {
    setDaySpecificTimings(prev => {
      const currentTimings = [...(prev[day] || [])];
      if (currentTimings.includes(timeSlot)) {
        return {
          ...prev,
          [day]: currentTimings.filter(slot => slot !== timeSlot)
        };
      } else {
        return {
          ...prev,
          [day]: [...currentTimings, timeSlot]
        };
      }
    });
  };
  
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
          day_specific_timings: useDaySpecificTimings ? daySpecificTimings : null
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
      
      toast({
        title: "Student registered successfully",
        description: `${data.studentName} has been added to the system.`,
      });
      
      navigate("/dashboard/students");
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-semibold border-b pb-2">Contact Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="parentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent/Guardian Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="Mobile number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email ID *</FormLabel>
                  <FormControl>
                    <Input placeholder="Email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address (House Name, Locality, Pincode) *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Full address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-semibold border-b pb-2">Course Details</h2>
          
          <FormField
            control={form.control}
            name="preferredCourse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Course *</FormLabel>
                <FormControl>
                  <RadioGroup 
                    onValueChange={field.onChange} 
                    value={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="homeTuition" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Home Tuition
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="onlineOneToOne" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Online 1-to-1 Class
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="onlineBatch" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Online Batch Class
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferredDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Days *</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2">
                    {DAYS_OF_WEEK.map((day) => {
                      const isSelected = field.value.includes(day);
                      return (
                        <Button
                          key={day}
                          type="button"
                          variant={isSelected ? "default" : "outline"}
                          onClick={() => {
                            if (isSelected) {
                              field.onChange(field.value.filter(item => item !== day));
                            } else {
                              field.onChange([...field.value, day]);
                            }
                          }}
                          className="h-8"
                        >
                          {day}
                        </Button>
                      );
                    })}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="use-day-specific" 
                checked={useDaySpecificTimings}
                onCheckedChange={(checked) => setUseDaySpecificTimings(!!checked)}
              />
              <label 
                htmlFor="use-day-specific" 
                className="text-sm font-medium leading-none cursor-pointer"
              >
                Use different timings for each day
              </label>
            </div>
            
            {!useDaySpecificTimings ? (
              <FormField
                control={form.control}
                name="preferredTimings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Timings *</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-2">
                        {TIME_SLOTS.map((slot) => {
                          const isSelected = field.value.includes(slot);
                          return (
                            <Button
                              key={slot}
                              type="button"
                              variant={isSelected ? "default" : "outline"}
                              onClick={() => {
                                if (isSelected) {
                                  field.onChange(field.value.filter(item => item !== slot));
                                } else {
                                  field.onChange([...field.value, slot]);
                                }
                              }}
                              className="h-8"
                            >
                              {slot}
                            </Button>
                          );
                        })}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Day-Specific Timings</h3>
                
                <Tabs defaultValue="Monday">
                  <TabsList className="mb-4 flex flex-wrap">
                    {DAYS_OF_WEEK.map(day => (
                      <TabsTrigger key={day} value={day} className="text-xs sm:text-sm">
                        {day}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {DAYS_OF_WEEK.map(day => (
                    <TabsContent key={day} value={day}>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">{day} Time Slots</h4>
                        <div className="flex flex-wrap gap-2">
                          {TIME_SLOTS.map((slot) => {
                            const isSelected = daySpecificTimings[day]?.includes(slot);
                            return (
                              <Button
                                key={`${day}-${slot}`}
                                type="button"
                                variant={isSelected ? "default" : "outline"}
                                onClick={() => handleDayTimingsChange(day, slot)}
                                className="h-8"
                              >
                                {slot}
                              </Button>
                            );
                          })}
                        </div>
                        {daySpecificTimings[day]?.length === 0 && (
                          <p className="text-xs text-amber-600">
                            Please select at least one time slot for {day}
                          </p>
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-semibold border-b pb-2">Student Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="studentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Student's full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Birth *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select date of birth</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        captionLayout="dropdown-buttons"
                        fromYear={1900}
                        toYear={new Date().getFullYear()}
                        className="rounded-md border shadow"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender *</FormLabel>
                  <FormControl>
                    <RadioGroup 
                      onValueChange={field.onChange} 
                      value={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="font-normal">Male</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="font-normal">Female</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profession *</FormLabel>
                  <FormControl>
                    <Input placeholder="Student's profession" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="learningLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Learning Level *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a learning level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="novice">Novice</SelectItem>
                      <SelectItem value="beginner">Beginner (Varisas - Alankara)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (Geetham - Swarajathy)</SelectItem>
                      <SelectItem value="advanced">Advanced (Varnams - Krithies)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Set Password *</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Set a password for student login" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <FormLabel>Upload Photo (Max 1MB) *</FormLabel>
            <div className="mt-1">
              <div className="flex items-center gap-4">
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <div className="flex items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg hover:bg-gray-50">
                    {photoFile ? (
                      <img
                        src={URL.createObjectURL(photoFile)}
                        alt="Preview"
                        className="object-cover w-full h-full rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center p-4 text-gray-500">
                        <Upload className="w-6 h-6 mb-2" />
                        <span className="text-xs text-center">Click to upload</span>
                      </div>
                    )}
                  </div>
                </label>
                <Input 
                  id="photo-upload"
                  type="file" 
                  className="hidden"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhotoChange}
                />
                {photoFile && (
                  <div className="text-sm text-gray-500">
                    {photoFile.name} ({Math.round(photoFile.size / 1024)} KB)
                  </div>
                )}
              </div>
              {photoError && (
                <p className="mt-1 text-sm text-red-500">{photoError}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-semibold border-b pb-2">Referral Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="heardFrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How did you hear about this class? *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="friend">Friend / Referral</SelectItem>
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
              name="referralDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Referral (if any)</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of existing student who referred you" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
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
    </Form>
  );
};

export default StudentRegistrationForm;
