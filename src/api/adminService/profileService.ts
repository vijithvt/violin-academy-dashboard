
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StudentProfile } from "./types";

// Hook to fetch all student profiles
export const useStudentProfiles = (roleFilter: string = "all") => {
  return useQuery({
    queryKey: ["studentProfiles", roleFilter],
    queryFn: async () => {
      let query = supabase
        .from("profiles")
        .select("*");

      if (roleFilter !== "all") {
        query = query.eq("role", roleFilter);
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching profiles:", error);
        throw new Error(error.message);
      }

      return data as StudentProfile[];
    },
    retry: 3, // Increase retry attempts
    staleTime: 1 * 60 * 1000, // 1 minute 
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

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        throw new Error(error.message);
      }

      return data as StudentProfile;
    },
    enabled: !!id,
    retry: 3, // Increase retry attempts
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
        console.error("Error updating profile:", error);
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["studentProfile", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["studentProfiles"] });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    }
  });
};

// Hook to delete a student profile
export const useDeleteStudentProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      // First, try to delete the auth user if exists
      try {
        // Note: This requires admin privileges
        const { error: authError } = await supabase.functions.invoke('delete-user', {
          body: { userId: id }
        });
        
        if (authError) {
          console.warn("Could not delete auth user:", authError);
          // Continue anyway, as we still want to delete the profile
        }
      } catch (err) {
        console.warn("Error calling delete-user function:", err);
        // Continue with profile deletion anyway
      }
      
      // Delete the profile
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", id);
      
      if (error) {
        console.error("Error deleting profile:", error);
        throw new Error(error.message);
      }
      
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentProfiles"] });
    },
    onError: (error) => {
      console.error("Delete mutation error:", error);
    }
  });
};

// Hook to create a new student profile directly
export const useCreateStudentProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (profileData: Partial<StudentProfile> & { name: string; role: string }) => {
      // Ensure required fields are present
      if (!profileData.name) {
        throw new Error("Name is required");
      }

      // Generate a UUID for id if not provided
      const insertData = {
        id: profileData.id || crypto.randomUUID(),
        name: profileData.name,
        role: profileData.role,
        email: profileData.email,
        created_at: profileData.created_at,
        // Optional fields
        phone: profileData.phone,
        address: profileData.address,
        dob: profileData.dob,
        gender: profileData.gender,
        course: profileData.course,
        level: profileData.level,
        preferred_timing: profileData.preferred_timing,
        profession: profileData.profession,
        referred_by: profileData.referred_by,
        hear_about: profileData.hear_about,
        photo_url: profileData.photo_url
      };
      
      const { data, error } = await supabase
        .from("profiles")
        .insert(insertData)
        .select()
        .single();
        
      if (error) {
        console.error("Error creating profile:", error);
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentProfiles"] });
    },
    onError: (error) => {
      console.error("Create profile error:", error);
    }
  });
};
