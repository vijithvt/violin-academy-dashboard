import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut, Plus, Music, Users } from "lucide-react";

interface Student {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  gender: string;
  dateOfBirth: string;
  guardianName: string;
  address: string;
  learningLevel: string;
  guruName: string;
  photoURL: string;
}

const Dashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Fetch all students from Firestore
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsCollection = collection(db, "students");
        const snapshot = await getDocs(studentsCollection);
        const studentsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Student[];
        
        setStudents(studentsData);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Handle user logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin-login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Navigate to admission form
  const goToAdmissionForm = () => {
    navigate("/admission");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Music className="h-8 w-8 text-indigo-700" />
              <h1 className="ml-2 text-2xl font-bold text-indigo-900">Violin Academy Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={goToAdmissionForm}
                className="bg-indigo-700 hover:bg-indigo-800"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Student
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <Users className="h-12 w-12 text-indigo-700" />
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Total Students</h2>
              <p className="text-3xl font-bold text-gray-900">{loading ? "-" : students.length}</p>
            </div>
          </div>
        </div>

        {/* Students grid */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Students</h2>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-700" />
            </div>
          ) : students.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No students registered</h3>
              <p className="text-gray-500 mb-6">Add a new student to get started</p>
              <Button 
                onClick={goToAdmissionForm}
                className="bg-indigo-700 hover:bg-indigo-800"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
                  onClick={() => navigate(`/student/${student.id}`)}
                >
                  <div className="h-48 bg-gray-200 relative overflow-hidden">
                    {student.photoURL ? (
                      <img 
                        src={student.photoURL} 
                        alt={student.fullName}
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-indigo-100">
                        <span className="text-5xl font-bold text-indigo-300">
                          {student.fullName.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{student.fullName}</h3>
                    <p className="text-sm text-gray-500 mb-3">Level: {student.learningLevel}</p>
                    
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-600">
                        <span className="font-medium">Gender:</span> {student.gender}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Mobile:</span> {student.mobile}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Email:</span> {student.email}
                      </p>
                      {student.guruName && (
                        <p className="text-gray-600">
                          <span className="font-medium">Guru:</span> {student.guruName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
