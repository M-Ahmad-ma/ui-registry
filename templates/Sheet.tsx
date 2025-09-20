
"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type Position = "right" | "left" | "top" | "bottom";
type Size = "sm" | "md" | "lg" | "full";

export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /**
   * Placement of the sheet (which edge it slides from).
   */
  position?: Position;
  /**
   * Size preset for width (when sliding horizontally) or height (when vertical).
   */
  size?: Size;
  /**
   * Additional classes for the panel
   */
  panelClassName?: string;
  /**
   * Additional classes for the overlay
   */
  overlayClassName?: string;
  /**
   * Close on overlay click (default true)
   */
  closeOnOverlayClick?: boolean;
  children?: React.ReactNode;
  /**
   * Provide a custom id for the sheet panel (useful for aria)
   */
  id?: string;
}

/**
 * Small utility to find focusable elements inside a container
 */
function getFocusableElements(el: HTMLElement | null) {
  if (!el) return [];
  return Array.from(
    el.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((e) => !e.hasAttribute("disabled") && !e.getAttribute("aria-hidden"));
}

/**
 * Sheet component
 *
 * Usage:
 * <Sheet open={open} onOpenChange={setOpen} position="right" size="md">
 *   <SheetHeader>Title</SheetHeader>
 *   <div>content</div>
 *   <SheetFooter>actions</SheetFooter>
 * </Sheet>
 */
export function Sheet({
  open,
  onOpenChange,
  position = "right",
  size = "md",
  panelClassName = "",
  overlayClassName = "",
  closeOnOverlayClick = true,
  children,
  id,
}: SheetProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  // body lock
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
    return;
  }, [open]);

  // remember last active element, restore focus on close
  useEffect(() => {
    if (open) {
      lastActiveRef.current = document.activeElement as HTMLElement | null;
      // focus the panel after mount
      setTimeout(() => {
        panelRef.current?.focus();
      }, 50);
    } else {
      // restore focus
      lastActiveRef.current?.focus?.();
    }
  }, [open]);

  // Escape handling & focus trap
  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onOpenChange(false);
      } else if (e.key === "Tab") {
        // basic focus trap
        const container = panelRef.current;
        if (!container) return;
        const focusable = getFocusableElements(container);
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (active === first || !container.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last || !container.contains(active)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  // portal root
  const portalRoot =
    typeof window !== "undefined" ? document.getElementById("__next") ?? document.body : null;

  if (!portalRoot) return null;

  // size classes map (for horizontal slide)
  const horizontalSize: Record<Size, string> = {
    sm: "w-80",
    md: "w-96",
    lg: "w-[36rem]",
    full: "w-full",
  };
  // size classes for vertical (height)
  const verticalSize: Record<Size, string> = {
    sm: "h-48",
    md: "h-64",
    lg: "h-96",
    full: "h-full",
  };

  // panel base position classes
  const positionPanelClass = {
    right: cn("right-0 top-0 h-full", horizontalSize[size]),
    left: cn("left-0 top-0 h-full", horizontalSize[size]),
    top: cn("top-0 left-0 w-full", verticalSize[size]),
    bottom: cn("bottom-0 left-0 w-full", verticalSize[size]),
  } as const;

  // motion variants
  const variants = {
    overlay: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    panel: {
      right: {
        hidden: { x: "100%" },
        visible: { x: 0 },
      },
      left: {
        hidden: { x: "-100%" },
        visible: { x: 0 },
      },
      top: {
        hidden: { y: "-100%" },
        visible: { y: 0 },
      },
      bottom: {
        hidden: { y: "100%" },
        visible: { y: 0 },
      },
    } as any,
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {/* overlay */}
          <motion.div
            className={cn(
              "absolute inset-0 bg-black/50 backdrop-blur-sm",
              overlayClassName
            )}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants.overlay}
            onClick={() => {
              if (closeOnOverlayClick) onOpenChange(false);
            }}
            style={{ pointerEvents: "auto" }}
            aria-hidden
          />

          {/* panel container */}
          <motion.div
            className={cn(
              "absolute overflow-auto bg-transparent",
              positionPanelClass[position]
            )}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants.panel[position]}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ pointerEvents: "auto" }}
          >
            <div
              ref={panelRef}
              id={id}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              className={cn(
                "h-full bg-white dark:bg-slate-900 shadow-xl flex flex-col outline-none",
                panelClassName
              )}
            >
              {/* close button */}
              <div className="absolute top-3 right-3 z-10">
                <button
                  aria-label="Close"
                  onClick={() => onOpenChange(false)}
                  className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* content area */}
              <div className="p-6 overflow-auto">{children}</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    portalRoot
  );
}

export default Sheet;

/** Helpers for header/footer so child authors can compose easily */
export function SheetHeader({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <div className={cn("mb-4 flex items-start justify-between gap-4", className)}>{children}</div>;
}
export function SheetFooter({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <div className={cn("mt-auto pt-4", className)}>{children}</div>;
}
