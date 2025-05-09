
// Re-export all services for easier imports
export * from './profileService';
export * from './pointsService';
export * from './trialService';

// Admin check function
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useAdminCheck = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAdminStatus = async () => {
    setLoading(true);
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsAdmin(false);
        return;
      }

      // Check if user is admin via a function call
      const { data, error } = await supabase.rpc('is_admin');
      
      if (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } else {
        setIsAdmin(!!data); // Convert to boolean
      }
    } catch (error) {
      console.error('Error in admin check:', error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  return { isAdmin, loading, checkAdminStatus };
};
