
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StudentProfile } from "./types";

// Hook to fetch all student profiles
export const useStudentProfiles = (roleFilter: string = "all") => {
  return useQuery({
    queryKey: ["studentProfiles", roleFilter],
    queryFn: async () => {
      try {
        let query = supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false });

        if (roleFilter !== "all") {
          query = query.eq("role", roleFilter);
        }

        const { data, error } = await query;

        if (error) {
          console.error("Supabase error:", error);
          throw new Error(`Error loading profiles: ${error.message}`);
        }

        if (!data) {
          throw new Error("No profiles data returned");
        }

        return data as StudentProfile[];
      } catch (error) {
        console.error("Error fetching student profiles:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to load student profiles");
      }
    },
    retry: 2,
    retryDelay: 1500
  });
};

// Hook to fetch a single student profile
export const useStudentProfile = (id?: string) => {
  return useQuery({
    queryKey: ["studentProfile", id],
    queryFn: async () => {
      if (!id) {
        return null;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (error) {
          throw new Error(error.message);
        }

        return data as StudentProfile;
      } catch (error) {
        console.error("Error fetching student profile:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to load student profile");
      }
    },
    enabled: !!id
  });
};

// Hook to fetch student extended profile with day-specific timings
export const useStudentExtendedProfile = (userId?: string) => {
  return useQuery({
    queryKey: ["studentExtendedProfile", userId],
    queryFn: async () => {
      if (!userId) {
        return null;
      }

      try {
        const { data, error } = await supabase
          .from("student_profiles")
          .select("*")
          .eq("user_id", userId)
          .maybeSingle();

        if (error) {
          throw new Error(error.message);
        }

        return data;
      } catch (error) {
        console.error("Error fetching student extended profile:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to load student extended profile");
      }
    },
    enabled: !!userId
  });
};

// Hook to update student extended profile
export const useUpdateStudentExtendedProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      userId, 
      updates 
    }: { 
      userId: string; 
      updates: Record<string, any> 
    }) => {
      const { data, error } = await supabase
        .from("student_profiles")
        .update(updates)
        .eq("user_id", userId)
        .select();
        
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["studentExtendedProfile", variables.userId] });
    }
  });
};

// Hook to update a student profile
export const useUpdateStudentProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (params: { id: string; updates: Partial<StudentProfile> }) => {
      const { id, updates } = params;
      
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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["studentProfile", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["studentProfiles"] });
    }
  });
};

// Hook to delete a student profile
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
    }
  });
};

// Hook to get dashboard statistics
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      try {
        // Get counts by role
        const { data: roleData, error: roleError } = await supabase
          .rpc('count_profiles_by_role');
          
        if (roleError) throw new Error(roleError.message);
        
        // Get new registrations this month
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        
        const { count: newRegistrations, error: newRegError } = await supabase
          .from("profiles")
          .select("*", { count: "exact" })
          .gte("created_at", startOfMonth.toISOString());
          
        if (newRegError) throw new Error(newRegError.message);
        
        // Get trial requests this month
        const { count: newTrials, error: trialsError } = await supabase
          .from("free_trial_requests")
          .select("*", { count: "exact" })
          .gte("created_at", startOfMonth.toISOString());
          
        if (trialsError) throw new Error(trialsError.message);
        
        // Format the data
        const roleCounts = roleData ? roleData.reduce((acc: Record<string, number>, item: any) => {
          if (item && item.role && item.count) {
            acc[item.role.toLowerCase()] = Number(item.count);
          }
          return acc;
        }, {} as Record<string, number>) : {};
        
        return {
          students: roleCounts.student || 0,
          teachers: roleCounts.teacher || 0,
          admins: roleCounts.admin || 0,
          newRegistrations: newRegistrations || 0,
          newTrials: newTrials || 0,
          totalUsers: Object.values(roleCounts).reduce((sum, count) => sum + Number(count), 0)
        };
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to load dashboard statistics");
      }
    }
  });
};
