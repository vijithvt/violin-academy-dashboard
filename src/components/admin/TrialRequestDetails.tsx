import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
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
import { Loader2, Copy, Check, Link as LinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TrialRequest } from "@/api/adminService/types";

interface TrialRequestDetailsProps {
  trial: TrialRequest;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TrialRequestDetails = ({
  trial,
  open,
  onOpenChange,
}: TrialRequestDetailsProps) => {
  const [status, setStatus] = useState(trial?.status || "new");
  const [notes, setNotes] = useState(trial?.notes || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [registrationLink, setRegistrationLink] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from("free_trial_requests")
        .update({
          status,
          notes
        })
        .eq("id", trial.id)
        .select();
        
      if (error) {
        throw error;
      }
      
      toast({
        title: "Trial request updated",
        description: "The trial request has been successfully updated.",
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating trial:", error);
      toast({
        title: "Update failed",
        description: "Failed to update the trial request.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateLink = () => {
    if (status !== "completed") {
      toast({
        title: "Trial not completed",
        description: "Only completed trials can have registration links generated",
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingLink(true);
    // Generate the registration link
    const link = `${window.location.origin}/register/${trial.id}`;
    setRegistrationLink(link);
    setShowLinkDialog(true);
    setIsGeneratingLink(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(registrationLink);
    setLinkCopied(true);
    toast({
      title: "Link copied to clipboard",
      description: "You can now share this link with the student"
    });
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Trial Request Details</DialogTitle>
            <DialogDescription>
              Review and update the trial request status
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-1">
              <Label className="font-medium">Student Name</Label>
              <p className="text-sm">{trial?.student_name}</p>
            </div>

            <div className="grid gap-1">
              <Label className="font-medium">Guardian Name</Label>
              <p className="text-sm">{trial?.name}</p>
            </div>

            <div className="grid gap-1">
              <Label className="font-medium">Contact</Label>
              <p className="text-sm">{trial?.mobile_number}</p>
              <p className="text-sm">{trial?.email}</p>
            </div>

            <div className="grid gap-1">
              <Label className="font-medium">Course</Label>
              <p className="text-sm">
                {trial?.course === "one_to_one"
                  ? "1-to-1 Online Course"
                  : trial?.course === "batch_class"
                  ? "Online Batch Class"
                  : "Home Tuition"}
              </p>
            </div>
            
            <div className="grid gap-1">
              <Label className="font-medium">Level</Label>
              <p className="text-sm">
                {trial?.level || "Not specified"}
              </p>
            </div>

            <div className="grid gap-1">
              <Label htmlFor="status">Status</Label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="converted">Converted to Student</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add notes about this trial request"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
            <Button
              type="button"
              variant="outline"
              onClick={handleGenerateLink}
              disabled={status !== "completed" || isGeneratingLink}
              className="gap-2 order-2 sm:order-1"
            >
              {isGeneratingLink ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LinkIcon className="h-4 w-4" />
              )}
              Generate Registration Link
            </Button>
            <div className="flex space-x-2 order-1 sm:order-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Registration Link Generated</AlertDialogTitle>
            <AlertDialogDescription>
              Share this link with the student to complete their registration
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center gap-2 mt-4">
            <Input 
              value={registrationLink}
              readOnly
              className="bg-muted"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              className="flex-shrink-0"
            >
              {linkCopied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={copyToClipboard}>
                Copy Link
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TrialRequestDetails;
