
// Export all types from types file
export * from './types';

// Export all services from the service files
export * from './pointsService';
export * from './trialService';

// Export hooks directly
export { useStudentProfiles } from '../api/adminService/hooks/useStudentProfiles';
export { useStudentProfile } from '../api/adminService/hooks/useStudentProfile';
export { useStudentExtendedProfile } from '../api/adminService/hooks/useStudentExtendedProfile';
export type { StudentExtendedProfile } from '../api/adminService/hooks/useStudentExtendedProfile';
export { useUpdateStudentExtendedProfile } from '../api/adminService/hooks/useUpdateStudentExtendedProfile';
export { useUpdateStudentProfile } from '../api/adminService/hooks/useUpdateStudentProfile';
export { useDeleteStudentProfile } from '../api/adminService/hooks/useDeleteStudentProfile';

// Export default useTotalStudentPoints
export { default as useTotalStudentPoints } from './useTotalStudentPoints';

// Also export default versions of the hooks
export { default as useStudentProfilesDefault } from '../api/adminService/hooks/useStudentProfiles';
export { default as useStudentProfileDefault } from '../api/adminService/hooks/useStudentProfile';
export { default as useStudentExtendedProfileDefault } from '../api/adminService/hooks/useStudentExtendedProfile';
export { default as useUpdateStudentExtendedProfileDefault } from '../api/adminService/hooks/useUpdateStudentExtendedProfile';
export { default as useUpdateStudentProfileDefault } from '../api/adminService/hooks/useUpdateStudentProfile';
export { default as useDeleteStudentProfileDefault } from '../api/adminService/hooks/useDeleteStudentProfile';
