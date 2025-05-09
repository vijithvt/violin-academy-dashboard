
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StudentProfile } from "./types";
import { v4 as uuidv4 } from "uuid";

// Fetch all students
export const useStudents = (searchTerm: string = "", courseFilter: string = "", levelFilter: string = "") => {
  return useQuery({
    queryKey: ["students", searchTerm, courseFilter, levelFilter],
    queryFn: async () => {
      try {
        let query = supabase.from("profiles").select("*");
        
        // Apply role filter - only get students
        query = query.eq("role", "student");
        
        // Apply search if provided
        if (searchTerm) {
          query = query.ilike("name", `%${searchTerm}%`);
        }
        
        // Apply course filter if provided
        if (courseFilter && courseFilter !== "") {
          query = query.eq("course", courseFilter);
        }
        
        // Apply level filter if provided
        if (levelFilter && levelFilter !== "") {
          query = query.eq("level", levelFilter);
        }
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        return data as StudentProfile[];
      } catch (error) {
        console.error("Error fetching students:", error);
        return [] as StudentProfile[];
      }
    },
  });
};

// Fetch a single student by ID
export const useStudentById = (id: string) => {
  return useQuery({
    queryKey: ["student", id],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .eq("role", "student")
          .single();
        
        if (error) {
          throw error;
        }
        
        return data as StudentProfile;
      } catch (error) {
        console.error("Error fetching student by ID:", error);
        throw error;
      }
    },
    enabled: !!id,
  });
};

// Update a student profile
export const useUpdateStudentProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (profile: Partial<StudentProfile> & { id: string }) => {
      try {
        // Only include fields that are in the profiles table
        const updateData: Record<string, any> = {};
        
        // Add fields that exist in our database schema
        if (profile.name !== undefined) updateData.name = profile.name;
        if (profile.role !== undefined) updateData.role = profile.role;
        if (profile.email !== undefined) updateData.email = profile.email;
        if (profile.phone !== undefined) updateData.phone = profile.phone;
        if (profile.address !== undefined) updateData.address = profile.address;
        if (profile.dob !== undefined) updateData.dob = profile.dob;
        if (profile.gender !== undefined) updateData.gender = profile.gender;
        if (profile.course !== undefined) updateData.course = profile.course;
        if (profile.level !== undefined) updateData.level = profile.level;
        if (profile.preferred_timing !== undefined) updateData.preferred_timing = profile.preferred_timing;
        if (profile.profession !== undefined) updateData.profession = profile.profession;
        if (profile.referred_by !== undefined) updateData.referred_by = profile.referred_by;
        if (profile.hear_about !== undefined) updateData.hear_about = profile.hear_about;
        if (profile.photo_url !== undefined) updateData.photo_url = profile.photo_url;
        
        const { data, error } = await supabase
          .from("profiles")
          .update(updateData)
          .eq("id", profile.id)
          .select();
        
        if (error) {
          throw error;
        }
        
        return data;
      } catch (error) {
        console.error("Error updating student profile:", error);
        throw error;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["student", variables.id] });
    },
  });
};

// Create a new student profile
export const useCreateStudentProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newProfile: {
      name: string;
      role?: string;
      email?: string;
      phone?: string;
      address?: string;
      dob?: string;
      gender?: string;
      course?: string;
      level?: string;
      preferred_timing?: string;
      profession?: string;
      referred_by?: string;
      hear_about?: string;
      photo_url?: string;
    }) => {
      try {
        // Create the basic profile with required fields and a random UUID
        const id = uuidv4();
        
        const profileData = {
          id,
          name: newProfile.name,
          role: newProfile.role || "student"
        };
        
        const { data, error } = await supabase
          .from("profiles")
          .insert(profileData)
          .select();
        
        if (error) {
          throw error;
        }
        
        return data && data.length > 0 ? data[0] as StudentProfile : null;
      } catch (error) {
        console.error("Error creating student profile:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};

// Delete a student profile
export const useDeleteStudentProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const { error } = await supabase
          .from("profiles")
          .delete()
          .eq("id", id);
        
        if (error) {
          throw error;
        }
        
        return { success: true };
      } catch (error) {
        console.error("Error deleting student profile:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
