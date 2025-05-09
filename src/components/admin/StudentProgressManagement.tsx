
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define the syllabus data structure
const SYLLABUS = {
  1: {
    title: "LEVEL 1 — AARAMBHA (Beginner)",
    description: "Varisais (Sarali Varisai - Alankaram)",
    duration: "9-12 months",
    concepts: ["Tuning", "Violin posture", "Bow hold", "Left-hand hold", "Metronome playing", 
               "Basic bow strokes", "Basic string crossing", "3rd position playing", "Tala and Raga Theory", "Janta gamaka"],
    songs: ["Twinkle Twinkle Little Star", "Rama Janardhana", "Santhatam Pahimam", "Sakti Sahita Ganapatim", "Shyamale Meenakshi"],
    exercises: ["Sarali Varisai", "Janta Varisai", "Thattuvarisa", "Mel Stayi Varisai", "Alankaram"],
    modules: [
      "Basic Tuning", 
      "Violin posture", 
      "Bow hold techniques", 
      "Left-hand positioning", 
      "Metronome practice", 
      "Sarali Varisai", 
      "Janta Varisai", 
      "Thattuvarisa",
      "Mel Stayi Varisai", 
      "Alankaram"
    ]
  },
  2: {
    title: "LEVEL 2 — MADHYAMA (Intermediate)",
    description: "Geethams, Bhajans",
    duration: "12-15 months",
    concepts: ["Basic Gamakas", "Raga theory", "2nd position playing", "Important bow strokes", 
               "String crossing dexterity", "String changing and bridge setting workshop"],
    songs: ["Geethams", "Jathy Swaras", "Swarajathis", "Simple film songs"],
    exercises: ["2nd position playing", "Important bow strokes", "String crossing", "Vibrato"],
    modules: [
      "Basic Gamakas", 
      "Raga theory", 
      "2nd position playing", 
      "Bow stroke techniques", 
      "String crossing exercises", 
      "Geethams practice", 
      "Jathy Swaras", 
      "Swarajathis",
      "Film songs practice", 
      "String changing workshop"
    ]
  },
  3: {
    title: "LEVEL 3 — UTTHAMA (Advanced)",
    description: "Varnams, Krithis",
    duration: "2.5-3 years",
    concepts: ["Advanced Gamakas", "Raga delineation", "Alapana/Kalpanaswaram basics", "Advanced Tala methods", 
               "4th, 5th position playing", "Advanced bow strokes", "Advanced String crossing", "Advanced vibrato", 
               "Home recording and electric violin processing workshop"],
    songs: ["Varnams", "Ata Thala Varnams", "Krithis (Maha Ganapathim, Deva Deva Kalayamithe)", "Film songs"],
    exercises: ["3rd and 4th position playing", "Advanced bow strokes", "Advanced string crossing", 
                "Advanced vibrato exercises", "Speed training", "Ear training"],
    modules: [
      "Advanced Gamakas", 
      "Raga delineation", 
      "Alapana basics", 
      "Kalpanaswaram basics", 
      "Advanced Tala methods", 
      "Position playing (4th-5th)", 
      "Advanced bow techniques", 
      "Varnams practice",
      "Ata Thala Varnams", 
      "Krithis practice",
      "Speed training exercises",
      "Recording workshop"
    ]
  },
  4: {
    title: "LEVEL 4 — VIDHWATH (Professional)",
    description: "Krithis, Kalpana Swaram, Alapana, Performance",
    duration: "Ongoing",
    concepts: ["Alapana", "Kalpana Swaras", "Improvisation", "Fusion/Film music playing", 
               "Guidance on performance and expression"],
    songs: ["Krithis", "Thillanas", "Pancharatna Krithis"],
    exercises: ["Alapana play-alongs", "Kalpana Swara patterns", "Toolkits for improvisation"],
    modules: [
      "Alapana development", 
      "Kalpana Swaras techniques", 
      "Improvisation methods", 
      "Fusion music training", 
      "Film music techniques", 
      "Performance coaching", 
      "Krithis repertoire", 
      "Thillanas practice",
      "Pancharatna Krithis", 
      "Concert preparation"
    ]
  }
};

// Define the form schema
const progressFormSchema = z.object({
  level: z.string(),
  currentModule: z.string(),
  progressPercentage: z.number().min(0).max(100),
  teacherNotes: z.string().optional(),
});

type ProgressFormData = z.infer<typeof progressFormSchema>;

interface StudentProgressProps {
  studentId: string;
  initialData?: {
    level: number;
    currentModule: string;
    progressPercentage: number;
    teacherNotes?: string;
    lastUpdated?: string;
  };
  onUpdate?: () => void;
}

export const StudentProgressManagement = ({ 
  studentId, 
  initialData,
  onUpdate 
}: StudentProgressProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<number>(initialData?.level || 1);
  
  // Initialize form with data or defaults
  const form = useForm<ProgressFormData>({
    resolver: zodResolver(progressFormSchema),
    defaultValues: {
      level: initialData?.level?.toString() || "1",
      currentModule: initialData?.currentModule || SYLLABUS[1].modules[0],
      progressPercentage: initialData?.progressPercentage || 0,
      teacherNotes: initialData?.teacherNotes || "",
    },
  });
  
  // Handle level change to update module options
  const handleLevelChange = (level: string) => {
    setSelectedLevel(parseInt(level));
    // Reset current module when level changes
    form.setValue("currentModule", SYLLABUS[parseInt(level)].modules[0]);
  };
  
  // Submit handler
  const onSubmit = async (data: ProgressFormData) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('student_progress')
        .upsert({
          user_id: studentId,
          level: parseInt(data.level),
          current_module: data.currentModule,
          progress_percentage: data.progressPercentage,
          teacher_notes: data.teacherNotes || null,
          last_updated: new Date().toISOString()
        });
        
      if (error) throw error;
      
      toast({
        title: "Progress updated",
        description: "Student progress has been successfully updated.",
      });
      
      // Call the update callback if provided
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "An error occurred while updating progress",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Student Progress Management</CardTitle>
          <CardDescription>
            Update the student's progress through the violin curriculum
          </CardDescription>
        </CardHeader>
        <CardContent>
          {initialData && initialData.lastUpdated && (
            <p className="text-sm text-muted-foreground mb-4">
              Last updated: {format(new Date(initialData.lastUpdated), "PPP 'at' p")}
            </p>
          )}
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Current Progress</h3>
            <Progress value={initialData?.progressPercentage || 0} className="h-2" />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">0%</span>
              <span className="text-xs text-muted-foreground">100%</span>
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Learning Level</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleLevelChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">LEVEL 1 — AARAMBHA (Beginner)</SelectItem>
                          <SelectItem value="2">LEVEL 2 — MADHYAMA (Intermediate)</SelectItem>
                          <SelectItem value="3">LEVEL 3 — UTTHAMA (Advanced)</SelectItem>
                          <SelectItem value="4">LEVEL 4 — VIDHWATH (Professional)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="currentModule"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Module</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select current module" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SYLLABUS[selectedLevel].modules.map((module) => (
                            <SelectItem key={module} value={module}>{module}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="progressPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Progress Percentage</FormLabel>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={1}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="w-12 text-center">{field.value}%</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="teacherNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teacher Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add notes about student's progress, strengths, challenges, etc." 
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Progress"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{SYLLABUS[selectedLevel].title}</CardTitle>
          <CardDescription>
            {SYLLABUS[selectedLevel].description} • Duration: {SYLLABUS[selectedLevel].duration}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Key Concepts</h3>
              <ul className="list-disc list-inside text-sm space-y-1 pl-2">
                {SYLLABUS[selectedLevel].concepts.map((concept, index) => (
                  <li key={index}>{concept}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Songs</h3>
              <ul className="list-disc list-inside text-sm space-y-1 pl-2">
                {SYLLABUS[selectedLevel].songs.map((song, index) => (
                  <li key={index}>{song}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Exercises</h3>
              <ul className="list-disc list-inside text-sm space-y-1 pl-2">
                {SYLLABUS[selectedLevel].exercises.map((exercise, index) => (
                  <li key={index}>{exercise}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProgressManagement;
