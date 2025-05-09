
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Hook to check if the current user has admin privileges
 * @returns Object containing admin status and check function
 */
export const useAdminCheck = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAdminStatus = async () => {
    setLoading(true);
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        throw sessionError;
      }

      if (!sessionData.session) {
        setIsAdmin(false);
        return;
      }

      const { data, error } = await supabase.rpc('is_admin');
      
      if (error) {
        throw error;
      }
      
      setIsAdmin(data);
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  return { isAdmin, loading, checkAdminStatus };
};

export default useAdminCheck;
