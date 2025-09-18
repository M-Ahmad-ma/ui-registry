import { useState } from "react";
import { Select } from "@/components/ui/Select";

export default function SelectExample() {
  const [value, setValue] = useState<string | undefined>();

  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ];

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-bold">Select a fruit:</h2>
      <Select
        options={options}
        value={value}
        onChange={(val) => setValue(val)}
        placeholder="Choose a fruit"
      />
      <p>Selected: {value ?? "None"}</p>
    </div>
  );
}
