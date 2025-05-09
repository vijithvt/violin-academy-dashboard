
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { StudentProfile } from "./types";

// Hook to fetch student profiles
export const useStudentProfiles = (
  searchTerm: string = "",
  roleFilter: string = "all"
) => {
  return useQuery({
    queryKey: ["studentProfiles", searchTerm, roleFilter],
    queryFn: async () => {
      let query = supabase
        .from("profiles")
        .select("*");
      
      // Apply search filter
      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);
      }
      
      // Apply role filter
      if (roleFilter && roleFilter !== "all") {
        query = query.eq("role", roleFilter);
      }
      
      // Apply sorting by name
      query = query.order("name");
      
      const { data, error } = await query;
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as StudentProfile[];
    }
  });
};

// Hook to update student profile
export const useUpdateStudentProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      id, 
      updates 
    }: { 
      id: string; 
      updates: Partial<StudentProfile> 
    }) => {
      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", id)
        .select();
        
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentProfiles"] });
    }
  });
};

// Hook to delete student profile
export const useDeleteStudentProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", id);
        
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentProfiles"] });
    }
  });
};

// Hook to fetch all students (for points management)
export const useStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "student")
        .order("name");
        
      if (error) {
        throw new Error(error.message);
      }
      
      return data as StudentProfile[];
    }
  });
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
