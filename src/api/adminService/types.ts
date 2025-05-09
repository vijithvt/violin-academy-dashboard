
// Student Profile Types
export interface StudentProfile {
  id: string;
  name: string;
  email?: string;
  role: string;
  created_at: string;
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
}

// Student Points Types
export interface StudentPoints {
  id: string;
  user_id: string;
  activity: string;
  points_change: number;
  created_at: string;
}

// Top Student Type
export interface TopStudent {
  id: string;
  name: string;
  points: number;
  rank: number;
}

// Trial Request Type
export interface TrialRequest {
  id: string;
  name: string;
  student_name: string;
  email: string;
  mobile_number: string;
  whatsapp_number: string;
  age: string;
  city: string;
  state: string;
  country: string;
  course: string;
  level: string;
  timezone: string;
  preferred_time: string | null;
  notes: string | null;
  status: string;
  created_at: string;
}

// Attendance Types
export interface AttendanceRecord {
  id: string;
  user_id: string;
  date: string;
  status: string; // "present", "absent", "late"
  created_at: string;
}

export type AttendanceStatus = "present" | "absent" | "late";
