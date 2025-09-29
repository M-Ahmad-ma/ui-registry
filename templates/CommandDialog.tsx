// Command.tsx
import React, { useState, useRef, useEffect } from "react";

interface CommandItem {
  label: string;
  value: string;
  description?: string;
}

interface CommandProps {
  items: CommandItem[];
  onSelect: (item: CommandItem) => void;
  placeholder?: string;
  className?: string;
}

export const Command: React.FC<CommandProps> = ({
  items,
  onSelect,
  placeholder = "Type a command...",
  className = "",
}) => {
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<CommandItem[]>(items);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter items based on query
  useEffect(() => {
    const filtered = items.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
    setHighlightIndex(0);
  }, [query, items]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setHighlightIndex((prev) =>
        prev + 1 >= filteredItems.length ? 0 : prev + 1
      );
      e.preventDefault();
    }
    if (e.key === "ArrowUp") {
      setHighlightIndex((prev) =>
        prev - 1 < 0 ? filteredItems.length - 1 : prev - 1
      );
      e.preventDefault();
    }
    if (e.key === "Enter") {
      if (filteredItems[highlightIndex]) {
        onSelect(filteredItems[highlightIndex]);
      }
    }
  };

  return (
    <div
      className={`relative bg-white border rounded-md shadow-sm w-80 ${className}`}
      ref={containerRef}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full px-4 py-2 border-b focus:outline-none rounded-t-md"
      />
      {filteredItems.length > 0 && (
        <ul className="max-h-60 overflow-y-auto">
          {filteredItems.map((item, idx) => (
            <li
              key={item.value}
              onClick={() => onSelect(item)}
              className={`cursor-pointer px-4 py-2 ${
                idx === highlightIndex ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`}
            >
              <div className="font-medium">{item.label}</div>
              {item.description && (
                <div className="text-sm text-gray-500">{item.description}</div>
              )}
            </li>
          ))}
        </ul>
      )}
      {filteredItems.length === 0 && (
        <div className="p-4 text-gray-400 text-sm">No results found</div>
      )}
    </div>
  );
};
