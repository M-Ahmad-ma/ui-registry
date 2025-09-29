"use client"

import React, { useState } from "react"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/Command"

export default function CommandExample() {
  const [query, setQuery] = useState("")

  const commands = [
    {
      group: "File",
      items: [
        { label: "New File", shortcut: "⌘N" },
        { label: "Open File", shortcut: "⌘O" },
        { label: "Save File", shortcut: "⌘S" },
      ],
    },
    {
      group: "Edit",
      items: [
        { label: "Undo", shortcut: "⌘Z" },
        { label: "Redo", shortcut: "⌘⇧Z" },
        { label: "Copy", shortcut: "⌘C" },
        { label: "Paste", shortcut: "⌘V" },
      ],
    },
  ]

  // filter items based on query
  const filteredCommands = commands.map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    ),
  }))

  const hasResults = filteredCommands.some((group) => group.items.length > 0)

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Command className="w-96 border">
        <CommandInput
          placeholder="Type a command..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <CommandList>
          {hasResults ? (
            filteredCommands.map((group) =>
              group.items.length > 0 ? (
                <CommandGroup key={group.group}>
                  <div data-slot="command-group-heading">{group.group}</div>
                  {group.items.map((item) => (
                    <CommandItem key={item.label}>
                      {item.label}
                      {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
                    </CommandItem>
                  ))}
                  <CommandSeparator />
                </CommandGroup>
              ) : null
            )
          ) : (
            <CommandEmpty>No commands found</CommandEmpty>
          )}
        </CommandList>
      </Command>
    </div>
  )
}
