
// Import all hooks and types
import { useAdminCheck } from './api/adminService/hooks/useAdminCheck';
import { useStudentProfiles } from './api/adminService/hooks/useStudentProfiles';
import { useStudentProfile } from './api/adminService/hooks/useStudentProfile';
import { useStudentExtendedProfile, StudentExtendedProfile } from './api/adminService/hooks/useStudentExtendedProfile';
import { useUpdateStudentExtendedProfile } from './api/adminService/hooks/useUpdateStudentExtendedProfile';
import { useUpdateStudentProfile } from './api/adminService/hooks/useUpdateStudentProfile';
import { useDeleteStudentProfile } from './api/adminService/hooks/useDeleteStudentProfile';
import { useDashboardStats } from './api/adminService/hooks/useDashboardStats';
import { StudentProfile, DashboardStats } from './api/adminService/types';
import { StudentPoints, TopStudent, TrialRequest } from './api/adminService/types';
import useTotalStudentPoints from './api/adminService/useTotalStudentPoints';

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
export { default as useAdminCheckDefault } from './api/adminService/hooks/useAdminCheck';
export { default as useStudentProfilesDefault } from './api/adminService/hooks/useStudentProfiles';
export { default as useStudentProfileDefault } from './api/adminService/hooks/useStudentProfile';
export { default as useStudentExtendedProfileDefault } from './api/adminService/hooks/useStudentExtendedProfile';
export { default as useUpdateStudentExtendedProfileDefault } from './api/adminService/hooks/useUpdateStudentExtendedProfile';
export { default as useUpdateStudentProfileDefault } from './api/adminService/hooks/useUpdateStudentProfile';
export { default as useDeleteStudentProfileDefault } from './api/adminService/hooks/useDeleteStudentProfile';
export { default as useDashboardStatsDefault } from './api/adminService/hooks/useDashboardStats';

// Export functions from the adminService module
export * from './api/adminService/pointsService';
export * from './api/adminService/trialService';
