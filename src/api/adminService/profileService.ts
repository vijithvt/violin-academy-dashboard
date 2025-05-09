
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface StudentProfile {
  id: string;
  name: string;
  role: string;
  created_at: string;
}

export interface CreateStudentProfileData {
  name: string;
  email: string;
  role?: string;
}

// Hook to fetch all student profiles
export const useStudentProfiles = () => {
  return useQuery({
    queryKey: ['studentProfiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'student')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching student profiles:', error);
        throw new Error(error.message);
      }

      return data as StudentProfile[];
    }
  });
};

// Hook to fetch a single student profile
export const useStudentProfile = (id?: string) => {
  return useQuery({
    queryKey: ['studentProfile', id],
    queryFn: async () => {
      if (!id) {
        throw new Error('Student ID is required');
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error(`Error fetching student profile with ID ${id}:`, error);
        throw new Error(error.message);
      }

      return data as StudentProfile;
    },
    enabled: !!id
  });
};

// Hook to create a student profile
export const useCreateStudentProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData: CreateStudentProfileData) => {
      // First create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: profileData.email,
        password: 'temp-password-' + Math.random().toString(36).substring(2, 12),
      });

      if (authError) {
        console.error('Error creating auth user:', authError);
        throw new Error(authError.message);
      }

      if (!authData.user) {
        throw new Error('Failed to create auth user');
      }

      // Then create profile (will be automatic via trigger)
      const { data: profileUpdateData, error: profileUpdateError } = await supabase
        .from('profiles')
        .update({ 
          name: profileData.name,
          role: profileData.role || 'student' 
        })
        .eq('id', authData.user.id)
        .select();

      if (profileUpdateError) {
        console.error('Error updating profile:', profileUpdateError);
        throw new Error(profileUpdateError.message);
      }

      return profileUpdateData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentProfiles'] });
    }
  });
};

// Hook to update a student profile
export const useUpdateStudentProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<StudentProfile> & { id: string }) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) {
        console.error('Error updating student profile:', error);
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['studentProfile', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['studentProfiles'] });
    }
  });
};
