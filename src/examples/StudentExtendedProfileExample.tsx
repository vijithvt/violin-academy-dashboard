import React from 'react';
import { useUpdateStudentExtendedProfile, StudentExtendedProfile } from '@/api/adminService';

// This is an example component showing how to use the useUpdateStudentExtendedProfile hook
const StudentExtendedProfileExample = () => {
  const updateMutation = useUpdateStudentExtendedProfile();
  
  // Example function to update a student's profile
  const handleUpdateProfile = () => {
    const studentId = "example-user-id";
    
    // Example of updating with partial data
    // Only the fields you want to update need to be included
    // The rest will remain unchanged
    updateMutation.mutate({
      id: studentId,
      updates: {
        // Basic profile fields
        name: "John Doe",
        role: "student",
        
        // Extended profile fields
        parent_name: "Jane Doe",
        mobile_number: "+1234567890",
        address: "123 Main St",
        preferred_course: "Piano",
        learning_level: "Beginner",
        gender: "Male",
        date_of_birth: "2000-01-01",
        profession: "Student",
        preferred_timings: ["morning", "evening"],
        heard_from: "Friend",
        day_specific_timings: {
          monday: ["09:00", "17:00"],
          wednesday: ["10:00", "18:00"]
        }
      }
    });
  };
  
  // Example of creating a new student from scratch
  // When creating a new student, all required fields must be provided
  const handleCreateNewStudentProfile = () => {
    const studentId = "new-user-id";
    
    // Complete example with all required fields
    const completeStudentProfile: StudentExtendedProfile = {
      id: studentId,
      name: "New Student",
      role: "student",
      created_at: new Date().toISOString(),
      parent_name: "Parent Name",
      mobile_number: "+1987654321",
      address: "456 Second St",
      preferred_course: "Guitar",
      learning_level: "Intermediate",
      gender: "Female",
      date_of_birth: "2005-05-05",
      profession: "Student",
      preferred_timings: ["afternoon"],
      heard_from: "Website"
    };
    
    updateMutation.mutate({
      id: studentId,
      updates: completeStudentProfile
    });
  };
  
  return (
    <div>
      <h1>Student Profile Examples</h1>
      <button onClick={handleUpdateProfile}>
        Update Existing Student
      </button>
      <button onClick={handleCreateNewStudentProfile}>
        Create New Student
      </button>
      
      {updateMutation.isPending && <p>Updating profile...</p>}
      {updateMutation.isError && (
        <p>Error: {updateMutation.error.message}</p>
      )}
      {updateMutation.isSuccess && (
        <p>Profile updated successfully!</p>
      )}
    </div>
  );
};

export default StudentExtendedProfileExample;
