"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils/cn"

export interface CommandItemProps {
  id: string
  label: string
  shortcut?: string
  disabled?: boolean
}

interface CommandGroupProps {
  title?: string
  items: CommandItemProps[]
}

interface CommandDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  groups: CommandGroupProps[]
}

export function CommandDialog({
  open,
  onOpenChange,
  title = "Command Palette",
  description = "Search for a command...",
  groups,
}: CommandDialogProps) {
  const [query, setQuery] = React.useState("")
  const dialogRef = React.useRef<HTMLDivElement>(null)

  // Close on ESC
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false)
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [onOpenChange])

  const filteredGroups = groups.map(group => ({
    ...group,
    items: group.items.filter(item =>
      item.label.toLowerCase().includes(query.toLowerCase())
    ),
  }))

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            className="w-full max-w-md rounded-md bg-popover shadow-lg"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="flex items-center border-b px-3 py-2 gap-2">
              <SearchIcon className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Type a command..."
                className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground"
              />
            </div>
            <div className="max-h-80 overflow-y-auto">
              {filteredGroups.every(g => g.items.length === 0) && (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No results found
                </div>
              )}
              {filteredGroups.map((group, i) =>
                group.items.length > 0 ? (
                  <div key={i}>
                    {group.title && (
                      <div className="px-3 pt-2 pb-1 text-xs font-medium text-muted-foreground">
                        {group.title}
                      </div>
                    )}
                    {group.items.map(item => (
                      <button
                        key={item.id}
                        disabled={item.disabled}
                        className={cn(
                          "flex w-full justify-between px-3 py-2 text-left text-sm rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground",
                          item.disabled &&
                            "cursor-not-allowed opacity-50 hover:bg-transparent hover:text-inherit"
                        )}
                      >
                        <span>{item.label}</span>
                        {item.shortcut && (
                          <span className="text-xs text-muted-foreground">
                            {item.shortcut}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                ) : null
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
