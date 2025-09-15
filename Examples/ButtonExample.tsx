
import React from "react";
import { Button } from "@/components/ui/button";

export const Example = () => {
  return (
    <div className="flex gap-3">
      <Button variant="default">Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="default" size="lg">Large</Button>
    </div>
  );
};
