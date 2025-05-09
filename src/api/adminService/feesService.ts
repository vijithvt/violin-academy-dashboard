
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FeeRecord } from "./types";

// Hook to fetch fee records
export const useFeeRecords = (
  month: string = "",
  level: string = "all",
  status: string = "all",
  searchTerm: string = ""
) => {
  return useQuery({
    queryKey: ["feeRecords", month, level, status, searchTerm],
    queryFn: async () => {
      // Start with base query
      let query = supabase.from("fees").select(`
        *,
        profiles:user_id (name, level)
      `);
      
      // Apply filters
      if (month) {
        // Extract year and month
        const [year, monthNum] = month.split('-');
        const monthStr = `${year}-${monthNum}`;
        query = query.eq('month', monthStr);
      }
      
      // Apply level filter if not "all"
      if (level && level !== "all") {
        query = query.eq('level', level);
      }
      
      // Apply status filter if not "all"
      if (status && status !== "all") {
        query = query.eq('status', status);
      }
      
      // Apply search term filter
      if (searchTerm) {
        // We need to join with profiles to search by student name
        query = query.textSearch('student_name', searchTerm);
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Transform the data to match our FeeRecord type
      const feeRecords = data.map(record => ({
        id: record.id,
        user_id: record.user_id,
        student_name: record.profiles?.name || "Unknown",
        level: record.profiles?.level || "Unknown",
        month: record.date.substring(0, 7), // YYYY-MM format
        amount: record.amount,
        status: record.status,
        payment_date: record.payment_date,
        payment_method: record.payment_method,
        payment_reference: record.payment_reference,
        created_at: record.created_at,
        updated_at: record.updated_at || record.created_at
      })) as FeeRecord[];
      
      return feeRecords;
    }
  });
};

// Hook to update fee status
export const useUpdateFeeStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({
      id,
      status,
      paymentDetails
    }: {
      id: string;
      status: string;
      paymentDetails?: {
        payment_date?: string;
        payment_method?: string;
        payment_reference?: string;
      }
    }) => {
      const { data, error } = await supabase
        .from("fees")
        .update({
          status,
          ...paymentDetails,
          updated_at: new Date().toISOString()
        })
        .eq("id", id)
        .select();
        
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeRecords"] });
    }
  });
};

// Hook to generate a fee receipt
export const useGenerateFeeReceipt = () => {
  return useMutation({
    mutationFn: async (feeId: string) => {
      // First, get the fee details
      const { data: fee, error: feeError } = await supabase
        .from("fees")
        .select(`
          *,
          profiles:user_id (name, email, phone)
        `)
        .eq("id", feeId)
        .single();
        
      if (feeError) {
        throw new Error(feeError.message);
      }
      
      // In a real implementation, we would generate a PDF receipt here
      // and possibly email it to the student
      
      // Simulate a backend process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return { success: true, feeId };
    }
  });
};

// Hook to create a new fee record
export const useCreateFeeRecord = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (fee: Omit<FeeRecord, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from("fees")
        .insert({
          user_id: fee.user_id,
          date: `${fee.month}-01`, // Convert YYYY-MM to YYYY-MM-DD format for the database
          amount: fee.amount,
          status: fee.status
        })
        .select();
        
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeRecords"] });
    }
  });
};

// Hook to get outstanding fees summary
export const useOutstandingFeesSummary = () => {
  return useQuery({
    queryKey: ["outstandingFeesSummary"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fees")
        .select("status, amount")
        .in("status", ["pending", "overdue"]);
        
      if (error) {
        throw new Error(error.message);
      }
      
      const totalCount = data.length;
      const totalAmount = data.reduce((sum, fee) => sum + fee.amount, 0);
      
      return { totalCount, totalAmount };
    }
  });
};
