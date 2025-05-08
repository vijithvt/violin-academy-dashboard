
import { useState } from "react";
import { useUpdateTrialRequest, TrialRequest } from "@/api/adminService";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";

interface TrialRequestDetailsProps {
  request: TrialRequest;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TrialRequestDetails = ({
  request,
  open,
  onOpenChange,
}: TrialRequestDetailsProps) => {
  const [status, setStatus] = useState(request.status);
  const [notes, setNotes] = useState(request.notes || "");
  const updateMutation = useUpdateTrialRequest();
  const isMobile = useMediaQuery("(max-width: 640px)");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSave = async () => {
    updateMutation.mutate({
      id: request.id,
      updates: {
        status,
        notes,
      },
    });
    
    // Close the dialog after saving
    if (!updateMutation.isPending) {
      onOpenChange(false);
    }
  };

  const DetailItem = ({ label, value }: { label: string; value: string | null }) => (
    <div className="mb-4">
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <p className="text-base">{value || "—"}</p>
    </div>
  );

  const Content = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
      <div className="space-y-4 md:col-span-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{request.student_name}</h3>
          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
            status === 'new' ? 'bg-blue-100 text-blue-800' :
            status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
            status === 'scheduled' ? 'bg-purple-100 text-purple-800' :
            status === 'completed' ? 'bg-green-100 text-green-800' :
            status === 'rejected' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>

        <div className="border-t pt-4 mt-2">
          <h4 className="font-medium mb-2">Contact Information</h4>
          <DetailItem label="Name" value={request.name} />
          <DetailItem label="Email" value={request.email} />
          <DetailItem label="Mobile Number" value={request.mobile_number} />
          <DetailItem label="WhatsApp Number" value={request.whatsapp_number} />
        </div>

        <div className="border-t pt-4 mt-2">
          <h4 className="font-medium mb-2">Student Information</h4>
          <DetailItem label="Student Name" value={request.student_name} />
          <DetailItem label="Age" value={request.age} />
          <DetailItem label="Location" 
            value={`${request.city}, ${request.state}, ${request.country}`} 
          />
          <DetailItem label="Timezone" value={request.timezone} />
        </div>

        <div className="border-t pt-4 mt-2">
          <h4 className="font-medium mb-2">Course Information</h4>
          <DetailItem label="Course" value={request.course} />
          <DetailItem label="Level" value={request.level} />
          <DetailItem label="Preferred Time" value={request.preferred_time} />
          <DetailItem label="Submission Date" value={formatDate(request.created_at)} />
        </div>

        <div className="border-t pt-4 mt-2">
          <h4 className="font-medium mb-2">Admin Actions</h4>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-500 mb-1">
              Status
            </label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-500 mb-1">
              Admin Notes
            </label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this trial request"
              className="min-h-[100px]"
            />
          </div>
        </div>
      </div>

      <div className="md:col-span-2 border-t pt-4 mt-2 flex justify-end gap-2">
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
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Trial Request Details</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <Content />
        </div>
      </SheetContent>
    </Sheet>
  ) : (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Trial Request Details</DialogTitle>
        </DialogHeader>
        <Content />
      </DialogContent>
    </Dialog>
  );
};

export default TrialRequestDetails;
