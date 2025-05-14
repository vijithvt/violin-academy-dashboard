
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "@/context/SupabaseContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SimpleStudentRegistrationForm from "@/components/admin/SimpleStudentRegistrationForm";

const AdminSimpleStudentRegistration = () => {
  const { supabase, user } = useSupabase();
  const navigate = useNavigate();
  
  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        navigate("/admin-login");
        return;
      }
      
      try {
        const { data, error } = await supabase.rpc('is_admin_secure');
        
        if (error || !data) {
          console.error("Error checking admin status:", error);
          navigate("/");
        }
      } catch (error) {
        console.error("Admin check exception:", error);
        navigate("/admin-login");
      }
    };
    
    checkAdmin();
  }, [user, navigate, supabase]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-2xl font-bold">Student Registration</h1>
              <p className="text-indigo-200">Add a new student account</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button 
                variant="outline" 
                className="bg-white text-indigo-700 hover:bg-indigo-50"
                onClick={() => navigate("/dashboard/admin")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <SimpleStudentRegistrationForm />
      </div>
    </div>
  );
};

export default AdminSimpleStudentRegistration;
