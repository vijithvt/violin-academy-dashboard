
import { useState } from "react";
import { useUpdateStudentProfile, StudentProfile } from "@/api/adminService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";

interface StudentProfileDetailsProps {
  profile: StudentProfile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const StudentProfileDetails = ({
  profile,
  open,
  onOpenChange,
}: StudentProfileDetailsProps) => {
  const [name, setName] = useState(profile.name);
  const [role, setRole] = useState(profile.role);
  const updateMutation = useUpdateStudentProfile();
  const isMobile = useMediaQuery("(max-width: 640px)");

  const handleSave = async () => {
    updateMutation.mutate({
      id: profile.id,
      updates: {
        name,
        role,
      },
    });
    
    // Close the dialog after saving
    if (!updateMutation.isPending) {
      onOpenChange(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const Content = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-500 mb-1">
            Name
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {profile.email && (
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-500 mb-1">
              Email
            </label>
            <Input
              id="email"
              value={profile.email}
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>
        )}

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-500 mb-1">
            Role
          </label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Joined Date
          </label>
          <p className="text-sm text-gray-700">{formatDate(profile.created_at)}</p>
        </div>
      </div>

      <div className="border-t pt-4 mt-4 flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSave}
          disabled={updateMutation.isPending}
        >
          {updateMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </div>
  );

  return isMobile ? (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Edit Student Profile</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <Content />
        </div>
      </SheetContent>
    </Sheet>
  ) : (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Student Profile</DialogTitle>
        </DialogHeader>
        <Content />
      </DialogContent>
    </Dialog>
  );
};

export default StudentProfileDetails;
