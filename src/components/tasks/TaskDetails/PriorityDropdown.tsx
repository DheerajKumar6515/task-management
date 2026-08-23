"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Priority = "no-priority" | "urgent" | "high" | "medium" | "low";

interface PriorityDropdownProps {
  priority: Priority;
  onChange?: (priority: Priority) => void;
}

const priorities: {
  value: Priority;
  label: string;
}[] = [
  {
    value: "no-priority",
    label: "No Priority",
  },
  {
    value: "urgent",
    label: "Urgent",
  },
  {
    value: "high",
    label: "High",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "low",
    label: "Low",
  },
];

export default function PriorityDropdown({
  priority,
  onChange,
}: PriorityDropdownProps) {
  const [open, setOpen] = useState(false);

  const currentPriority =
    priorities.find((item) => item.value === priority) ?? priorities[0];

  return (
    <div className="relative">
      {/* Current priority */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1 cursor-pointer"
      >
        ↗ {currentPriority.label}{" "}
        <span>
          <ChevronDown className="w-3 h-3" />
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-7 z-50 w-32 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-1 shadow-lg dark:shadow-black/40 transition-colors duration-200">
          <p className="px-2 py-1.5 text-[9px] text-gray-400 dark:text-gray-500 uppercase font-medium">
            Priority
          </p>

          {priorities.map((item) => (
            <button
              key={item.value}
              type="button"
              className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-[11px] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              onClick={() => {
                onChange?.(item.value);
                setOpen(false);
              }}
            >
              <span>{item.label}</span>
              {item.value === priority && (
                <span className="text-gray-900 dark:text-white font-bold">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
