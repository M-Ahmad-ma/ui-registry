
import React from "react";
import { cn } from "@/lib/utils/cn";

type Orientation = "horizontal" | "vertical";
type Variant = "default" | "muted" | "accent" | "transparent";

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLHRElement | HTMLDivElement> {
  orientation?: Orientation;
  thickness?: number | string;
  variant?: Variant;
  color?: string;
  decorative?: boolean;
  className?: string;
}

export const Separator = React.forwardRef<
  HTMLHRElement | HTMLDivElement,
  SeparatorProps
>(function Separator(
  {
    orientation = "horizontal",
    thickness = "1px",
    variant = "muted",
    color,
    decorative = false,
    className,
    style,
    ...rest
  },
  ref
) {
  const variantColor: Record<Variant, string> = {
    default: "rgba(0,0,0,0.08)",
    muted: "rgba(0,0,0,0.06)",
    accent: "rgba(99,102,241,0.9)",
    transparent: "transparent",
  };

  const resolvedColor = color ?? variantColor[variant] ?? variantColor.muted;


  const sizeValue = typeof thickness === "number" ? `${thickness}px` : thickness;

  if (orientation === "vertical") {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        role="separator"
        aria-orientation="vertical"
        aria-hidden={decorative ? true : undefined}
        style={{
          width: sizeValue,
          minWidth: sizeValue,
          background: resolvedColor,
          ...style,
        }}
        className={cn("inline-block align-stretch shrink-0", className)}
        {...rest}
      />
    );
  }

  return (
    <hr
      ref={ref as React.Ref<HTMLHRElement>}
      role={decorative ? undefined : "separator"}
      aria-orientation="horizontal"
      aria-hidden={decorative ? true : undefined}
      style={{
        height: sizeValue,
        border: "none",
        background: resolvedColor,
        ...style,
      }}
      className={cn("w-full", className)}
      {...rest}
    />
  );
});

export default Separator;
