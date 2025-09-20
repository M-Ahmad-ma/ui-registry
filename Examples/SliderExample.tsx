"use client";
import React, { useState } from "react";
import Slider from "@/components/ui/Slider";

export default function SliderExample() {
  const [value, setValue] = useState(30);

  return (
    <div className="p-6 space-y-6 max-w-md">
      <h2 className="text-lg font-semibold">Custom Slider Example</h2>

      <div>
        <p className="mb-2">Default Slider</p>
        <Slider defaultValue={20} />
      </div>

      <div>
        <p className="mb-2">Controlled Slider (value: {value})</p>
        <Slider value={value} onValueChange={setValue} />
      </div>

      <div>
        <p className="mb-2">Custom Colors</p>
        <Slider
          defaultValue={50}
          trackColor="bg-gray-300 dark:bg-gray-800"
          rangeColor="bg-green-500"
          thumbColor="bg-green-600 border border-white"
        />
      </div>

      <div>
        <p className="mb-2">Step of 10</p>
        <Slider defaultValue={40} step={10} />
      </div>
    </div>
  );
}
