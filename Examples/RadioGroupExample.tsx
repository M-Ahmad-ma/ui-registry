import { useState } from "react";
import { RadioGroup } from "@/components/ui/RadioGroup";

export default function RadioGroupExample() {
  const [value, setValue] = useState<string>("option1");

  const options = [
    { value: "option1", label: "Option 1", description: "This is the first option." },
    { value: "option2", label: "Option 2", description: "This is the second option." },
    { value: "option3", label: "Option 3", description: "This is the third option." },
  ];

  return (
    <div className="p-6 max-w-md">
      <h2 className="text-lg font-bold mb-4">Choose an option:</h2>
      <RadioGroup options={options} value={value} onChange={setValue} />
      <p className="mt-4">Selected: {value}</p>
    </div>
  );
}
