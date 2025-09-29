import { useState } from "react"
import { CommandDialog } from "./CommandDialog"

export default function CommandDialog() {
  const [open, setOpen] = useState(false)
  const groups = [
    {
      title: "General",
      items: [
        { id: "1", label: "Open Settings", shortcut: "⌘S" },
        { id: "2", label: "New File", shortcut: "⌘N" },
      ],
    },
    {
      title: "Account",
      items: [{ id: "3", label: "Logout" }],
    },
  ]

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Command</button>
      <CommandDialog open={open} onOpenChange={setOpen} groups={groups} />
    </>
  )
}
