
import React from "react";
import { Checkbox } from "@/components/ui/CheckboxExample";

export default function CheckboxExample() {
  const [checked, setChecked] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);

  return (
    <div className="p-6 space-y-4">
      {/* Controlled checkbox */}
      <CustomCheckbox
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        label="Accept terms"
        size="md"
        variant="default"
        containerClassName="gap-2"
        boxClassName="shadow-sm"
        iconClassName="text-indigo-600"
      />

      {/* Indeterminate checkbox */}
      <Checkbox
        indeterminate={true}
        label="Partially selected"
        variant="ghost"
      />

      {/* Accent large checkbox */}
      <Checkbox
        checked={checked2}
        onChange={(e) => setChecked2(e.target.checked)}
        size="lg"
        variant="accent"
        label="Enable notifications"
      />
    </div>
  );
}
