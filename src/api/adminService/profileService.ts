
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StudentProfile } from "./types";
import { v4 as uuidv4 } from "uuid";
import { Database } from "@/integrations/supabase/types";

type ProfileRow = Database['public']['Tables']['profiles']['Row'];

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
        
        // Apply course filter if provided - note: column may not exist in actual schema
        if (courseFilter && courseFilter !== "") {
          // Handle this in transform if column doesn't exist
        }
        
        // Apply level filter if provided - note: column may not exist in actual schema
        if (levelFilter && levelFilter !== "") {
          // Handle this in transform if column doesn't exist
        }
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        // Transform data to match our StudentProfile type
        return (data as ProfileRow[]).map(profile => {
          const student: StudentProfile = {
            id: profile.id,
            name: profile.name,
            role: profile.role,
            created_at: profile.created_at,
            // Add other fields with defaults
            email: undefined,
            phone: undefined,
            address: undefined,
            dob: undefined,
            gender: undefined,
            course: undefined,
            level: undefined,
            preferred_timing: undefined,
            profession: undefined,
            referred_by: undefined,
            hear_about: undefined,
            photo_url: undefined
          };
          return student;
        });
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
        
        // Transform to match our StudentProfile type
        const student: StudentProfile = {
          id: data.id,
          name: data.name,
          role: data.role,
          created_at: data.created_at,
          // Add other fields with defaults
          email: undefined,
          phone: undefined,
          address: undefined,
          dob: undefined,
          gender: undefined,
          course: undefined,
          level: undefined,
          preferred_timing: undefined,
          profession: undefined,
          referred_by: undefined,
          hear_about: undefined,
          photo_url: undefined
        };
        
        return student;
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
        
        // Only add fields that exist in our database schema
        if (profile.name !== undefined) updateData.name = profile.name;
        if (profile.role !== undefined) updateData.role = profile.role;
        
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
        
        if (data && data.length > 0) {
          // Transform to match our StudentProfile type
          const student: StudentProfile = {
            id: data[0].id,
            name: data[0].name,
            role: data[0].role,
            created_at: data[0].created_at,
            // Add other fields with defaults
            email: undefined,
            phone: undefined,
            address: undefined,
            dob: undefined,
            gender: undefined,
            course: undefined,
            level: undefined,
            preferred_timing: undefined,
            profession: undefined,
            referred_by: undefined,
            hear_about: undefined,
            photo_url: undefined
          };
          return student;
        }
        
        return null;
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
