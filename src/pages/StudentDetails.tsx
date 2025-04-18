
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Loader2, Edit, Trash2, ArrowLeft } from "lucide-react";

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

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const studentDoc = await getDoc(doc(db, "students", id!));
        if (studentDoc.exists()) {
          setStudent({ id: studentDoc.id, ...studentDoc.data() } as Student);
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Student not found",
          });
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching student:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch student details",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id, navigate, toast]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    
    setDeleting(true);
    try {
      await deleteDoc(doc(db, "students", id!));
      toast({
        title: "Success",
        description: "Student deleted successfully",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting student:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete student",
      });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!student) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={() => navigate(`/edit-student/${student.id}`)}
              className="gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
              className="gap-2"
            >
              {deleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              Delete
            </Button>
          </div>
        </div>

        <Card className="bg-white shadow-lg">
          <CardHeader className="border-b">
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 rounded-full overflow-hidden bg-indigo-100">
                {student.photoURL ? (
                  <img
                    src={student.photoURL}
                    alt={student.fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-indigo-300">
                      {student.fullName.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {student.fullName}
                </h1>
                <p className="text-gray-500">Level: {student.learningLevel}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-gray-900">{student.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Mobile</h3>
                <p className="mt-1 text-gray-900">{student.mobile}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                <p className="mt-1 text-gray-900">{student.gender}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Date of Birth
                </h3>
                <p className="mt-1 text-gray-900">{student.dateOfBirth}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Guardian Name
                </h3>
                <p className="mt-1 text-gray-900">{student.guardianName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                <p className="mt-1 text-gray-900">{student.address}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Guru Name</h3>
                <p className="mt-1 text-gray-900">{student.guruName || "-"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDetails;
