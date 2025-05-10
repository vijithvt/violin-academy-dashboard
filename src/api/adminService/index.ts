
// Export all types from types file
export * from './types';

// Export all services from the service files
export * from './pointsService';
export * from './trialService';

// Export hooks directly
export { useStudentProfiles } from './hooks/useStudentProfiles';
export { useStudentProfile } from './hooks/useStudentProfile';
export { useStudentExtendedProfile } from './hooks/useStudentExtendedProfile';
export type { StudentExtendedProfile } from './hooks/useStudentExtendedProfile';
export { useUpdateStudentExtendedProfile } from './hooks/useUpdateStudentExtendedProfile';
export { useUpdateStudentProfile } from './hooks/useUpdateStudentProfile';
export { useDeleteStudentProfile } from './hooks/useDeleteStudentProfile';

// Export default useTotalStudentPoints
export { default as useTotalStudentPoints } from './useTotalStudentPoints';

// Also export default versions of the hooks
export { default as useStudentProfilesDefault } from './hooks/useStudentProfiles';
export { default as useStudentProfileDefault } from './hooks/useStudentProfile';
export { default as useStudentExtendedProfileDefault } from './hooks/useStudentExtendedProfile';
export { default as useUpdateStudentExtendedProfileDefault } from './hooks/useUpdateStudentExtendedProfile';
export { default as useUpdateStudentProfileDefault } from './hooks/useUpdateStudentProfile';
export { default as useDeleteStudentProfileDefault } from './hooks/useDeleteStudentProfile';
