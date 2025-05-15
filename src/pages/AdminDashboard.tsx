import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "@/context/SupabaseContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Loader2, BarChart, Clock, UserPlus, Eye, LogOut, Search, Filter, SortAsc, SortDesc } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import StudentStatsOverview from "@/components/admin/StudentStatsOverview";
import TopPracticingStudents from "@/components/admin/TopPracticingStudents";

interface PracticeSummary {
  id: string;
  name: string;
  total_minutes: number;
  last_practice: string | null;
}

const AdminDashboard = () => {
  const { supabase, user, logout } = useSupabase();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [practiceSummaries, setPracticeSummaries] = useState<PracticeSummary[]>([]);
  const [filteredSummaries, setFilteredSummaries] = useState<PracticeSummary[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  // Fix: Corrected the type declaration for sortField useState
  const [sortField, setSortField] = useState<"name" | "total_minutes" | "last_practice">("total_minutes");
  // Fix: Corrected the type declaration for sortDirection useState
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [showFilters, setShowFilters] = useState(false);
  const [minMinutes, setMinMinutes] = useState("");
  const [maxMinutes, setMaxMinutes] = useState("");
  const itemsPerPage = 5;
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin-login");
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "An error occurred during logout. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        navigate("/admin-login");
        return;
      }
      
      try {
        // Using the secure function we just created
        const { data, error } = await supabase.rpc('is_admin_secure');
        
        if (error) {
          console.error("Error checking admin status:", error);
          throw error;
        }
        
        setIsAdmin(!!data);
        if (!data) {
          // Not an admin, redirect
          toast({
            title: "Access Denied",
            description: "You don't have permission to access this page",
            variant: "destructive"
          });
          navigate("/");
        }
      } catch (error: any) {
        console.error("Admin check exception:", error);
        toast({
          title: "Authentication Error",
          description: error.message || "Failed to verify admin status",
          variant: "destructive"
        });
        navigate("/admin-login");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAdmin();
  }, [user, navigate, supabase, toast]);
  
  // Fetch practice data for all students
  useEffect(() => {
    const fetchPracticeSummaries = async () => {
      if (!isAdmin) return;
      
      try {
        // Get all profiles that are students
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, name')
          .eq('role', 'student');
          
        if (profilesError) {
          console.error("Error fetching profiles:", profilesError);
          throw profilesError;
        }
        
        if (!profiles || profiles.length === 0) {
          setPracticeSummaries([]);
          setFilteredSummaries([]);
          return;
        }
        
        // For each student, get their practice data
        const summaries: PracticeSummary[] = [];
        
        for (const profile of profiles) {
          try {
            // Get total minutes
            const { data: practiceData, error: practiceError } = await supabase
              .from('practice_sessions')
              .select('minutes, date')
              .eq('user_id', profile.id)
              .order('date', { ascending: false });
              
            if (practiceError) {
              console.error(`Error fetching practice data for ${profile.name}:`, practiceError);
              continue; // Skip this user but continue with others
            }
            
            const totalMinutes = practiceData?.reduce((sum, session) => sum + session.minutes, 0) || 0;
            const lastPractice = practiceData && practiceData.length > 0 ? practiceData[0].date : null;
            
            summaries.push({
              id: profile.id,
              name: profile.name,
              total_minutes: totalMinutes,
              last_practice: lastPractice
            });
          } catch (err) {
            console.error(`Error processing practice data for ${profile.name}:`, err);
          }
        }
        
        // Sort by most practice time by default
        const sortedSummaries = sortPracticeSummaries(summaries, sortField, sortDirection);
        setPracticeSummaries(sortedSummaries);
        setFilteredSummaries(sortedSummaries);
        
      } catch (error: any) {
        console.error("Error in fetchPracticeSummaries:", error);
        toast({
          title: "Error loading data",
          description: error.message || "Failed to load practice data",
          variant: "destructive"
        });
      }
    };
    
    if (isAdmin && !isLoading) {
      fetchPracticeSummaries();
    }
  }, [isAdmin, isLoading, supabase, toast, sortField, sortDirection]);
  
  // Sort practice summaries
  const sortPracticeSummaries = (
    summaries: PracticeSummary[], 
    field: "name" | "total_minutes" | "last_practice", 
    direction: "asc" | "desc"
  ) => {
    return [...summaries].sort((a, b) => {
      // Handle different field types
      let comparison = 0;
      
      if (field === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (field === "total_minutes") {
        comparison = a.total_minutes - b.total_minutes;
      } else if (field === "last_practice") {
        // Handle null values for last_practice
        if (!a.last_practice && !b.last_practice) comparison = 0;
        else if (!a.last_practice) comparison = 1; // null values come last
        else if (!b.last_practice) comparison = -1;
        else comparison = new Date(a.last_practice).getTime() - new Date(b.last_practice).getTime();
      }
      
      // Apply sort direction
      return direction === "asc" ? comparison : -comparison;
    });
  };
  
  // Toggle sort direction
  const toggleSort = (field: "name" | "total_minutes" | "last_practice") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };
  
  // Handle search and filter
  useEffect(() => {
    let results = [...practiceSummaries];
    
    // Apply search
    if (searchTerm.trim()) {
      results = results.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply minute filters
    if (minMinutes.trim()) {
      const min = parseInt(minMinutes);
      if (!isNaN(min)) {
        results = results.filter(student => student.total_minutes >= min);
      }
    }
    
    if (maxMinutes.trim()) {
      const max = parseInt(maxMinutes);
      if (!isNaN(max)) {
        results = results.filter(student => student.total_minutes <= max);
      }
    }
    
    // Apply sorting
    results = sortPracticeSummaries(results, sortField, sortDirection);
    
    setFilteredSummaries(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, minMinutes, maxMinutes, practiceSummaries, sortField, sortDirection]);
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setMinMinutes("");
    setMaxMinutes("");
    setFilteredSummaries([...practiceSummaries]);
    setShowFilters(false);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }
  
  if (!isAdmin) {
    return null; // Will redirect in useEffect
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredSummaries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSummaries = filteredSummaries.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Navigate to student details
  const viewStudentDetails = (studentId: string) => {
    navigate(`/admin/student-practice/${studentId}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-indigo-200">Violin Academy Management</p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
              <Button 
                onClick={() => navigate("/dashboard/admin/register-student-simple")}
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              >
                <UserPlus size={18} />
                Add New Student
              </Button>
              <Button 
                onClick={() => navigate("/dashboard/admin/register-student")}
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                variant="outline"
              >
                Advanced Registration
              </Button>
              <Button 
                onClick={() => navigate("/home")}
                className="px-4 py-2 bg-white text-indigo-700 rounded-md hover:bg-indigo-50 transition-colors"
              >
                Return to Home
              </Button>
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="flex items-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        {/* Stats and Top Students Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StudentStatsOverview />
          <TopPracticingStudents />
        </div>
        
        {/* Practice Hours Table */}
        <Card className="mb-8">
          <CardHeader className="bg-indigo-50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <CardTitle className="flex items-center text-indigo-800">
                  <BarChart className="mr-2 h-5 w-5" />
                  Student Practice Hours
                </CardTitle>
                <CardDescription>
                  Overview of practice time logged by all students
                </CardDescription>
              </div>
              <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search students..."
                    className="pl-8 pr-4 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-1">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Filter Practice Hours</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="p-2">
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium">Min Minutes</label>
                        <Input 
                          type="number" 
                          placeholder="Min"
                          value={minMinutes}
                          onChange={(e) => setMinMinutes(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col space-y-2 mt-2">
                        <label className="text-sm font-medium">Max Minutes</label>
                        <Input 
                          type="number" 
                          placeholder="Max"
                          value={maxMinutes}
                          onChange={(e) => setMaxMinutes(e.target.value)}
                        />
                      </div>
                      <Button 
                        className="w-full mt-4" 
                        variant="secondary"
                        onClick={resetFilters}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            {filteredSummaries.length > 0 ? (
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead onClick={() => toggleSort("name")} className="cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-1">
                          <span>Student</span>
                          {sortField === "name" && (
                            sortDirection === "asc" ? 
                              <SortAsc className="h-4 w-4" /> : 
                              <SortDesc className="h-4 w-4" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead onClick={() => toggleSort("total_minutes")} className="cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-1">
                          <span>Total Practice</span>
                          {sortField === "total_minutes" && (
                            sortDirection === "asc" ? 
                              <SortAsc className="h-4 w-4" /> : 
                              <SortDesc className="h-4 w-4" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead onClick={() => toggleSort("last_practice")} className="cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-1">
                          <span>Last Practice</span>
                          {sortField === "last_practice" && (
                            sortDirection === "asc" ? 
                              <SortAsc className="h-4 w-4" /> : 
                              <SortDesc className="h-4 w-4" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedSummaries.map((student) => (
                      <TableRow key={student.id} className="hover:bg-gray-50 cursor-pointer">
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-indigo-500 mr-2" />
                            <div className="space-x-1">
                              <span className="font-medium text-gray-900">
                                {(student.total_minutes / 60).toFixed(1)} hours
                              </span>
                              <span className="text-gray-500 text-sm">
                                ({student.total_minutes} mins)
                              </span>
                            </div>
                          </div>
                          {/* Progress bar showing relative amount compared to top student */}
                          <div className="w-full bg-gray-200 h-1.5 mt-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-indigo-500 h-full rounded-full"
                              style={{ 
                                width: `${Math.max(
                                  5,
                                  (student.total_minutes / (practiceSummaries[0]?.total_minutes || 1)) * 100
                                )}%` 
                              }}
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-500">
                            {student.last_practice 
                              ? new Date(student.last_practice).toLocaleDateString() 
                              : 'Never'}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => viewStudentDetails(student.id)}
                          >
                            <Eye className="h-3.5 w-3.5" />
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {/* No results message */}
                {paginatedSummaries.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No students match your search criteria.</p>
                    <Button variant="link" onClick={resetFilters}>
                      Reset filters
                    </Button>
                  </div>
                )}
                
                {/* Pagination controls */}
                {totalPages > 1 && (
                  <Pagination className="mt-4">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <PaginationItem key={index}>
                          <PaginationLink
                            onClick={() => setCurrentPage(index + 1)}
                            isActive={currentPage === index + 1}
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No practice data available yet.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
