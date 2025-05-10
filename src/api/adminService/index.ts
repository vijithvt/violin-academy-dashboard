
// Export all services from the refactored files
export * from './types';
export * from './pointsService';
export * from './trialService';
export { default as useTotalStudentPoints } from './useTotalStudentPoints';

// Export hooks directly
export { useAdminCheck } from './hooks/useAdminCheck';
export { useStudentProfiles } from './hooks/useStudentProfiles';
export { useStudentProfile } from './hooks/useStudentProfile';
export { useStudentExtendedProfile } from './hooks/useStudentExtendedProfile';
export { useUpdateStudentExtendedProfile } from './hooks/useUpdateStudentExtendedProfile';
export { useUpdateStudentProfile } from './hooks/useUpdateStudentProfile';
export { useDeleteStudentProfile } from './hooks/useDeleteStudentProfile';
export { useDashboardStats } from './hooks/useDashboardStats';

// Export student profile types
export type { StudentProfile } from './types';
export type { StudentExtendedProfile } from './hooks/useStudentExtendedProfile';

// Export default versions of the hooks for convenience
export { default as useAdminCheckDefault } from './hooks/useAdminCheck';
export { default as useStudentProfilesDefault } from './hooks/useStudentProfiles';
export { default as useStudentProfileDefault } from './hooks/useStudentProfile';
export { default as useStudentExtendedProfileDefault } from './hooks/useStudentExtendedProfile';
export { default as useUpdateStudentExtendedProfileDefault } from './hooks/useUpdateStudentExtendedProfile';
export { default as useUpdateStudentProfileDefault } from './hooks/useUpdateStudentProfile';
export { default as useDeleteStudentProfileDefault } from './hooks/useDeleteStudentProfile';
export { default as useDashboardStatsDefault } from './hooks/useDashboardStats';
