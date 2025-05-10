
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

// Hook to check if the current user is an admin
export const useAdminCheck = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const checkAdminStatus = useCallback(async () => {
    try {
      setLoading(true);
      
      // First, check if we have a session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setIsAdmin(false);
        return;
      }
      
      // Now call the is_admin function to check admin status
      const { data, error } = await supabase.rpc('is_admin');
      
      if (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
        return;
      }
      
      setIsAdmin(data);
    } catch (error) {
      console.error("Unexpected error in admin check:", error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }, []);

  return { isAdmin, loading, checkAdminStatus };
};

// Also export as default
export default useAdminCheck;
