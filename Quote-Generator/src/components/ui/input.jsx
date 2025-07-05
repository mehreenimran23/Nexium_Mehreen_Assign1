import React from "react";
import { cn } from "../../lib/utils";

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "dark:bg-zinc-800 bg-white border-input flex h-10 w-full min-w-0 rounded-md border px-4 py-2 text-sm md:text-base shadow-sm transition-all",
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring",
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
