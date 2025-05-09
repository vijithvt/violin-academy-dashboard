
// Export all services from the refactored files
export * from './types';
export * from './pointsService';
export * from './trialService';
export { default as useTotalStudentPoints } from './useTotalStudentPoints';

// Export all hooks directly using both named exports and defaults
export { useStudentProfiles, default as useStudentProfilesDefault } from './hooks/useStudentProfiles';
export { useStudentProfile, default as useStudentProfileDefault } from './hooks/useStudentProfile';
export { useStudentExtendedProfile, default as useStudentExtendedProfileDefault } from './hooks/useStudentExtendedProfile';
export { useUpdateStudentExtendedProfile, default as useUpdateStudentExtendedProfileDefault } from './hooks/useUpdateStudentExtendedProfile';
export { useUpdateStudentProfile, default as useUpdateStudentProfileDefault } from './hooks/useUpdateStudentProfile';
export { useDeleteStudentProfile, default as useDeleteStudentProfileDefault } from './hooks/useDeleteStudentProfile';
export { useDashboardStats, default as useDashboardStatsDefault } from './hooks/useDashboardStats';
export { useAdminCheck, default as useAdminCheckDefault } from './hooks/useAdminCheck';

// Export student profile types
export type { StudentProfile } from './types';
