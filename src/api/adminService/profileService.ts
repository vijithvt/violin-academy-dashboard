
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StudentProfile } from "./types";

// Fetch all students
export const useStudents = (searchTerm: string = "", courseFilter: string = "", levelFilter: string = "") => {
  return useQuery({
    queryKey: ["students", searchTerm, courseFilter, levelFilter],
    queryFn: async () => {
      let query = supabase.from("profiles").select("*");
      
      // Apply role filter - only get students
      query = query.eq("role", "student");
      
      // Apply search if provided
      if (searchTerm) {
        query = query.ilike("name", `%${searchTerm}%`);
      }
      
      // Apply course filter if provided
      if (courseFilter) {
        query = query.eq("course", courseFilter);
      }
      
      // Apply level filter if provided
      if (levelFilter) {
        query = query.eq("level", levelFilter);
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      return data as StudentProfile[];
    },
  });
};

// Fetch a single student by ID
export const useStudentById = (id: string) => {
  return useQuery({
    queryKey: ["student", id],
    queryFn: async () => {
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
    },
    enabled: !!id,
  });
};

// Update a student profile
export const useUpdateStudentProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (profile: Partial<StudentProfile>) => {
      const { data, error } = await supabase
        .from("profiles")
        .update(profile)
        .eq("id", profile.id!)
        .select();
      
      if (error) {
        throw error;
      }
      
      return data;
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
    mutationFn: async (profile: Omit<StudentProfile, "id" | "created_at">) => {
      // Generate a UUID for the new profile
      const { data, error } = await supabase
        .from("profiles")
        .insert({
          name: profile.name,
          role: profile.role || "student",
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
          dob: profile.dob,
          gender: profile.gender,
          course: profile.course,
          level: profile.level,
          preferred_timing: profile.preferred_timing,
          profession: profile.profession,
          referred_by: profile.referred_by,
          hear_about: profile.hear_about,
          photo_url: profile.photo_url
        })
        .select();
      
      if (error) {
        throw error;
      }
      
      return data[0] as StudentProfile;
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
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", id);
      
      if (error) {
        throw error;
      }
      
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
