
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
