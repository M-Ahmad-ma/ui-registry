
import * as React from "react"
import { cn } from "@/lib/utils/cn"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  rounded?: "full" | "md"
  dot?: boolean // small colored dot on the left
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      children,
      variant = "default",
      size = "md",
      rounded = "md",
      dot = false,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center gap-2 font-medium leading-none select-none"

    const variantStyles: Record<string, string> = {
      default: "bg-gray-100 text-gray-800 border border-transparent",
      secondary: "bg-gray-50 text-gray-700 border border-gray-200",
      destructive: "bg-red-100 text-red-800 border border-red-200",
      outline: "bg-transparent text-gray-800 border border-gray-300",
      ghost: "bg-transparent text-gray-700/90",
    }

    const sizeStyles: Record<string, string> = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-0.5 text-sm",
      lg: "px-3 py-1 text-sm",
    }

    const radius = rounded === "full" ? "rounded-full" : "rounded-md"

    return (
      <span
        ref={ref}
        className={cn(base, variantStyles[variant] ?? variantStyles.default, sizeStyles[size] ?? sizeStyles.md, radius, className)}
        {...props}
      >
        {dot && <span className={cn("h-2 w-2 rounded-full", {
          "bg-gray-700": variant === "default" || variant === "ghost",
          "bg-gray-500": variant === "secondary",
          "bg-red-600": variant === "destructive",
        })} aria-hidden />}
        <span>{children}</span>
      </span>
    )
  }
)

Badge.displayName = "Badge"
