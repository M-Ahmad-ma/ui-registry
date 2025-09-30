"use client"

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from "react"
import { createPortal } from "react-dom"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils/cn"

// Context to manage open/close state
type DialogContextType = {
  open: boolean
  setOpen: (value: boolean) => void
}
const DialogContext = createContext<DialogContextType | null>(null)

export function Dialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  )
}

// Hook for consuming
function useDialog() {
  const ctx = useContext(DialogContext)
  if (!ctx) throw new Error("Dialog components must be inside <Dialog>")
  return ctx
}

// Trigger
export function DialogTrigger({
  asChild,
  children,
}: {
  asChild?: boolean
  children: ReactNode
}) {
  const { setOpen } = useDialog()

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: () => setOpen(true),
    })
  }

  return <button onClick={() => setOpen(true)}>{children}</button>
}

// Overlay + Content portal
export function DialogContent({
  className,
  children,
  showCloseButton = true,
}: {
  className?: string
  children: ReactNode
  showCloseButton?: boolean
}) {
  const { open, setOpen } = useDialog()
  const overlayRef = useRef<HTMLDivElement | null>(null)

  const close = useCallback(() => setOpen(false), [setOpen])

  if (!open) return null

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 animate-in fade-in-0"
        onClick={close}
      />

      {/* Content */}
      <div
        className={cn(
          "relative z-50 w-full max-w-lg rounded-lg bg-background p-6 shadow-lg animate-in fade-in-0 zoom-in-95",
          className
        )}
        role="dialog"
        aria-modal="true"
      >
        {children}

        {showCloseButton && (
          <button
            onClick={close}
            className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    </div>,
    document.body
  )
}

// Header, Footer, Title, Description
export function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

export function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

export function DialogTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-lg font-semibold leading-none", className)}
      {...props}
    />
  )
}

export function DialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export function DialogClose({
  asChild,
  children,
}: {
  asChild?: boolean
  children: ReactNode
}) {
  const { setOpen } = useDialog()

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: () => setOpen(false),
    })
  }

  return <button onClick={() => setOpen(false)}>{children}</button>
}
