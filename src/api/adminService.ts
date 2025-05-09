import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

// Types
export interface TrialRequest {
  id: string;
  name: string;
  email: string;
  mobile_number: string;
  whatsapp_number: string;
  student_name: string;
  age: string;
  country: string;
  state: string;
  city: string;
  timezone: string;
  course: string;
  level: string;
  preferred_time: string | null;
  notes: string | null;
  status: string;
  created_at: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email?: string;
  role: string;
  created_at: string;
}

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

// API Calls for Trial Requests
export const useTrialRequests = (
  searchTerm: string = "",
  filterBy: { status?: string; course?: string } = {},
  sortOrder: "desc" | "asc" = "desc"
) => {
  return useQuery({
    queryKey: ["trialRequests", searchTerm, filterBy, sortOrder],
    queryFn: async () => {
      let query = supabase
        .from("free_trial_requests")
        .select("*");

      // Apply search term if provided
      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);
      }

      // Apply filters if provided and not empty strings
      if (filterBy.status && filterBy.status !== "all") {
        query = query.eq("status", filterBy.status);
      }

      if (filterBy.course && filterBy.course !== "all") {
        query = query.eq("course", filterBy.course);
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

export const useUpdateTrialRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({
      id,
      updates
    }: {
      id: string;
      updates: Partial<TrialRequest>;
    }) => {
      const { data, error } = await supabase
        .from("free_trial_requests")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trialRequests"] });
      toast({
        title: "Success",
        description: "Trial request updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update trial request: ${error.message}`,
        variant: "destructive",
      });
    }
  });
};

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

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trialRequests"] });
      toast({
        title: "Success",
        description: "Trial request deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete trial request: ${error.message}`,
        variant: "destructive",
      });
    }
  });
};

// API Calls for Student Profiles
export const useStudentProfiles = (
  searchTerm: string = "", 
  filterBy: { role?: string } = {}
) => {
  return useQuery({
    queryKey: ["studentProfiles", searchTerm, filterBy],
    queryFn: async () => {
      // First get profiles
      let query = supabase
        .from("profiles")
        .select("*");

      // Apply search if provided
      if (searchTerm) {
        query = query.ilike("name", `%${searchTerm}%`);
      }

      // Apply role filter if provided and not an empty string
      if (filterBy.role && filterBy.role !== "all") {
        query = query.eq("role", filterBy.role);
      }

      const { data: profiles, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return profiles as StudentProfile[];
    },
  });
};

export const useUpdateStudentProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({
      id,
      updates
    }: {
      id: string;
      updates: Partial<StudentProfile>;
    }) => {
      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentProfiles"] });
      toast({
        title: "Success",
        description: "Student profile updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update student profile: ${error.message}`,
        variant: "destructive",
      });
    }
  });
};

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

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentProfiles"] });
      toast({
        title: "Success",
        description: "Student profile deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete student profile: ${error.message}`,
        variant: "destructive",
      });
    }
  });
};

// API Calls for Student Points
export const useStudentPoints = (userId?: string) => {
  return useQuery({
    queryKey: ["studentPoints", userId],
    queryFn: async () => {
      let query = supabase.from("student_points");
      
      // Filter by user_id if provided
      if (userId) {
        query = query.eq("user_id", userId);
      }

      query = query.order("created_at", { ascending: false });

      const { data, error } = await query.select();

      if (error) {
        throw new Error(error.message);
      }

      return data as StudentPoints[];
    },
    enabled: !!userId
  });
};

export const useTotalStudentPoints = (userId?: string) => {
  return useQuery({
    queryKey: ["totalStudentPoints", userId],
    queryFn: async () => {
      // If no user ID is provided, get the current user's ID
      let id = userId;
      
      if (!id) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");
        id = user.id;
      }

      const { data, error } = await supabase.rpc('get_total_points', { user_id_param: id });

      if (error) {
        throw new Error(error.message);
      }

      return data as number;
    },
    enabled: !!userId
  });
};

export const useAddStudentPoints = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({
      userId,
      activity,
      points
    }: {
      userId: string;
      activity: string;
      points: number;
    }) => {
      const { data, error } = await supabase
        .from("student_points")
        .insert([
          {
            user_id: userId,
            activity,
            points_change: points
          }
        ])
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return data[0] as StudentPoints;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentPoints"] });
      queryClient.invalidateQueries({ queryKey: ["totalStudentPoints"] });
      queryClient.invalidateQueries({ queryKey: ["topStudents"] });
      toast({
        title: "Success",
        description: "Points added successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to add points: ${error.message}`,
        variant: "destructive",
      });
    }
  });
};

export const useTopStudents = (limit: number = 5) => {
  return useQuery({
    queryKey: ["topStudents", limit],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_top_students', { limit_param: limit });

      if (error) {
        throw new Error(error.message);
      }

      return data as TopStudent[];
    }
  });
};

export const useAdminCheck = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAdminStatus = async () => {
    try {
      // Use the is_admin stored function for reliable admin checking
      const { data, error } = await supabase.rpc('is_admin');
      
      if (error) {
        console.error("Error checking admin status:", error);
        throw error;
      }
      
      setIsAdmin(!!data); // Ensure boolean result
    } catch (error) {
      console.error("Admin check error:", error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  return { isAdmin, loading, checkAdminStatus };
};
