
"use client";

import React from "react";
import Sheet, { SheetHeader, SheetFooter } from "@/components/ui/Sheet";

export default function SheetExample() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="p-8">
      <button
        className="px-4 py-2 rounded bg-indigo-600 text-white"
        onClick={() => setOpen(true)}
      >
        Open Sheet
      </button>

      <Sheet open={open} onOpenChange={setOpen} position="right" size="md">
        <SheetHeader>
          <div>
            <h3 className="text-lg font-semibold">Panel title</h3>
            <p className="text-sm text-gray-500">Short description</p>
          </div>
        </SheetHeader>

        <div className="space-y-4">
          <p>
            This is the sheet content. Add forms, settings, or any controls here.
          </p>
          <input className="w-full border rounded px-3 py-2" placeholder="Input inside sheet" />
          <button className="px-3 py-2 rounded bg-green-600 text-white">Primary action</button>
        </div>

        <SheetFooter>
          <div className="flex justify-end gap-2">
            <button className="px-3 py-2 rounded" onClick={() => setOpen(false)}>Cancel</button>
            <button className="px-3 py-2 rounded bg-indigo-600 text-white">Save</button>
          </div>
        </SheetFooter>
      </Sheet>
    </div>
  );
}
