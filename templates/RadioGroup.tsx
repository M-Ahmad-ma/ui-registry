
"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ options, value, onChange, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-2", className)}
        {...props}
      >
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <div
              key={option.value}
              className={cn(
                "flex items-center rounded-md border p-3 cursor-pointer transition hover:bg-gray-50",
                selected ? "border-blue-500 bg-blue-50" : "border-gray-200"
              )}
              onClick={() => onChange?.(option.value)}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 rounded-full border flex-shrink-0 mr-3",
                  selected
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-400 bg-white"
                )}
              ></span>
              <div className="flex flex-col">
                <span className="text-gray-900 font-medium">{option.label}</span>
                {option.description && (
                  <span className="text-gray-500 text-sm">{option.description}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";
