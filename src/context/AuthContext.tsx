
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

// Define the context type
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isAdmin: boolean | null;
  login: (email: string, password: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  checkAdminStatus: () => Promise<boolean>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  // Handle user login - now using Supabase
  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  // Handle user logout - now using Supabase
  const logout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(null); // Reset admin status on logout
  };

  // Check if the user is an admin
  const checkAdminStatus = async () => {
    try {
      if (!currentUser) {
        setIsAdmin(false);
        return false;
      }
      
      const { data, error } = await supabase.rpc('is_admin');
      
      if (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
        return false;
      }
      
      setIsAdmin(data);
      return data;
    } catch (error) {
      console.error("Error in checkAdminStatus:", error);
      setIsAdmin(false);
      return false;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    // Check active session and set the user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
      
      if (user) {
        // Check admin status if user exists
        await checkAdminStatus();
      } else {
        setIsAdmin(null);
      }
      
      setLoading(false);
    };

    getUser();

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setCurrentUser(session?.user ?? null);
        
        if (session?.user) {
          // Check admin status when auth state changes
          await checkAdminStatus();
        } else {
          setIsAdmin(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    loading,
    isAdmin,
    login,
    logout,
    checkAdminStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
