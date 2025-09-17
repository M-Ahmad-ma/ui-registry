
"use client";

import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface HoverCardProps {
  children: React.ReactNode;
}

export function HoverCard({ children }: HoverCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <HoverCardContext.Provider value={{ open, setOpen }}>
      {children}
    </HoverCardContext.Provider>
  );
}

// ---------------- Context ----------------
import { createContext, useContext } from "react";

interface HoverCardCtx {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const HoverCardContext = createContext<HoverCardCtx | null>(null);

function useHoverCard() {
  const ctx = useContext(HoverCardContext);
  if (!ctx) throw new Error("HoverCard.* must be used inside <HoverCard>");
  return ctx;
}

// ---------------- Trigger ----------------
interface TriggerProps {
  children: React.ReactNode;
  openDelay?: number;
  closeDelay?: number;
}

function Trigger({ children, openDelay = 150, closeDelay = 150 }: TriggerProps) {
  const { setOpen } = useHoverCard();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(true), openDelay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(false), closeDelay);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {children}
    </div>
  );
}

// ---------------- Content ----------------
interface ContentProps {
  children: React.ReactNode;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

function Content({
  children,
  className,
  side = "top",
  align = "center",
}: ContentProps) {
  const { open } = useHoverCard();
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLDivElement>(null);

  // Position relative to trigger
  const calculatePosition = () => {
    const trigger = ref.current?.parentElement;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    let top = 0;
    let left = 0;

    if (side === "top") top = rect.top - 8;
    if (side === "bottom") top = rect.bottom + 8;
    if (side === "left") top = rect.top + rect.height / 2;
    if (side === "right") top = rect.top + rect.height / 2;

    if (side === "top" || side === "bottom") {
      if (align === "start") left = rect.left;
      if (align === "center") left = rect.left + rect.width / 2;
      if (align === "end") left = rect.right;
    }

    if (side === "left") left = rect.left - 8;
    if (side === "right") left = rect.right + 8;

    setPosition({ top, left });
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className={cn(
            "fixed z-50 rounded-lg border bg-white shadow-md p-4 text-sm",
            className
          )}
          style={{
            top: position.top,
            left: position.left,
            transform:
              side === "top" || side === "bottom"
                ? "translateX(-50%)"
                : "translateY(-50%)",
          }}
          onMouseEnter={calculatePosition}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

// ---------------- Export ----------------
HoverCard.Trigger = Trigger;
HoverCard.Content = Content;
