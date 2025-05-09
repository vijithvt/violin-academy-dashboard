
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import TimeSlotSelector from "./TimeSlotSelector";
import DaySelector from "./DaySelector";

// Available time slots
const TIME_SLOTS = [
  "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM",
  "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM"
];

// Available days
const DAYS_OF_WEEK = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

interface CourseDetailsSectionProps {
  useDaySpecificTimings: boolean;
  setUseDaySpecificTimings: (value: boolean) => void;
  daySpecificTimings: Record<string, string[]>;
  setDaySpecificTimings: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
}

const CourseDetailsSection = ({ 
  useDaySpecificTimings, 
  setUseDaySpecificTimings, 
  daySpecificTimings, 
  setDaySpecificTimings 
}: CourseDetailsSectionProps) => {
  const { control, watch } = useFormContext();
  
  const handleDayTimingsChange = (day: string, timeSlot: string) => {
    setDaySpecificTimings(prev => {
      const currentTimings = [...(prev[day] || [])];
      if (currentTimings.includes(timeSlot)) {
        return {
          ...prev,
          [day]: currentTimings.filter(slot => slot !== timeSlot)
        };
      } else {
        return {
          ...prev,
          [day]: [...currentTimings, timeSlot]
        };
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <h2 className="text-xl font-semibold border-b pb-2">Course Details</h2>
      
      <FormField
        control={control}
        name="preferredCourse"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Course *</FormLabel>
            <FormControl>
              <RadioGroup 
                onValueChange={field.onChange} 
                value={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="homeTuition" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Home Tuition
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="onlineOneToOne" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Online 1-to-1 Class
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="onlineBatch" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Online Batch Class
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="preferredDays"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Days *</FormLabel>
            <FormControl>
              <DaySelector 
                availableDays={DAYS_OF_WEEK} 
                selectedDays={field.value} 
                onChange={field.onChange} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="use-day-specific" 
            checked={useDaySpecificTimings}
            onCheckedChange={(checked) => setUseDaySpecificTimings(!!checked)}
          />
          <label 
            htmlFor="use-day-specific" 
            className="text-sm font-medium leading-none cursor-pointer"
          >
            Use different timings for each day
          </label>
        </div>
        
        {!useDaySpecificTimings ? (
          <FormField
            control={control}
            name="preferredTimings"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Timings *</FormLabel>
                <FormControl>
                  <TimeSlotSelector 
                    availableSlots={TIME_SLOTS} 
                    selectedSlots={field.value} 
                    onChange={field.onChange} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Day-Specific Timings</h3>
            
            <Tabs defaultValue="Monday">
              <TabsList className="mb-4 flex flex-wrap">
                {DAYS_OF_WEEK.map(day => (
                  <TabsTrigger key={day} value={day} className="text-xs sm:text-sm">
                    {day}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {DAYS_OF_WEEK.map(day => (
                <TabsContent key={day} value={day}>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">{day} Time Slots</h4>
                    <TimeSlotSelector 
                      availableSlots={TIME_SLOTS}
                      selectedSlots={daySpecificTimings[day] || []}
                      onChange={(slots) => setDaySpecificTimings(prev => ({
                        ...prev,
                        [day]: slots
                      }))}
                    />
                    {daySpecificTimings[day]?.length === 0 && (
                      <p className="text-xs text-amber-600">
                        Please select at least one time slot for {day}
                      </p>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetailsSection;
