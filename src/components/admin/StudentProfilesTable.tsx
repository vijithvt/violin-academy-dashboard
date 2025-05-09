
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStudentProfiles, useDeleteStudentProfile } from "@/api/adminService";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Search, Eye, Filter, Edit, Trash2, AlertCircle, UserPlus, BookOpen } from "lucide-react";
import StudentProfileDetails from "./StudentProfileDetails";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

const StudentProfilesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState(null);
  
  const { toast } = useToast();
  const deleteMutation = useDeleteStudentProfile();

  // Pass only the roleFilter as a string
  const { data: profiles, isLoading, isError, refetch } = useStudentProfiles(roleFilter);

  const handleViewDetails = (profile) => {
    setSelectedProfile(profile);
    setDetailsOpen(true);
  };

  const handleEditProfile = (profile) => {
    setSelectedProfile(profile);
    setDetailsOpen(true);
  };

  const handleDeleteClick = (profile) => {
    setProfileToDelete(profile);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (profileToDelete) {
      try {
        await deleteMutation.mutateAsync(profileToDelete.id);
        toast({
          title: "Profile deleted",
          description: "The profile has been successfully deleted",
        });
        setDeleteDialogOpen(false);
        setProfileToDelete(null);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete profile. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getRoleBadgeStyles = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'teacher':
        return 'bg-blue-100 text-blue-800';
      case 'student':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter profiles based on search term
  const filteredProfiles = profiles?.filter(profile => 
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading student profiles...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 text-red-800 p-6 rounded-md flex flex-col items-center">
        <div className="flex items-center mb-4">
          <AlertCircle className="h-6 w-6 mr-2" />
          <span className="text-lg font-medium">Error loading student profiles</span>
        </div>
        <p className="mb-4">There was a problem retrieving the student profiles. Please try again.</p>
        <Button onClick={() => refetch()} variant="outline" className="flex items-center gap-2">
          <Loader2 className="h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Action Button and Search Row */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Link to="/student-registration">
            <Button className="w-full md:w-auto">
              <UserPlus className="h-4 w-4 mr-1" />
              Register New Student
            </Button>
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 md:w-3/4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by name"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Role Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Student Profiles Table */}
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProfiles && filteredProfiles.length > 0 ? (
              filteredProfiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">{profile.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getRoleBadgeStyles(profile.role)}`}>
                      {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(profile.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDetails(profile)}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditProfile(profile)}
                        title="Edit Profile"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {profile.role === 'student' && (
                        <Link to={`/student-progress/${profile.id}`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Manage Student Progress"
                          >
                            <BookOpen className="h-4 w-4 text-blue-500" />
                          </Button>
                        </Link>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(profile)}
                        title="Delete Profile"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                  {searchTerm ? "No matching student profiles found" : "No student profiles found"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Student Profile Details Dialog */}
      {selectedProfile && (
        <StudentProfileDetails
          profile={selectedProfile}
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this profile?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the profile
              of {profileToDelete?.name} and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default StudentProfilesTable;
