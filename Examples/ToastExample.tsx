"use client";
import React from "react";
import { ToastProviderBinder, useToast, toast } from "@/components/ui/Toast";

export default function ToastExampleInner() {
  const { toast: localToast, dismiss } = useToast();

  return (
    <div className="p-6 space-y-4">
      <button
        className="px-3 py-2 rounded bg-indigo-600 text-white"
        onClick={() =>
          localToast({
            title: "Saved",
            description: "Your changes have been saved.",
            variant: "success",
            duration: 4000,
          })
        }
      >
        Local toast (hook)
      </button>

      <button
        className="px-3 py-2 rounded bg-rose-600 text-white"
        onClick={() =>
          localToast({
            title: "Error",
            description: "Something went wrong.",
            variant: "error",
            duration: 5000,
            action: { label: "Retry", onClick: (id) =>  dismiss(id); } },
          })
        }
      >
        Error with action
      </button>

      <button
        className="px-3 py-2 rounded bg-sky-600 text-white"
        onClick={() =>
          toast({ title: "Global toast", description: "Triggered via global helper", variant: "info" })
        }
      >
        Global toast()
      </button>
    </div>
  );
}

export default function ToastExample() {
  return (
    <ToastProviderBinder>
      <ToastExampleInner />
    </ToastProviderBinder>
  );
}
