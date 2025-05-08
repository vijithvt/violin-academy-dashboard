
import { useState } from "react";
import { useStudentProfiles, StudentProfile } from "@/api/adminService";
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
import { Loader2, Search, Eye, Filter } from "lucide-react";
import StudentProfileDetails from "./StudentProfileDetails";

const StudentProfilesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<StudentProfile | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const { data: profiles, isLoading, isError } = useStudentProfiles(
    searchTerm,
    { role: roleFilter }
  );

  const handleViewDetails = (profile: StudentProfile) => {
    setSelectedProfile(profile);
    setDetailsOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
      <div className="bg-red-50 text-red-800 p-4 rounded-md">
        An error occurred while loading student profiles. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4">
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
              <SelectItem value="">All Roles</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
            </SelectContent>
          </Select>
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
            {profiles && profiles.length > 0 ? (
              profiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">{profile.name}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      profile.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      profile.role === 'teacher' ? 'bg-blue-100 text-blue-800' :
                      profile.role === 'student' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(profile.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewDetails(profile)}
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                  No student profiles found
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
    </div>
  );
};

export default StudentProfilesTable;
