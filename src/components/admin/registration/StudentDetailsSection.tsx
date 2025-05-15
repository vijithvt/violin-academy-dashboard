
import React from "react";
import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Upload, CalendarIcon } from "lucide-react";

interface StudentDetailsSectionProps {
  photoFile: File | null;
  photoError: string;
  setPhotoFile: React.Dispatch<React.SetStateAction<File | null>>;
  setPhotoError: React.Dispatch<React.SetStateAction<string>>;
}

const StudentDetailsSection = ({
  photoFile,
  photoError,
  setPhotoFile,
  setPhotoError,
}: StudentDetailsSectionProps) => {
  const { control } = useFormContext();

  // Handle photo upload
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPhotoError("");
    
    if (!file) {
      return;
    }
    
    // Validate file size (max 1MB)
    if (file.size > 1024 * 1024) {
      setPhotoError("Photo size must be less than 1MB");
      return;
    }
    
    // Validate file type
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setPhotoError("Only JPEG, PNG, and WebP images are allowed");
      return;
    }
    
    setPhotoFile(file);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <h2 className="text-xl font-semibold border-b pb-2">Student Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="studentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name *</FormLabel>
              <FormControl>
                <Input placeholder="Student's full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Birth *</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Select date of birth</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    captionLayout="dropdown-buttons"
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                    className="rounded-md border shadow"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender *</FormLabel>
              <FormControl>
                <RadioGroup 
                  onValueChange={field.onChange} 
                  value={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="profession"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profession *</FormLabel>
              <FormControl>
                <Input placeholder="Student's profession" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="learningLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Learning Level *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a learning level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="novice">Novice</SelectItem>
                  <SelectItem value="beginner">AARAMBHA (Beginner)</SelectItem>
                  <SelectItem value="intermediate">MADHYAMA (Intermediate)</SelectItem>
                  <SelectItem value="advanced">UTTHAMA (Advanced)</SelectItem>
                  <SelectItem value="professional">VIDHWATH (Professional)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Set Password *</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Set a password for student login" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div>
        <FormLabel>Upload Photo (Max 1MB) *</FormLabel>
        <div className="mt-1">
          <div className="flex items-center gap-4">
            <label htmlFor="photo-upload" className="cursor-pointer">
              <div className="flex items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg hover:bg-gray-50">
                {photoFile ? (
                  <img
                    src={URL.createObjectURL(photoFile)}
                    alt="Preview"
                    className="object-cover w-full h-full rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center p-4 text-gray-500">
                    <Upload className="w-6 h-6 mb-2" />
                    <span className="text-xs text-center">Click to upload</span>
                  </div>
                )}
              </div>
            </label>
            <Input 
              id="photo-upload"
              type="file" 
              className="hidden"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePhotoChange}
            />
            {photoFile && (
              <div className="text-sm text-gray-500">
                {photoFile.name} ({Math.round(photoFile.size / 1024)} KB)
              </div>
            )}
          </div>
          {photoError && (
            <p className="mt-1 text-sm text-red-500">{photoError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsSection;
