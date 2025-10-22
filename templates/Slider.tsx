"use client";
import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface SliderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {

  min?: number;

  max?: number;

  step?: number;

  value?: number;

  defaultValue?: number;

  onValueChange?: (value: number) => void;
  className?: string;

  trackColor?: string;

  rangeColor?: string;
  thumbColor?: string;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      min = 0,
      max = 100,
      step = 1,
      value,
      defaultValue,
      onValueChange,
      className,
      trackColor = "bg-gray-200 dark:bg-gray-700",
      rangeColor = "bg-blue-500",
      thumbColor = "bg-white border border-gray-300 dark:border-gray-600",
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      defaultValue ?? min
    );

    const currentValue = value ?? internalValue;
    const percent = ((currentValue - min) / (max - min)) * 100;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <div className={cn("relative w-full", className)}>
        <div
          className={cn(
            "absolute h-2 w-full rounded-full",
            trackColor
          )}
        />
        <div
          className={cn(
            "absolute h-2 rounded-full",
            rangeColor
          )}
          style={{ width: `${percent}%` }}
        />
        <input
          type="range"
          ref={ref}
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          className={cn(
            "relative w-full appearance-none bg-transparent z-10 cursor-pointer",
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full",
            `[&::-webkit-slider-thumb]:${thumbColor}`,
            "[&::-webkit-slider-thumb]:shadow-sm",
            "[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:shadow-sm",
            `[&::-moz-range-thumb]:${thumbColor}`,
            "[&::-webkit-slider-runnable-track]:appearance-none [&::-moz-range-track]:appearance-none"
          )}
          {...props}
        />
      </div>
    );
  }
);

Slider.displayName = "Slider";

export default Slider;
