import { useState } from "react";
import { useTrialRequests, useDeleteTrialRequest, TrialRequest } from "@/api/adminService";
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
import { Loader2, Search, Eye, Trash2, Filter, ArrowUpDown } from "lucide-react";
import TrialRequestDetails from "./TrialRequestDetails";

const FreeTrialTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [selectedRequest, setSelectedRequest] = useState<TrialRequest | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null);

  const { data: trialRequests, isLoading, isError } = useTrialRequests(
    searchTerm,
    { status: statusFilter, course: courseFilter },
    sortOrder
  );
  
  const deleteRequestMutation = useDeleteTrialRequest();

  const handleViewDetails = (request: TrialRequest) => {
    setSelectedRequest(request);
    setDetailsOpen(true);
  };

  const handleDeleteRequest = (id: string) => {
    setRequestToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (requestToDelete) {
      deleteRequestMutation.mutate(requestToDelete);
      setDeleteConfirmOpen(false);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
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
        <span className="ml-2">Loading trial requests...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 text-red-800 p-4 rounded-md">
        An error occurred while loading trial requests. Please try again.
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
            placeholder="Search by name or email"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Course Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="Violin">Violin</SelectItem>
                <SelectItem value="Piano">Piano</SelectItem>
                <SelectItem value="Guitar">Guitar</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={toggleSortOrder}
          >
            <ArrowUpDown className="h-4 w-4" />
            {sortOrder === "desc" ? "Newest First" : "Oldest First"}
          </Button>
        </div>
      </div>

      {/* Trial Requests Table */}
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Instrument</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trialRequests && trialRequests.length > 0 ? (
              trialRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.name}</TableCell>
                  <TableCell>{request.email}</TableCell>
                  <TableCell>{request.mobile_number}</TableCell>
                  <TableCell>{request.course}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      request.status === 'new' ? 'bg-blue-100 text-blue-800' :
                      request.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'scheduled' ? 'bg-purple-100 text-purple-800' :
                      request.status === 'completed' ? 'bg-green-100 text-green-800' :
                      request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(request.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDetails(request)}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteRequest(request.id)}
                        title="Delete Request"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                  No trial requests found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Trial Request</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this trial request. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={confirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Trial Request Details Dialog */}
      {selectedRequest && (
        <TrialRequestDetails
          trial={selectedRequest}
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
        />
      )}
    </div>
  );
};

export default FreeTrialTable;
