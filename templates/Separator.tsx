
import React from "react";
import { cn } from "@/lib/utils/cn";

type Orientation = "horizontal" | "vertical";
type Variant = "default" | "muted" | "accent" | "transparent";

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLHRElement | HTMLDivElement> {
  /**
   * Orientation of the separator. `horizontal` uses <hr>, `vertical` uses a div.
   * Default: "horizontal"
   */
  orientation?: Orientation;
  /**
   * Thickness in px (number) or any css size string ("1px", "0.5rem", etc).
   * Default: "1px"
   */
  thickness?: number | string;
  /**
   * Variant maps to some sensible default colors — you can also override with style or className.
   */
  variant?: Variant;
  /**
   * Inline color (overrides variant). Example: "#eee" or "rgba(0,0,0,0.08)" or "theme(colors.gray.200)".
   */
  color?: string;
  /**
   * If true, separator is decorative and hidden from assistive tech (aria-hidden).
   */
  decorative?: boolean;
  /**
   * Additional classes applied to the root element.
   */
  className?: string;
}

/**
 * Separator — small, composable line used to separate UI regions.
 * - Use orientation="vertical" in flexrows to show a vertical divider.
 * - You can pass thickness and color for fine control.
 */
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
  // default variant -> background / border color; tailwind tokens used for developer convenience
  const variantColor: Record<Variant, string> = {
    default: "rgba(0,0,0,0.08)",
    muted: "rgba(0,0,0,0.06)",
    accent: "rgba(99,102,241,0.9)", // indigo-500-ish
    transparent: "transparent",
  };

  const resolvedColor = color ?? variantColor[variant] ?? variantColor.muted;

  // CSS sizes: allow number => px, or keep string as-is
  const sizeValue = typeof thickness === "number" ? `${thickness}px` : thickness;

  if (orientation === "vertical") {
    // Vertical: use a div with role="separator" and aria-orientation
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        role="separator"
        aria-orientation="vertical"
        aria-hidden={decorative ? true : undefined}
        // set width to thickness and height to 100% (but caller should set height via parent / style)
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

  // Horizontal: use <hr> for semantic separation (good for accessibility)
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
        margin: 0, // allow callers to set spacing via className or surrounding elements
        ...style,
      }}
      className={cn("w-full", className)}
      {...rest}
    />
  );
});

export default Separator;
