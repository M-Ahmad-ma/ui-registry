
"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type Variant = "default" | "destructive" | "success" | "warning" | "info";
type Size = "sm" | "md" | "lg";

interface AlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function AlertDialog({ open: controlledOpen, onOpenChange, children }: AlertDialogProps) {
  const [open, setOpen] = useState(controlledOpen ?? false);

  const isControlled = controlledOpen !== undefined;
  const actualOpen = isControlled ? controlledOpen : open;

  const setDialogOpen = (value: boolean) => {
    if (!isControlled) setOpen(value);
    onOpenChange?.(value);
  };

  return (
    <AlertDialogContext.Provider value={{ open: actualOpen, setOpen: setDialogOpen }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

// ---------------- Context ----------------
import { createContext, useContext } from "react";

interface AlertDialogCtx {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const AlertDialogContext = createContext<AlertDialogCtx | null>(null);

function useAlertDialog() {
  const ctx = useContext(AlertDialogContext);
  if (!ctx) throw new Error("AlertDialog.* must be used inside <AlertDialog>");
  return ctx;
}

// ---------------- Trigger ----------------
interface TriggerProps {
  children: React.ReactNode;
}

function Trigger({ children }: TriggerProps) {
  const { setOpen } = useAlertDialog();
  return (
    <div onClick={() => setOpen(true)} className="inline-block cursor-pointer">
      {children}
    </div>
  );
}

// ---------------- Content ----------------
interface ContentProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  closeOnOutsideClick?: boolean;
  className?: string;
}

function Content({
  children,
  variant = "default",
  size = "md",
  closeOnOutsideClick = true,
  className,
}: ContentProps) {
  const { open, setOpen } = useAlertDialog();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  }[size];

  const variantClasses = {
    default: "bg-white",
    destructive: "bg-red-50 border border-red-300",
    success: "bg-green-50 border border-green-300",
    warning: "bg-yellow-50 border border-yellow-300",
    info: "bg-blue-50 border border-blue-300",
  }[variant];

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={(e) => {
              if (closeOnOutsideClick && e.target === overlayRef.current) setOpen(false);
            }}
          />

          {/* Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-xl p-6 w-full",
              sizeClasses,
              variantClasses,
              className
            )}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

// ---------------- Subcomponents ----------------
function Header({ children }: { children: React.ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

function Title({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

function Description({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-gray-600">{children}</p>;
}

function Footer({ children }: { children: React.ReactNode }) {
  return <div className="mt-6 flex justify-end space-x-2">{children}</div>;
}

function Action({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const { setOpen } = useAlertDialog();
  return (
    <button
      onClick={() => {
        onClick?.();
        setOpen(false);
      }}
      className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
    >
      {children}
    </button>
  );
}

function Cancel({ children }: { children: React.ReactNode }) {
  const { setOpen } = useAlertDialog();
  return (
    <button
      onClick={() => setOpen(false)}
      className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
    >
      {children}
    </button>
  );
}

// ---------------- Export ----------------
AlertDialog.Trigger = Trigger;
AlertDialog.Content = Content;
AlertDialog.Header = Header;
AlertDialog.Title = Title;
AlertDialog.Description = Description;
AlertDialog.Footer = Footer;
AlertDialog.Action = Action;
AlertDialog.Cancel = Cancel;
