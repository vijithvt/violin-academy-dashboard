
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StudentProfile } from "./types";

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
    mutationFn: async (profile: Partial<StudentProfile>) => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .update(profile)
          .eq("id", profile.id!)
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
        // Generate a UUID for the new profile
        const { data, error } = await supabase
          .from("profiles")
          .insert({
            name: newProfile.name,
            role: newProfile.role || "student",
            email: newProfile.email,
            // Add other fields as needed
          })
          .select();
        
        if (error) {
          throw error;
        }
        
        // Update with additional fields
        if (data && data.length > 0) {
          const profileId = data[0].id;
          
          const updateData: any = {};
          
          if (newProfile.phone) updateData.phone = newProfile.phone;
          if (newProfile.address) updateData.address = newProfile.address;
          if (newProfile.dob) updateData.dob = newProfile.dob;
          if (newProfile.gender) updateData.gender = newProfile.gender;
          if (newProfile.course) updateData.course = newProfile.course;
          if (newProfile.level) updateData.level = newProfile.level;
          if (newProfile.preferred_timing) updateData.preferred_timing = newProfile.preferred_timing;
          if (newProfile.profession) updateData.profession = newProfile.profession;
          if (newProfile.referred_by) updateData.referred_by = newProfile.referred_by;
          if (newProfile.hear_about) updateData.hear_about = newProfile.hear_about;
          if (newProfile.photo_url) updateData.photo_url = newProfile.photo_url;
          
          if (Object.keys(updateData).length > 0) {
            const { error: updateError } = await supabase
              .from("profiles")
              .update(updateData)
              .eq("id", profileId);
            
            if (updateError) {
              throw updateError;
            }
          }
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
