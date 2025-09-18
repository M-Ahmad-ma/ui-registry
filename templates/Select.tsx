
"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ options, value, onChange, placeholder = "Select...", className, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [highlightedIndex, setHighlightedIndex] = React.useState(0);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const selectedOption = options.find((o) => o.value === value);

    // Close dropdown on click outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!open) {
        if (e.key === "Enter" || e.key === " ") setOpen(true);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % options.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev === 0 ? options.length - 1 : prev - 1
        );
      }
      if (e.key === "Enter") {
        e.preventDefault();
        onChange?.(options[highlightedIndex].value);
        setOpen(false);
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative w-60 cursor-pointer rounded-md border bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
          className
        )}
        {...props}
      >
        {/* Selected value */}
        <div
          className="flex items-center justify-between px-3 py-2"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span>{selectedOption?.label ?? placeholder}</span>
          <svg
            className={cn("h-4 w-4 transition-transform", open ? "rotate-180" : "")}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.352a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Dropdown */}
        <div
          className={cn(
            "absolute left-0 top-full mt-1 w-full rounded-md border bg-white shadow-lg z-50 overflow-hidden",
            open ? "block" : "hidden"
          )}
        >
          {options.map((option, index) => (
            <div
              key={option.value}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => {
                onChange?.(option.value);
                setOpen(false);
              }}
              className={cn(
                "px-3 py-2 cursor-pointer",
                highlightedIndex === index
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              )}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";
