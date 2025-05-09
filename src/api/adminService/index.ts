
// Export all services from the refactored files
export * from './types';
export * from './pointsService';
export * from './trialService';
export { default as useTotalStudentPoints } from './useTotalStudentPoints';

// Export all hooks directly
export { default as useStudentProfiles } from './hooks/useStudentProfiles';
export { default as useStudentProfile } from './hooks/useStudentProfile';
export { default as useStudentExtendedProfile } from './hooks/useStudentExtendedProfile';
export { default as useUpdateStudentExtendedProfile } from './hooks/useUpdateStudentExtendedProfile';
export { default as useUpdateStudentProfile } from './hooks/useUpdateStudentProfile';
export { default as useDeleteStudentProfile } from './hooks/useDeleteStudentProfile';
export { default as useDashboardStats } from './hooks/useDashboardStats';
export { default as useAdminCheck } from './hooks/useAdminCheck';

// Export student profile types
export type { StudentProfile } from './types';
