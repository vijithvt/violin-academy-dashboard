
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TrialRequest } from "./types";

// Hook to fetch all trial requests
export const useTrialRequests = (
  searchTerm: string = "",
  filters: { status?: string; course?: string } = {},
  sortOrder: "asc" | "desc" = "desc"
) => {
  return useQuery({
    queryKey: ["trialRequests", searchTerm, filters, sortOrder],
    queryFn: async () => {
      let query = supabase
        .from("free_trial_requests")
        .select("*");
      
      // Apply search filter
      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);
      }
      
      // Apply status filter
      if (filters.status && filters.status !== "all") {
        query = query.eq("status", filters.status);
      }
      
      // Apply course filter
      if (filters.course && filters.course !== "all") {
        query = query.eq("course", filters.course);
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

// Hook to update trial request
export const useUpdateTrialRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      id, 
      updates 
    }: { 
      id: string; 
      updates: Partial<TrialRequest> 
    }) => {
      const { data, error } = await supabase
        .from("free_trial_requests")
        .update(updates)
        .eq("id", id)
        .select();
        
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trialRequests"] });
    }
  });
};

// Hook to delete trial request
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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trialRequests"] });
    }
  });
};
