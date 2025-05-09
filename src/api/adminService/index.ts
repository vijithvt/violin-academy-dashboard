
// Export all services from the refactored files
export * from './types';
export * from './pointsService';
export * from './trialService';
export { default as useTotalStudentPoints } from './useTotalStudentPoints';

// Import hooks
import useStudentProfiles from './hooks/useStudentProfiles';
import useStudentProfile from './hooks/useStudentProfile';
import useStudentExtendedProfile from './hooks/useStudentExtendedProfile';
import useUpdateStudentExtendedProfile from './hooks/useUpdateStudentExtendedProfile';
import useUpdateStudentProfile from './hooks/useUpdateStudentProfile';
import useDeleteStudentProfile from './hooks/useDeleteStudentProfile';
import useDashboardStats from './hooks/useDashboardStats';
import useAdminCheck from './hooks/useAdminCheck';

// Export all hooks
export { 
  useStudentProfiles,
  useStudentProfile,
  useStudentExtendedProfile,
  useUpdateStudentExtendedProfile,
  useUpdateStudentProfile,
  useDeleteStudentProfile,
  useDashboardStats,
  useAdminCheck
};

// Export student profile types
export type { StudentProfile } from './types';
