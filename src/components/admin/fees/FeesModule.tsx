
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { 
  Check, 
  Clock, 
  AlertTriangle, 
  Download, 
  Calendar, 
  Filter, 
  Loader2,
  Receipt,
  QrCode
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import qrCodeImage from "/lovable-uploads/f9ac38e5-1bd9-4dbe-ac19-73b8866cc805.png";
import { useFeeRecords, useGenerateFeeReceipt } from "@/api/adminService/feesService";
import { FeeRecord } from "@/api/adminService/types";

const FeesModule = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>(format(new Date(), "yyyy-MM"));
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isGeneratingReceipt, setIsGeneratingReceipt] = useState<string | null>(null);
  
  const { data: feeRecords = [], isLoading: isLoadingFees } = useFeeRecords(selectedMonth, levelFilter, statusFilter, searchQuery);
  const generateReceipt = useGenerateFeeReceipt();
  const { toast } = useToast();
  
  // Calculate outstanding amounts
  const totalDueMonths = feeRecords.filter(fee => fee.status === "pending" || fee.status === "overdue").length;
  const totalOutstandingAmount = feeRecords.reduce((sum, fee) => 
    (fee.status === "pending" || fee.status === "overdue") ? sum + fee.amount : sum, 0);
    
  const handleGenerateReceipt = async (feeId: string, studentName: string) => {
    setIsGeneratingReceipt(feeId);
    try {
      await generateReceipt.mutateAsync(feeId);
      toast({
        title: "Receipt generated",
        description: `Receipt for ${studentName} has been generated and is ready for download.`,
      });
    } catch (error) {
      toast({
        title: "Error generating receipt",
        description: "There was a problem generating the receipt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingReceipt(null);
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500 hover:bg-green-600"><Check size={14} className="mr-1" /> Paid</Badge>;
      case "pending":
        return <Badge className="bg-amber-500 hover:bg-amber-600"><Clock size={14} className="mr-1" /> Pending</Badge>;
      case "overdue":
        return <Badge className="bg-red-500 hover:bg-red-600"><AlertTriangle size={14} className="mr-1" /> Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Fee Management Panel */}
        <motion.div 
          className="lg:w-2/3 space-y-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Summary Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={itemVariants}
          >
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <h4 className="text-sm font-medium text-gray-500">Due Months</h4>
              <motion.p 
                className="text-2xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {totalDueMonths}
              </motion.p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <h4 className="text-sm font-medium text-gray-500">Outstanding Amount</h4>
              <motion.p 
                className="text-2xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                ₹{totalOutstandingAmount.toLocaleString()}
              </motion.p>
            </div>
          </motion.div>
          
          {/* Filters */}
          <motion.div 
            className="bg-white p-4 rounded-lg shadow border border-gray-200"
            variants={itemVariants}
          >
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="w-full md:w-1/3">
                <label className="block text-sm font-medium mb-1">Month</label>
                <div className="flex">
                  <Input 
                    type="month" 
                    value={selectedMonth} 
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full"
                  />
                  <Button 
                    variant="outline"
                    size="icon"
                    className="ml-2"
                    onClick={() => setSelectedMonth(format(new Date(), "yyyy-MM"))}
                  >
                    <Calendar size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="w-full md:w-1/4">
                <label className="block text-sm font-medium mb-1">Level</label>
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="AARAMBHA">AARAMBHA</SelectItem>
                    <SelectItem value="MADHYAMA">MADHYAMA</SelectItem>
                    <SelectItem value="UTTHAMA">UTTHAMA</SelectItem>
                    <SelectItem value="VIDHWATH">VIDHWATH</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full md:w-1/4">
                <label className="block text-sm font-medium mb-1">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                variant="outline"
                className="w-full md:w-auto"
                onClick={() => {
                  setLevelFilter("all");
                  setStatusFilter("all");
                  setSearchQuery("");
                }}
              >
                <Filter size={16} className="mr-2" /> Reset Filters
              </Button>
            </div>
            
            <div className="mt-4">
              <Input 
                placeholder="Search by student name..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
          
          {/* Fees Table */}
          <motion.div 
            className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
            variants={itemVariants}
          >
            {isLoadingFees ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Loading fee records...</span>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Month</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feeRecords.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        No fee records found for the selected filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    feeRecords.map((fee: FeeRecord) => (
                      <motion.tr 
                        key={fee.id}
                        className={cn(
                          "transition-all",
                          fee.status === "paid" && "bg-green-50",
                          fee.status === "pending" && "bg-amber-50",
                          fee.status === "overdue" && "bg-red-50",
                          "hover:bg-gray-50"
                        )}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                      >
                        <TableCell>{fee.student_name}</TableCell>
                        <TableCell>{fee.level}</TableCell>
                        <TableCell>
                          {new Date(fee.month + "-01").toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long' 
                          })}
                        </TableCell>
                        <TableCell>₹{fee.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          {renderStatusBadge(fee.status)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={fee.status !== "paid" || isGeneratingReceipt === fee.id}
                            onClick={() => handleGenerateReceipt(fee.id, fee.student_name)}
                          >
                            {isGeneratingReceipt === fee.id ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                Generating...
                              </>
                            ) : (
                              <>
                                <Receipt className="h-4 w-4 mr-1" />
                                Receipt
                              </>
                            )}
                          </Button>
                        </TableCell>
                      </motion.tr>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </motion.div>
          
          {/* Export Controls */}
          <motion.div 
            className="flex justify-end gap-2"
            variants={itemVariants}
          >
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </motion.div>
        </motion.div>
        
        {/* QR Code Panel */}
        <motion.div 
          className="lg:w-1/3"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
        >
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h3 className="text-lg font-medium mb-4 text-center">Payment Information</h3>
            
            <div className="flex justify-center mb-4">
              <div className="border-4 border-gray-100 p-2 rounded-lg">
                <img 
                  src={qrCodeImage} 
                  alt="Payment QR Code" 
                  className="w-48 h-48 object-contain"
                />
              </div>
            </div>
            
            <p className="text-sm text-center mb-6 text-gray-500">
              Scan to Pay
            </p>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold">Name:</span>
                <span>Vijith V T</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">A/C:</span>
                <span>026410101120</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">IFSC:</span>
                <span>IPOS0000001</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">GPay:</span>
                <span>9496315903</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <h4 className="font-medium mb-2">Instructions</h4>
              <ol className="list-decimal list-inside text-sm space-y-1 text-gray-600">
                <li>Scan the QR code or use the account details above</li>
                <li>Include the student's name in the payment reference</li>
                <li>Send the payment screenshot to the admin</li>
                <li>Receive your receipt after verification</li>
              </ol>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeesModule;
