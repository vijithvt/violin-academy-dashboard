
// Import all hooks and types
import { useAdminCheck } from './adminService/hooks/useAdminCheck';
import { useStudentProfiles } from './adminService/hooks/useStudentProfiles';
import { useStudentProfile } from './adminService/hooks/useStudentProfile';
import { useStudentExtendedProfile, StudentExtendedProfile } from './adminService/hooks/useStudentExtendedProfile';
import { useUpdateStudentExtendedProfile } from './adminService/hooks/useUpdateStudentExtendedProfile';
import { useUpdateStudentProfile } from './adminService/hooks/useUpdateStudentProfile';
import { useDeleteStudentProfile } from './adminService/hooks/useDeleteStudentProfile';
import { useDashboardStats } from './adminService/hooks/useDashboardStats';
import { StudentProfile, DashboardStats } from './adminService/types';
import { StudentPoints, TopStudent, TrialRequest } from './adminService/types';
import useTotalStudentPoints from './adminService/useTotalStudentPoints';
import { 
  useStudentPoints, 
  useTopStudents, 
  addPointsToStudent, 
  useStudents 
} from './adminService/pointsService';
import { 
  useTrialRequests,
  useTrialRequest,
  useUpdateTrialRequest,
  useDeleteTrialRequest
} from './adminService/trialService';

// Re-export all hooks and types
export { useAdminCheck };
export { useStudentProfiles };
export { useStudentProfile };
export { useStudentExtendedProfile };
export type { StudentExtendedProfile };
export { useUpdateStudentExtendedProfile };
export { useUpdateStudentProfile };
export { useDeleteStudentProfile };
export { useDashboardStats };
export { useTotalStudentPoints };

// Re-export types
export type { StudentProfile, DashboardStats };
export type { StudentPoints, TopStudent, TrialRequest };

// Re-export pointsService functions
export { useStudentPoints, useTopStudents, addPointsToStudent, useStudents };

// Re-export trialService functions
export { useTrialRequests, useTrialRequest, useUpdateTrialRequest, useDeleteTrialRequest };

// Export default versions of the hooks for convenience
export { default as useAdminCheckDefault } from './adminService/hooks/useAdminCheck';
export { default as useStudentProfilesDefault } from './adminService/hooks/useStudentProfiles';
export { default as useStudentProfileDefault } from './adminService/hooks/useStudentProfile';
export { default as useStudentExtendedProfileDefault } from './adminService/hooks/useStudentExtendedProfile';
export { default as useUpdateStudentExtendedProfileDefault } from './adminService/hooks/useUpdateStudentExtendedProfile';
export { default as useUpdateStudentProfileDefault } from './adminService/hooks/useUpdateStudentProfile';
export { default as useDeleteStudentProfileDefault } from './adminService/hooks/useDeleteStudentProfile';
export { default as useDashboardStatsDefault } from './adminService/hooks/useDashboardStats';
