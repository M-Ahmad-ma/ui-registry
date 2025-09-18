
"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "ghost";
  error?: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ size = "md", variant = "default", error = false, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "block w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed",
          size === "sm" && "px-2 py-1 text-sm",
          size === "md" && "px-3 py-2 text-base",
          size === "lg" && "px-4 py-3 text-lg",
          variant === "ghost" && "bg-transparent border-none focus:ring-0 focus:border-gray-300",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
    );
  }
);

TextArea.displayName = "TextArea";
