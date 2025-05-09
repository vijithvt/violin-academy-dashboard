
import React from "react";
import { Button } from "@/components/ui/button";

interface DaySelectorProps {
  availableDays: string[];
  selectedDays: string[];
  onChange: (days: string[]) => void;
}

const DaySelector = ({ availableDays, selectedDays, onChange }: DaySelectorProps) => {
  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      onChange(selectedDays.filter(item => item !== day));
    } else {
      onChange([...selectedDays, day]);
    }
  };
  
  return (
    <div className="flex flex-wrap gap-2">
      {availableDays.map((day) => {
        const isSelected = selectedDays.includes(day);
        return (
          <Button
            key={day}
            type="button"
            variant={isSelected ? "default" : "outline"}
            onClick={() => toggleDay(day)}
            className="h-8"
          >
            {day}
          </Button>
        );
      })}
    </div>
  );
};

export default DaySelector;
