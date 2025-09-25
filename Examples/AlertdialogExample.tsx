
"use client";

import { AlertDialog } from "@/components/ui/AlertDialog";

export default function AlertDialogExample() {
  return (
    <div className="p-6 space-x-4">
      <AlertDialog>
        <AlertDialog.Trigger>
          <button className="px-4 py-2 rounded-md bg-blue-600 text-white">
            Open Default
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Content variant="info" size="md">
          <AlertDialog.Header>
            <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
            <AlertDialog.Description>
              This action cannot be undone. This will permanently delete your
              account and remove your data.
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action>Confirm</AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>

      <AlertDialog>
        <AlertDialog.Trigger>
          <button className="px-4 py-2 rounded-md bg-red-600 text-white">
            Destructive
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Content variant="destructive" size="sm">
          <AlertDialog.Header>
            <AlertDialog.Title>Delete Item?</AlertDialog.Title>
            <AlertDialog.Description>
              This action will permanently remove this item.
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action>Delete</AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </div>
  );
}
