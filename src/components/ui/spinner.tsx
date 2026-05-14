import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface SpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Spinner({ className, size = "md" }: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <Loader2
      className={cn("animate-spin text-blue-400", sizeClasses[size], className)}
    />
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-2 border-blue-500/20" />
          <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-transparent border-t-blue-500 animate-spin" />
        </div>
        <p className="text-sm text-zinc-500 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
