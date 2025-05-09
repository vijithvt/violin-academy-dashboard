
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
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
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

// Form schema with validations
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email"),
  mobileNumber: z.string().min(10, "Mobile number must be at least 10 digits"),
  whatsappNumber: z.string().min(10, "WhatsApp number must be at least 10 digits"),
  studentName: z.string().min(2, "Student name must be at least 2 characters").max(100),
  age: z.string().min(1, "Please enter age"),
  country: z.string().min(1, "Please select a country"),
  state: z.string().min(1, "Please select a state"),
  city: z.string().min(1, "Please enter city"),
  timezone: z.string().min(1, "Please select a timezone"),
  course: z.string().min(1, "Please select a course"),
  level: z.string().min(1, "Please select a level"),
  preferredTime: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface FreeTrialFormProps {
  onClose: () => void;
}

const FreeTrialForm = ({ onClose }: FreeTrialFormProps) => {
  const [loading, setLoading] = useState(false);
  const [showPreferredTime, setShowPreferredTime] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobileNumber: "",
      whatsappNumber: "",
      studentName: "",
      age: "",
      country: "",
      state: "",
      city: "",
      timezone: "",
      course: "",
      level: "",
      preferredTime: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      // Store data in Supabase using the correct table name and field structure
      const { data, error } = await supabase
        .from('free_trial_requests')
        .insert({
          name: values.name,
          email: values.email,
          mobile_number: values.mobileNumber,
          whatsapp_number: values.whatsappNumber,
          student_name: values.studentName,
          age: values.age,
          country: values.country,
          state: values.state,
          city: values.city,
          timezone: values.timezone,
          course: values.course,
          level: values.level,
          preferred_time: values.preferredTime || null,
          status: 'new',
        });

      if (error) throw error;

      // Trigger email notification function
      await supabase.functions.invoke('send-trial-notification', {
        body: {
          name: values.name,
          email: values.email,
          studentName: values.studentName,
          course: values.course,
          mobileNumber: values.mobileNumber
        }
      });

      toast({
        title: "Request Submitted!",
        description: "We will contact you shortly to schedule your free trial.",
      });
      
      onClose();
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Error",
        description: error.message || "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-serif font-bold text-maroon-800">Book Your Free Trial Class</h2>
        <p className="text-gray-600 mt-1">Experience the joy of learning Carnatic violin</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Guardian/Parent Details Section */}
          <div>
            <h3 className="text-lg font-medium text-maroon-800 mb-3">Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} />
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
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="With country code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="whatsappNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp Number</FormLabel>
                    <FormControl>
                      <Input placeholder="With country code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator />

          {/* Student Details Section */}
          <div>
            <h3 className="text-lg font-medium text-maroon-800 mb-3">Student Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="studentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Student's full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input placeholder="Student's age" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        // Reset state when country changes
                        form.setValue("state", "");
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="canada">Canada</SelectItem>
                        <SelectItem value="australia">Australia</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State/Province</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {form.watch("country") === "india" ? (
                          <>
                            <SelectItem value="kerala">Kerala</SelectItem>
                            <SelectItem value="karnataka">Karnataka</SelectItem>
                            <SelectItem value="tamil_nadu">Tamil Nadu</SelectItem>
                            <SelectItem value="andhra_pradesh">Andhra Pradesh</SelectItem>
                            <SelectItem value="telangana">Telangana</SelectItem>
                            <SelectItem value="other_india">Other</SelectItem>
                          </>
                        ) : form.watch("country") === "usa" ? (
                          <>
                            <SelectItem value="california">California</SelectItem>
                            <SelectItem value="texas">Texas</SelectItem>
                            <SelectItem value="new_york">New York</SelectItem>
                            <SelectItem value="other_usa">Other</SelectItem>
                          </>
                        ) : (
                          <SelectItem value="other_state">Other</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Your city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Zone</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time zone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="IST">Indian Standard Time (IST)</SelectItem>
                        <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                        <SelectItem value="CST">Central Time (CST)</SelectItem>
                        <SelectItem value="MST">Mountain Time (MST)</SelectItem>
                        <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                        <SelectItem value="GMT">Greenwich Mean Time (GMT)</SelectItem>
                        <SelectItem value="other_timezone">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator />

          {/* Course Details Section */}
          <div>
            <h3 className="text-lg font-medium text-maroon-800 mb-3">Course Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Course</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        setShowPreferredTime(value === "one_to_one" || value === "home_tuition");
                      }} 
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="one_to_one">1-to-1 Online Course</SelectItem>
                        <SelectItem value="batch_class">Online Batch Class</SelectItem>
                        <SelectItem value="home_tuition">Home Tuition</SelectItem>
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
                    <FormLabel>Current Level</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {showPreferredTime && (
                <FormField
                  control={form.control}
                  name="preferredTime"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Preferred Days & Time</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="E.g. Weekdays evening or Weekend mornings" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-maroon-700 hover:bg-maroon-800">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Submitting...
                </>
              ) : (
                "Book Free Trial"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FreeTrialForm;
