
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ReferralSection = () => {
  const { control, watch } = useFormContext();
  const heardFrom = watch('heardFrom');

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <h2 className="text-xl font-semibold border-b pb-2">Referral Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="heardFrom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How did you hear about this class? *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="trial">After Trial Class</SelectItem>
                  <SelectItem value="friend">Friend / Referral</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {heardFrom !== 'trial' && (
          <FormField
            control={control}
            name="referralDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Referral (if any)</FormLabel>
                <FormControl>
                  <Input placeholder="Name of existing student who referred you" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default ReferralSection;
