
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
        .select("*")
        .order("created_at", { ascending: false });

      if (roleFilter !== "all") {
        query = query.eq("role", roleFilter);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return data as StudentProfile[];
    }
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
        throw new Error(error.message);
      }

      return data as StudentProfile;
    },
    enabled: !!id
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
