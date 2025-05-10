
// Student Profile Types
export interface StudentProfile {
  id: string;
  name: string;
  email?: string;
  role: string;
  created_at: string;
}

// Student Points Types
export interface StudentPoints {
  id: string;
  user_id: string;
  points_change: number;
  activity: string;
  created_at: string;
}

export interface TopStudent {
  id: string;
  name: string;
  points: number;
  rank: number;
}

// Trial Request Types
export interface TrialRequest {
  id: string;
  name: string;
  email: string;
  mobile_number: string;
  whatsapp_number: string | null;
  student_name: string;
  age: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
  course: string;
  level: string;
  preferred_time: string | null;
  status: string;
  notes: string | null;
  created_at: string;
}

// Dashboard Stats Types
export interface DashboardStats {
  studentCount: number;
  teacherCount: number;
  adminCount: number;
  totalUsers: number;
  trialRequestsCount: number;
  roles: { role: string; count: number }[];
}
