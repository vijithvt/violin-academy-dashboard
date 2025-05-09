
import { ReactNode, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';

type SupabaseContextType = {
  supabaseClient: typeof supabase;
};

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
}

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const value = {
    supabaseClient: supabase,
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
}
