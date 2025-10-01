"use client";

import Tooltip from "@/components/ui/Tooltip";
import { Info } from "lucide-react";

export default function TooltipExample() {
  return (
    <div className="flex gap-6 p-10">
      <Tooltip content="This is a top tooltip">
        <button className="px-3 py-2 rounded bg-blue-500 text-white">
          Hover me
        </button>
      </Tooltip>

      <Tooltip content="Right side" position="right">
        <Info className="w-6 h-6 text-gray-700" />
      </Tooltip>

      <Tooltip
        content="Custom style"
        position="bottom"
        className="bg-pink-600 text-white font-semibold"
        arrowClassName="bg-pink-600"
      >
        <span className="cursor-pointer underline">Styled Tooltip</span>
      </Tooltip>
    </div>
  );
}

