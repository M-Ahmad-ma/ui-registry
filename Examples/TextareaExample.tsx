
import { TextArea } from "@/components/ui/TextArea";

export default function TextAreaExample() {
  return (
    <div className="space-y-4 w-full max-w-md p-4">
      <div>
        <label className="block mb-1 font-medium">Default</label>
        <TextArea placeholder="Type something..." />
      </div>
      <div>
        <label className="block mb-1 font-medium">Small</label>
        <TextArea size="sm" placeholder="Small text area" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Large</label>
        <TextArea size="lg" placeholder="Large text area" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Error</label>
        <TextArea error placeholder="There is an error" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Ghost variant</label>
        <TextArea variant="ghost" placeholder="Ghost text area" />
      </div>
    </div>
  );
}
