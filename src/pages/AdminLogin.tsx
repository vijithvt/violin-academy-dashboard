import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";

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
import { Loader2, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  const { login, checkAdminStatus } = useAuth();
  
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
      const { error: loginError } = await login(values.email, values.password);
      
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
      
      // Step 2: Check if user is admin
      const isAdmin = await checkAdminStatus();
      
      if (isAdmin) {
        // User is verified as an admin
        toast({
          title: "Login successful",
          description: "Welcome to admin dashboard!",
        });
        navigate("/dashboard");
      } else {
        // User is authenticated but not an admin
        setError("You do not have admin privileges. Access denied.");
        toast({
          title: "Access denied",
          description: "You do not have admin privileges.",
          variant: "destructive",
        });
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Functions to navigate to different sections
  const navigateToSection = (section: string) => {
    if (section === 'home') {
      navigate('/');
    } else if (section === 'contact') {
      window.open('mailto:admin@violinacademy.com', '_blank');
    } else if (section === 'help') {
      toast({
        title: "Help Information",
        description: "For assistance, please contact our support team at admin@violinacademy.com",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white p-4">
      {/* Top Navigation Bar */}
      <div className="w-full max-w-4xl mb-8">
        <Menubar className="border-none bg-transparent">
          <MenubarMenu>
            <MenubarTrigger className="text-indigo-900 font-semibold">Academy</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => navigateToSection('home')}>Home Page</MenubarItem>
              <MenubarItem onClick={() => navigateToSection('courses')}>Courses</MenubarItem>
              <MenubarItem onClick={() => navigateToSection('about')}>About Us</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          
          <MenubarMenu>
            <MenubarTrigger className="text-indigo-900 font-semibold">Students</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => navigate('/login')}>Student Login</MenubarItem>
              <MenubarItem onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSc7NvHejvLzY_bOXUUr1ud4aehT4btulEktJm8_dnGKBB4-CQ/viewform', '_blank')}>
                Admission Form
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          
          <MenubarMenu>
            <MenubarTrigger className="text-indigo-900 font-semibold">Support</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => navigateToSection('contact')}>Contact Us</MenubarItem>
              <MenubarItem onClick={() => navigateToSection('help')}>Help</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

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
          <CardFooter className="flex flex-col space-y-2 text-sm text-muted-foreground">
            <p className="text-center">Secure access for authorized personnel only</p>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-xs text-indigo-600 cursor-help">
                    <Info className="h-3 w-3 mr-1" />
                    <span>Need help?</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Contact the system administrator for account issues</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
