export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      attendance: {
        Row: {
          created_at: string
          date: string
          id: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          status: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      fees: {
        Row: {
          amount: number
          created_at: string
          date: string
          id: string
          status: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          date: string
          id?: string
          status: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          date?: string
          id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fees_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      free_trial_requests: {
        Row: {
          age: string
          city: string
          country: string
          course: string
          created_at: string
          email: string
          id: string
          level: string
          mobile_number: string
          name: string
          notes: string | null
          preferred_time: string | null
          state: string
          status: string
          student_name: string
          timezone: string
          whatsapp_number: string
        }
        Insert: {
          age: string
          city: string
          country: string
          course: string
          created_at?: string
          email: string
          id?: string
          level: string
          mobile_number: string
          name: string
          notes?: string | null
          preferred_time?: string | null
          state: string
          status?: string
          student_name: string
          timezone: string
          whatsapp_number: string
        }
        Update: {
          age?: string
          city?: string
          country?: string
          course?: string
          created_at?: string
          email?: string
          id?: string
          level?: string
          mobile_number?: string
          name?: string
          notes?: string | null
          preferred_time?: string | null
          state?: string
          status?: string
          student_name?: string
          timezone?: string
          whatsapp_number?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          id: string
          message: string
          timestamp: string
          title: string
          to_user: string | null
        }
        Insert: {
          id?: string
          message: string
          timestamp?: string
          title: string
          to_user?: string | null
        }
        Update: {
          id?: string
          message?: string
          timestamp?: string
          title?: string
          to_user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_to_user_fkey"
            columns: ["to_user"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          name: string
          role: string
        }
        Insert: {
          created_at?: string
          id: string
          name: string
          role?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          role?: string
        }
        Relationships: []
      }
      progress: {
        Row: {
          id: string
          lesson: string
          status: string
          timestamp: string
          user_id: string
        }
        Insert: {
          id?: string
          lesson: string
          status?: string
          timestamp?: string
          user_id: string
        }
        Update: {
          id?: string
          lesson?: string
          status?: string
          timestamp?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          contact: string
          date: string
          email: string
          id: string
          name: string
          referrer_id: string
        }
        Insert: {
          contact: string
          date?: string
          email: string
          id?: string
          name: string
          referrer_id: string
        }
        Update: {
          contact?: string
          date?: string
          email?: string
          id?: string
          name?: string
          referrer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_points: {
        Row: {
          activity: string
          created_at: string
          id: string
          points_change: number
          user_id: string
        }
        Insert: {
          activity: string
          created_at?: string
          id?: string
          points_change: number
          user_id: string
        }
        Update: {
          activity?: string
          created_at?: string
          id?: string
          points_change?: number
          user_id?: string
        }
        Relationships: []
      }
      student_profiles: {
        Row: {
          address: string
          created_at: string
          date_of_birth: string
          day_specific_timings: Json | null
          gender: string
          heard_from: string
          id: string
          learning_level: string
          mobile_number: string
          parent_name: string
          photo_url: string | null
          preferred_course: string
          preferred_timings: string[]
          profession: string
          referral_details: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address: string
          created_at?: string
          date_of_birth: string
          day_specific_timings?: Json | null
          gender: string
          heard_from: string
          id?: string
          learning_level: string
          mobile_number: string
          parent_name: string
          photo_url?: string | null
          preferred_course: string
          preferred_timings: string[]
          profession: string
          referral_details?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string
          created_at?: string
          date_of_birth?: string
          day_specific_timings?: Json | null
          gender?: string
          heard_from?: string
          id?: string
          learning_level?: string
          mobile_number?: string
          parent_name?: string
          photo_url?: string | null
          preferred_course?: string
          preferred_timings?: string[]
          profession?: string
          referral_details?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      student_progress: {
        Row: {
          current_module: string
          id: string
          last_updated: string
          level: number
          progress_percentage: number
          teacher_notes: string | null
          user_id: string
        }
        Insert: {
          current_module: string
          id?: string
          last_updated?: string
          level?: number
          progress_percentage?: number
          teacher_notes?: string | null
          user_id: string
        }
        Update: {
          current_module?: string
          id?: string
          last_updated?: string
          level?: number
          progress_percentage?: number
          teacher_notes?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      count_profiles_by_role: {
        Args: Record<PropertyKey, never>
        Returns: {
          role: string
          count: number
        }[]
      }
      get_top_students: {
        Args: { limit_param: number }
        Returns: {
          id: string
          name: string
          points: number
          rank: number
        }[]
      }
      get_total_points: {
        Args: { user_id_param: string }
        Returns: number
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
