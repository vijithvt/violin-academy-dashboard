
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface TrialRequest {
  id: string;
  name: string;
  email: string;
  mobile_number: string;
  whatsapp_number: string;
  student_name: string;
  age: string;
  level: string;
  course: string;
  preferred_time: string;
  status: string;
  notes?: string;
  created_at: string;
  timezone: string;
  city: string;
  state: string;
  country: string;
}

// Hook to fetch all trial requests
export const useTrialRequests = () => {
  return useQuery({
    queryKey: ['trialRequests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('free_trial_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching trial requests:', error);
        throw new Error(error.message);
      }

      return data as TrialRequest[];
    },
  });
};

// Hook to fetch a single trial request
export const useTrialRequest = (id?: string) => {
  return useQuery({
    queryKey: ['trialRequest', id],
    queryFn: async () => {
      if (!id) {
        throw new Error('Trial request ID is required');
      }

      const { data, error } = await supabase
        .from('free_trial_requests')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error(`Error fetching trial request with ID ${id}:`, error);
        throw new Error(error.message);
      }

      return data as TrialRequest;
    },
    enabled: !!id,
  });
};

// Hook to update a trial request
export const useUpdateTrialRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<TrialRequest> & { id: string }) => {
      const { data, error } = await supabase
        .from('free_trial_requests')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) {
        console.error('Error updating trial request:', error);
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['trialRequest', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['trialRequests'] });
    },
  });
};

// Hook to delete a trial request
export const useDeleteTrialRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('free_trial_requests')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting trial request:', error);
        throw new Error(error.message);
      }

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trialRequests'] });
    },
  });
};
