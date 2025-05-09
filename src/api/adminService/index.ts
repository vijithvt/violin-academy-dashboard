
// Export all services from the refactored files
export * from './types';
export * from './pointsService';
export * from './trialService';
export { default as useTotalStudentPoints } from './useTotalStudentPoints';

// Import and re-export profile hooks
import useStudentProfiles from './hooks/useStudentProfiles';
import useStudentProfile from './hooks/useStudentProfile';
import useStudentExtendedProfile from './hooks/useStudentExtendedProfile';
import useUpdateStudentExtendedProfile from './hooks/useUpdateStudentExtendedProfile';
import useUpdateStudentProfile from './hooks/useUpdateStudentProfile';
import useDeleteStudentProfile from './hooks/useDeleteStudentProfile';
import useDashboardStats from './hooks/useDashboardStats';
import { useState } from "react";

// Export all profile hooks
export { 
  useStudentProfiles,
  useStudentProfile,
  useStudentExtendedProfile,
  useUpdateStudentExtendedProfile,
  useUpdateStudentProfile,
  useDeleteStudentProfile,
  useDashboardStats
};

// Hook to check if user is admin
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

// Import supabase client for useAdminCheck
import { supabase } from "@/integrations/supabase/client";
