
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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

// Hook to fetch a single student profile
export const useStudentProfile = (id?: string) => {
  return useQuery({
    queryKey: ["studentProfile", id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
        
      if (error) {
        throw new Error(error.message);
      }
      
      return data as StudentProfile;
    },
    enabled: !!id
  });
};

// Hook to create a new student profile
export const useCreateStudentProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (profile: Omit<StudentProfile, 'id' | 'created_at'>) => {
      // Generate UUID for new profile
      const { data, error } = await supabase.auth.signUp({
        email: profile.email || 'temp_' + Math.random().toString(36).substring(2, 15) + '@example.com',
        password: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        options: {
          data: {
            name: profile.name,
            role: profile.role || 'student'
          }
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error('Failed to create user');
      }

      // Create profile with additional fields
      const user_id = data.user.id;
      
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          name: profile.name,
          role: profile.role || 'student',
          // Add any other fields from the profile object
          ...profile
        })
        .eq("id", user_id);
        
      if (profileError) {
        throw new Error(profileError.message);
      }
      
      return { id: user_id, ...profile };
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
