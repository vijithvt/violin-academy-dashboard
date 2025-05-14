
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Form schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get test credentials from location state if available
  const testEmail = location.state?.testEmail;
  const isTestLogin = location.state?.isTestLogin;

  // Form initialization
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: testEmail || "",
      password: "",
    },
  });

  // Pre-fill email field if test login
  useEffect(() => {
    if (testEmail && isTestLogin) {
      form.setValue("email", testEmail);
      toast({
        title: "Test Login Mode",
        description: "Email pre-filled for testing. Please enter the password.",
      });
    }
  }, [testEmail, form, toast, isTestLogin]);

  // Handle form submission
  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Sign in with provided credentials
      const { data: authData, error: loginError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
      });
      
      if (loginError) {
        setError("Invalid email or password. Please try again.");
        toast({
          title: "Login failed",
          description: loginError.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Step 2: Check if user exists and has admin role
      if (authData.user) {
        try {
          // Using RPC function instead of direct select to avoid recursive policy issues
          const { data: isAdmin, error: rpcError } = await supabase.rpc('is_admin');
          
          if (rpcError) {
            console.error("Error checking admin status:", rpcError);
            // Sign out user if we can't verify their admin status
            await supabase.auth.signOut();
            setError("Unable to verify admin status. Please contact support.");
            toast({
              title: "Authentication error",
              description: "Failed to verify admin status",
              variant: "destructive",
            });
          } else if (isAdmin === true) {
            // User is verified as an admin
            toast({
              title: "Login successful",
              description: "Welcome to admin dashboard!",
            });
            // Updated to use the correct path
            navigate("/dashboard/admin");
          } else {
            // User is authenticated but not an admin
            await supabase.auth.signOut();
            setError("You do not have admin privileges. Access denied.");
            toast({
              title: "Access denied",
              description: "You do not have admin privileges.",
              variant: "destructive",
            });
          }
        } catch (err) {
          console.error("Admin check error:", err);
          await supabase.auth.signOut();
          setError("An error occurred during admin verification.");
          toast({
            title: "Verification error",
            description: "An error occurred verifying your admin status",
            variant: "destructive",
          });
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-900 mb-2">Violin Academy</h1>
          <p className="text-gray-600">Admin Portal</p>
        </div>

        <Card className="shadow-lg border-indigo-100">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="admin@example.com" 
                          {...field}
                          disabled={isLoading}
                        />
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
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error && (
                  <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-indigo-700 hover:bg-indigo-800"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            <p>Secure access for authorized personnel only</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
