"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"

const badgeVariants = cva(
  "inline-flex items-center font-medium leading-none select-none transition-colors",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-800 border border-transparent",
        secondary: "bg-gray-50 text-gray-700 border border-gray-200",
        destructive: "bg-red-100 text-red-800 border border-red-200",
        outline: "bg-transparent text-gray-800 border border-gray-300",
        ghost: "bg-transparent text-gray-700/90",
      },
      size: {
        sm: "px-2 py-0.5 text-xs gap-1",
        md: "px-2.5 py-0.5 text-sm gap-1.5",
        lg: "px-3 py-1 text-sm gap-2",
      },
      rounded: {
        md: "rounded-md",
        full: "rounded-full",
      },
      dot: {
        true: "pl-1.5", 
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "md",
      dot: false,
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, rounded, dot, asChild = false, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        ref,
        className: cn(
          badgeVariants({ variant, size, rounded, dot }),
          (children as React.ReactElement).props.className,
          className
        ),
        ...props,
      })
    }

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, rounded, dot }), className)}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              variant === "default" || variant === "ghost"
                ? "bg-gray-700"
                : variant === "secondary"
                ? "bg-gray-500"
                : variant === "destructive"
                ? "bg-red-600"
                : "bg-gray-700"
            )}
            aria-hidden
          />
        )}
        {children}
      </span>
    )
  }
)

Badge.displayName = "Badge"

export { badgeVariants }

