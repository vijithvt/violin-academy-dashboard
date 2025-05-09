
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FeeRecord, FeeStatus } from "./types";
import { Database } from "@/integrations/supabase/types";

type FeesRow = Database['public']['Tables']['fees']['Row'];

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
      try {
        // Start with base query
        let query = supabase.from("fees").select("*, profiles:user_id(name)");
        
        // Apply filters
        if (month) {
          // In our database, we store date in "YYYY-MM-DD" format, so we need to filter by month
          const [year, monthNum] = month.split('-');
          query = query.like('date', `${year}-${monthNum}-%`);
        }
        
        // Apply level filter if not "all" - not currently in schema, will handle in transform
        
        // Apply status filter if not "all"
        if (status && status !== "all") {
          query = query.eq('status', status);
        }
        
        // Apply search term filter - for demonstration, using if user_id exists in profiles with name like searchTerm
        if (searchTerm) {
          // This is a simplification, ideally would use a more sophisticated text search
          const { data: profileIds } = await supabase
            .from('profiles')
            .select('id')
            .ilike('name', `%${searchTerm}%`);
            
          if (profileIds && profileIds.length > 0) {
            const ids = profileIds.map(p => p.id);
            query = query.in('user_id', ids);
          }
        }
        
        const { data, error } = await query;
        
        if (error) {
          throw new Error(error.message);
        }
        
        // Transform the data to match our FeeRecord type
        const feeRecords: FeeRecord[] = (data || []).map(record => ({
          id: record.id,
          user_id: record.user_id,
          student_name: record.profiles?.name || "Unknown",
          // Level might not exist in DB, use a default
          level: "Unknown",
          month: record.date ? record.date.substring(0, 7) : "", // Extract YYYY-MM from date
          amount: record.amount,
          // Make sure to cast the status to FeeStatus
          status: (record.status || "pending") as FeeStatus,
          // These fields might not exist in the database yet, handle accordingly
          payment_date: undefined,
          payment_method: undefined,
          payment_reference: undefined,
          created_at: record.created_at,
          updated_at: record.created_at // Use created_at as fallback
        }));
        
        return feeRecords;
      } catch (error) {
        console.error("Error fetching fee records:", error);
        return [] as FeeRecord[];
      }
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
      status: FeeStatus;
      paymentDetails?: {
        payment_date?: string;
        payment_method?: string;
        payment_reference?: string;
      }
    }) => {
      const updateFields: any = {
        status,
        updated_at: new Date().toISOString()
      };
      
      // Add payment details if provided
      if (paymentDetails) {
        if (paymentDetails.payment_date) updateFields.payment_date = paymentDetails.payment_date;
        if (paymentDetails.payment_method) updateFields.payment_method = paymentDetails.payment_method;
        if (paymentDetails.payment_reference) updateFields.payment_reference = paymentDetails.payment_reference;
      }
      
      const { data, error } = await supabase
        .from("fees")
        .update(updateFields)
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
          profiles:user_id(name, email, phone)
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
    mutationFn: async (fee: {
      user_id: string;
      amount: number;
      status: FeeStatus;
      date: string; // Use date instead of month
      payment_date?: string;
      payment_method?: string;
      payment_reference?: string;
      level?: string;
    }) => {
      const { data, error } = await supabase
        .from("fees")
        .insert({
          user_id: fee.user_id,
          amount: fee.amount,
          status: fee.status,
          date: fee.date
          // Only include the extra fields if added to the database schema
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
