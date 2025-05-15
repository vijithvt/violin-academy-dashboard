
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSupabase } from "@/context/SupabaseContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, User, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useSupabase();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await login(email, password);
      if (error) throw error;
      
      toast({
        title: "Login successful",
        description: "Redirecting you to dashboard...",
      });
      
      navigate('/dashboard/student');
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,1000 C150,800 350,600 500,600 C650,600 850,800 1000,1000" fill="none" stroke="#8B4513" strokeWidth="2"/>
            <path d="M0,900 C150,700 350,500 500,500 C650,500 850,700 1000,900" fill="none" stroke="#8B4513" strokeWidth="2"/>
            <path d="M0,800 C150,600 350,400 500,400 C650,400 850,600 1000,800" fill="none" stroke="#8B4513" strokeWidth="2"/>
          </svg>
        </div>
      </div>
      
      <div className="absolute top-0 left-0 right-0 bg-maroon-900 text-white py-4 px-6 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="font-serif text-xl font-bold text-amber-100">Violin Academy</Link>
          <div className="flex gap-4">
            <Link to="/" className="text-white hover:text-amber-200 transition-colors">Home</Link>
            <Link to="/blogs" className="text-white hover:text-amber-200 transition-colors">Blog</Link>
            <Link to="/admin-login" className="text-white hover:text-amber-200 transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
      
      <motion.div 
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg mt-16 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-serif font-bold text-maroon-900">Student Login</h1>
          <p className="text-gray-600">Access your Violin Academy student account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
                className="pl-10 w-full"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 w-full"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-maroon-800 hover:bg-maroon-700 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </>
            )}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact your instructor or email{" "}
            <a href="mailto:vijithviolinist@gmail.com" className="text-maroon-700 hover:text-maroon-900 font-medium">
              vijithviolinist@gmail.com
            </a>
          </p>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500 text-center">
            Don't have an account?{" "}
            <a 
              href="https://wa.me/919496315903" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-maroon-700 hover:text-maroon-900"
            >
              Contact us to enroll
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
