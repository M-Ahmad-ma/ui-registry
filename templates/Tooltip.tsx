
"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type TooltipProps = {
  children: React.ReactNode;   content: React.ReactNode; 
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string; 
  arrowClassName?: string; 
};

export default function Tooltip({
  children,
  content,
  position = "top",
  delay = 150,
  className,
  arrowClassName,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const show = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  };
  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  const posClasses: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 4 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute z-50 px-2 py-1 rounded-md text-sm shadow-md bg-gray-800 text-white",
              posClasses[position],
              className
            )}
          >
            {content}
            <div
              className={cn(
                "absolute w-2 h-2 bg-gray-800 rotate-45",
                position === "top" && "left-1/2 -translate-x-1/2 top-full",
                position === "bottom" && "left-1/2 -translate-x-1/2 bottom-full",
                position === "left" && "top-1/2 -translate-y-1/2 left-full",
                position === "right" && "top-1/2 -translate-y-1/2 right-full",
                arrowClassName
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

