
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StudentPoints, TopStudent } from "./types";

// Hook to fetch student points history
export const useStudentPoints = (userId?: string) => {
  return useQuery({
    queryKey: ["studentPoints", userId],
    queryFn: async () => {
      // If no user ID is provided, return empty array
      if (!userId) {
        return [] as StudentPoints[];
      }

      const { data, error } = await supabase
        .from("student_points")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data as StudentPoints[];
    },
    enabled: !!userId
  });
};

// Hook to fetch total points for a student
export const useTotalStudentPoints = (userId?: string) => {
  return useQuery({
    queryKey: ["totalPoints", userId],
    queryFn: async () => {
      if (!userId) return 0;

      const { data, error } = await supabase
        .rpc("get_total_points", { user_id_param: userId });

      if (error) {
        throw new Error(error.message);
      }

      return data as number;
    },
    enabled: !!userId
  });
};

// Function to add points to a student
export const addPointsToStudent = async (
  userId: string,
  points: number,
  activity: string
) => {
  try {
    const { data, error } = await supabase
      .from("student_points")
      .insert({
        user_id: userId,
        activity,
        points_change: points
      });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error adding points:", error);
    throw error;
  }
};

// Hook to fetch top students
export const useTopStudents = (limit: number = 5) => {
  return useQuery({
    queryKey: ["topStudents", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc("get_top_students", { limit_param: limit });

      if (error) {
        throw new Error(error.message);
      }

      return data as TopStudent[];
    }
  });
};
