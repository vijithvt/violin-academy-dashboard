
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Student Points Types
export interface StudentPoints {
  id: string;
  user_id: string;
  points_change: number;
  activity: string;
  created_at: string;
}

export interface TopStudent {
  id: string;
  name: string;
  points: number;
  rank: number;
}

// Trial Request Types
export interface TrialRequest {
  id: string;
  name: string;
  email: string;
  mobile_number: string;
  whatsapp_number: string | null;
  student_name: string;
  age: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
  course: string;
  level: string;
  preferred_time: string | null;
  status: string;
  notes: string | null;
  created_at: string;
}

// Student Profile Types
export interface StudentProfile {
  id: string;
  name: string;
  email?: string;
  role: string;
  created_at: string;
}

// Hook to fetch student points history
export const useStudentPoints = (userId?: string) => {
  return useQuery({
    queryKey: ["studentPoints", userId],
    queryFn: async () => {
      // If no user ID is provided, return empty array
      if (!userId) {
        return [] as StudentPoints[];
      }

      const { data, error } = await supabase
        .from("student_points")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data as StudentPoints[];
    },
    enabled: !!userId
  });
};

// Hook to fetch total points for a student
export const useTotalStudentPoints = (userId?: string) => {
  return useQuery({
    queryKey: ["totalPoints", userId],
    queryFn: async () => {
      if (!userId) return 0;

      const { data, error } = await supabase
        .rpc("get_total_points", { user_id_param: userId });

      if (error) {
        throw new Error(error.message);
      }

      return data as number;
    },
    enabled: !!userId
  });
};

// Function to add points to a student
export const addPointsToStudent = async (
  userId: string,
  points: number,
  activity: string
) => {
  try {
    const { data, error } = await supabase
      .from("student_points")
      .insert({
        user_id: userId,
        activity,
        points_change: points
      })
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error adding points:", error);
    throw error;
  }
};

// Hook to fetch top students
export const useTopStudents = (limit: number = 5) => {
  return useQuery({
    queryKey: ["topStudents", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc("get_top_students", { limit_param: limit });

      if (error) {
        throw new Error(error.message);
      }

      return data as TopStudent[];
    }
  });
};

// Hook to fetch all trial requests
export const useTrialRequests = (
  searchTerm: string = "",
  filters: { status?: string; course?: string } = {},
  sortOrder: "asc" | "desc" = "desc"
) => {
  return useQuery({
    queryKey: ["trialRequests", searchTerm, filters, sortOrder],
    queryFn: async () => {
      let query = supabase
        .from("free_trial_requests")
        .select("*");
      
      // Apply search filter
      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);
      }
      
      // Apply status filter
      if (filters.status && filters.status !== "all") {
        query = query.eq("status", filters.status);
      }
      
      // Apply course filter
      if (filters.course && filters.course !== "all") {
        query = query.eq("course", filters.course);
      }
      
      // Apply sorting
      query = query.order("created_at", { ascending: sortOrder === "asc" });
      
      const { data, error } = await query;
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as TrialRequest[];
    }
  });
};

// Hook to update trial request
export const useUpdateTrialRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      id, 
      updates 
    }: { 
      id: string; 
      updates: Partial<TrialRequest> 
    }) => {
      const { data, error } = await supabase
        .from("free_trial_requests")
        .update(updates)
        .eq("id", id)
        .select();
        
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trialRequests"] });
    }
  });
};

// Hook to delete trial request
export const useDeleteTrialRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("free_trial_requests")
        .delete()
        .eq("id", id);
        
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trialRequests"] });
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

// Import useState for the useAdminCheck hook
import { useState } from "react";
