
import { createContext, useContext, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

type SupabaseContextType = {
  supabaseClient: typeof supabase;
};

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  
  return context;
};

export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [supabaseClient] = useState(() => supabase);
  
  return (
    <SupabaseContext.Provider value={{ supabaseClient }}>
      {children}
    </SupabaseContext.Provider>
  );
};
