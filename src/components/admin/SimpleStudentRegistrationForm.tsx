
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Loader2, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  studentName: z.string().min(2, {
    message: "Student name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  level: z.enum(["novice", "beginner", "intermediate", "advanced", "professional"]),
});

type FormValues = z.infer<typeof formSchema>;

const SimpleStudentRegistrationForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "",
      email: "",
      password: "",
      level: "beginner",
    },
  });

  // Map level to display names
  const levelDisplayMap = {
    novice: "Novice",
    beginner: "AARAMBHA (Beginner)",
    intermediate: "MADHYAMA (Intermediate)",
    advanced: "UTTHAMA (Advanced)",
    professional: "VIDHWATH (Professional)",
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // 1. Create the user account using standard signup method
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.studentName,
          },
        }
      });
      
      if (authError) {
        throw new Error(authError.message);
      }
      
      if (!authData.user) {
        throw new Error("Failed to create user account");
      }
      
      // 2. Update the profile name and student profile with level
      const { error: profileUpdateError } = await supabase
        .from("profiles")
        .update({ name: values.studentName })
        .eq("id", authData.user.id);
      
      if (profileUpdateError) {
        console.warn(`Profile update warning: ${profileUpdateError.message}`);
      }
      
      // 3. Create student profile with level
      const { error: studentProfileError } = await supabase
        .from("student_profiles")
        .insert({
          user_id: authData.user.id,
          learning_level: values.level,
          // Adding minimal required fields to satisfy not-null constraints
          parent_name: values.studentName,
          mobile_number: "Not provided",
          address: "Not provided",
          preferred_course: "onlineOneToOne",
          preferred_timings: ["evening"],
          date_of_birth: new Date().toISOString().split('T')[0],
          gender: "not_specified",
          profession: "Student",
          heard_from: "admin"
        });
        
      if (studentProfileError) {
        console.warn(`Student profile update warning: ${studentProfileError.message}`);
      }
      
      // 4. Success message and redirect
      toast({
        title: "Student registered successfully",
        description: `${values.studentName} has been registered with level ${levelDisplayMap[values.level]}`,
      });
      
      // Reset form
      form.reset();
      
      // Redirect back to admin dashboard
      navigate("/dashboard/admin");
      
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: error.message || "Failed to register student",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Register New Student
        </CardTitle>
        <CardDescription>
          Create a basic student account with login credentials
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="studentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter student's full name" {...field} />
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
                    <Input type="email" placeholder="student@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Create a secure password" {...field} />
                  </FormControl>
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
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="beginner">AARAMBHA (Beginner)</SelectItem>
                      <SelectItem value="intermediate">MADHYAMA (Intermediate)</SelectItem>
                      <SelectItem value="advanced">UTTHAMA (Advanced)</SelectItem>
                      <SelectItem value="professional">VIDHWATH (Professional)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                <>Register Student</>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SimpleStudentRegistrationForm;
