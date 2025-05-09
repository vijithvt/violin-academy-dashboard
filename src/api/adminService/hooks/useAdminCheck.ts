
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

      // Instead of using the potentially problematic is_admin RPC,
      // query the profiles table directly
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", sessionData.session.user.id)
        .single();
      
      if (error) {
        console.error("Error fetching user role:", error);
        setIsAdmin(false);
        return;
      }
      
      // Check if role is admin
      setIsAdmin(data?.role === 'admin');
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
