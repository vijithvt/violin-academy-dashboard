
// Import all hooks and types
import { useAdminCheck } from './hooks/useAdminCheck';
import { useStudentProfiles } from './hooks/useStudentProfiles';
import { useStudentProfile } from './hooks/useStudentProfile';
import { useStudentExtendedProfile, StudentExtendedProfile } from './hooks/useStudentExtendedProfile';
import { useUpdateStudentExtendedProfile } from './hooks/useUpdateStudentExtendedProfile';
import { useUpdateStudentProfile } from './hooks/useUpdateStudentProfile';
import { useDeleteStudentProfile } from './hooks/useDeleteStudentProfile';
import { useDashboardStats } from './hooks/useDashboardStats';
import { StudentProfile, DashboardStats } from './types';
import { StudentPoints, TopStudent, TrialRequest } from './types';
import useTotalStudentPoints from './useTotalStudentPoints';

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

// Export default versions of the hooks for convenience
export { default as useAdminCheckDefault } from './hooks/useAdminCheck';
export { default as useStudentProfilesDefault } from './hooks/useStudentProfiles';
export { default as useStudentProfileDefault } from './hooks/useStudentProfile';
export { default as useStudentExtendedProfileDefault } from './hooks/useStudentExtendedProfile';
export { default as useUpdateStudentExtendedProfileDefault } from './hooks/useUpdateStudentExtendedProfile';
export { default as useUpdateStudentProfileDefault } from './hooks/useUpdateStudentProfile';
export { default as useDeleteStudentProfileDefault } from './hooks/useDeleteStudentProfile';
export { default as useDashboardStatsDefault } from './hooks/useDashboardStats';

// Export functions from the adminService module
export * from './pointsService';
export * from './trialService';
