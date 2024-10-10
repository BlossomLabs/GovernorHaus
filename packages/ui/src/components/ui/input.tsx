import * as React from "react";

import { cn } from "@repo/ui/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftElement, rightElement, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {leftElement && (
          <div className="absolute left-3 top-[0.5rem]">{leftElement}</div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full p-2 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            leftElement ? "pl-9" : "",
            rightElement ? "pr-9" : "",
            className,
          )}
          ref={ref}
          {...props}
        />
        {rightElement && <div className="absolute right-3">{rightElement}</div>}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
