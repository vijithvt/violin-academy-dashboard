
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface SpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

export function Spinner({ className, size = "md" }: SpinnerProps) {
  return (
    <Loader2 
      className={cn(
        "animate-spin text-primary", 
        sizeMap[size],
        className
      )} 
    />
  );
}

export function LoadingScreen() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}
