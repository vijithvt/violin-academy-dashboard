
import React from "react";
import { Button } from "@/components/ui/button";

interface TimeSlotSelectorProps {
  availableSlots: string[];
  selectedSlots: string[];
  onChange: (slots: string[]) => void;
}

const TimeSlotSelector = ({ availableSlots, selectedSlots, onChange }: TimeSlotSelectorProps) => {
  const toggleTimeSlot = (slot: string) => {
    if (selectedSlots.includes(slot)) {
      onChange(selectedSlots.filter(item => item !== slot));
    } else {
      onChange([...selectedSlots, slot]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {availableSlots.map((slot) => {
        const isSelected = selectedSlots.includes(slot);
        return (
          <Button
            key={slot}
            type="button"
            variant={isSelected ? "default" : "outline"}
            onClick={() => toggleTimeSlot(slot)}
            className="h-8"
          >
            {slot}
          </Button>
        );
      })}
    </div>
  );
};

export default TimeSlotSelector;
