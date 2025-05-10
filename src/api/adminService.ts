
// Import types only
import { StudentProfile, DashboardStats } from './adminService/types';
import { StudentPoints, TopStudent, TrialRequest } from './adminService/types';
import { 
  useTrialRequests, 
  useTrialRequest,
  useUpdateTrialRequest, 
  useDeleteTrialRequest 
} from './adminService/trialService';
import { 
  useStudents,
  useStudentPoints,
  addPointsToStudent,
  useTopStudents
} from './adminService/pointsService';
import { 
  useStudentProfiles 
} from './adminService/hooks/useStudentProfiles';
import { 
  useStudentProfile 
} from './adminService/hooks/useStudentProfile';
import { 
  useUpdateStudentProfile 
} from './adminService/hooks/useUpdateStudentProfile';
import { 
  useDeleteStudentProfile 
} from './adminService/hooks/useDeleteStudentProfile';
import { 
  useStudentExtendedProfile,
  type StudentExtendedProfile 
} from './adminService/hooks/useStudentExtendedProfile';
import {
  useUpdateStudentExtendedProfile
} from './adminService/hooks/useUpdateStudentExtendedProfile';
import useTotalStudentPoints from './adminService/useTotalStudentPoints';

// Export all the hooks and types
export type { StudentProfile, DashboardStats, StudentPoints, TopStudent, TrialRequest, StudentExtendedProfile };

// Export trial service hooks
export { useTrialRequests, useTrialRequest, useUpdateTrialRequest, useDeleteTrialRequest };

// Export points service hooks and functions
export { useStudents, useStudentPoints, addPointsToStudent, useTopStudents };

// Export student profile hooks
export { useStudentProfiles, useStudentProfile, useUpdateStudentProfile, useDeleteStudentProfile };

// Export extended profile hooks
export { useStudentExtendedProfile, useUpdateStudentExtendedProfile };

// Export other utilities
export { useTotalStudentPoints };
