// components/ui/Command.tsx
"use client"

import * as React from "react"
import { SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils/cn"

// ------------------ Root Command ------------------
interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}
const Command = React.forwardRef<HTMLDivElement, CommandProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className
      )}
      {...props}
    />
  )
)
Command.displayName = "Command"

// ------------------ Command Input ------------------
interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}
const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, ...props }, ref) => (
    <div data-slot="command-input-wrapper" className="flex h-9 items-center gap-2 border-b px-3">
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <input
        ref={ref}
        data-slot="command-input"
        className={cn(
          "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
)
CommandInput.displayName = "CommandInput"

// ------------------ Command List ------------------
interface CommandListProps extends React.HTMLAttributes<HTMLUListElement> {}
const CommandList = React.forwardRef<HTMLUListElement, CommandListProps>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-slot="command-list"
      className={cn("max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto", className)}
      {...props}
    />
  )
)
CommandList.displayName = "CommandList"

// ------------------ Command Empty ------------------
const CommandEmpty: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
  <div data-slot="command-empty" className="py-6 text-center text-sm" {...props} />
)

// ------------------ Command Group ------------------
interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {}
const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="command-group"
      className={cn(
        "text-foreground overflow-hidden p-1 [&_[data-slot=command-group-heading]]:px-2 [&_[data-slot=command-group-heading]]:py-1.5 [&_[data-slot=command-group-heading]]:text-xs [&_[data-slot=command-group-heading]]:font-medium",
        className
      )}
      {...props}
    />
  )
)
CommandGroup.displayName = "CommandGroup"

// ------------------ Command Item ------------------
interface CommandItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  selected?: boolean
}
const CommandItem = React.forwardRef<HTMLLIElement, CommandItemProps>(
  ({ className, selected, ...props }, ref) => (
    <li
      ref={ref}
      data-slot="command-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm select-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
        selected ? "bg-accent text-accent-foreground" : "hover:bg-gray-100",
        className
      )}
      {...props}
    />
  )
)
CommandItem.displayName = "CommandItem"

// ------------------ Command Shortcut ------------------
const CommandShortcut: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className, ...props }) => (
  <span data-slot="command-shortcut" className={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)} {...props} />
)

// ------------------ Command Separator ------------------
const CommandSeparator: React.FC<React.HTMLAttributes<HTMLHRElement>> = ({ className, ...props }) => (
  <hr data-slot="command-separator" className={cn("bg-border -mx-1 h-px", className)} {...props} />
)

// ------------------ Exports ------------------
export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
