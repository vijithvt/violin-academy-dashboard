
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TrialRequest } from "./types";

// Hook to fetch all trial requests
export const useTrialRequests = (
  searchQuery: string = "",
  filters: {
    status?: string;
    course?: string;
  } = {},
  sortOrder: "asc" | "desc" = "desc"
) => {
  return useQuery({
    queryKey: ["trialRequests", searchQuery, filters, sortOrder],
    queryFn: async () => {
      let query = supabase
        .from("free_trial_requests")
        .select("*")
        .order("created_at", { ascending: sortOrder === "asc" });

      if (filters.status && filters.status !== "all") {
        query = query.eq("status", filters.status);
      }

      if (filters.course && filters.course !== "all") {
        query = query.eq("course", filters.course);
      }

      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,student_name.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return data as TrialRequest[];
    }
  });
};

// Hook to fetch a single trial request
export const useTrialRequest = (id?: string) => {
  return useQuery({
    queryKey: ["trialRequest", id],
    queryFn: async () => {
      if (!id) {
        return null;
      }

      const { data, error } = await supabase
        .from("free_trial_requests")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data as TrialRequest;
    },
    enabled: !!id
  });
};

// Hook to update a trial request
export const useUpdateTrialRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (params: { id: string; updates: Partial<TrialRequest> }) => {
      const { id, updates } = params;
      
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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["trialRequest", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["trialRequests"] });
    }
  });
};

// Hook to delete a trial request
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
    }
  });
};
