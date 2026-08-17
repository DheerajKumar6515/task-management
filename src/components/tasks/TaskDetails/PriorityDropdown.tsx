"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Priority =
  | "no-priority"
  | "urgent"
  | "high"
  | "medium"
  | "low";

interface PriorityDropdownProps {
  priority: Priority;
  onChange?: (priority: Priority) => void;
}

const priorities:{
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
  onChange
}: PriorityDropdownProps) {
  const [open, setOpen] = useState(false);

  const currentPriority =
    priorities.find(
      (item) => item.value === priority
    )?? priorities[0];

  return (
    <div className="relative">

      {/* Current priority */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-xs text-red-500 flex gap-1"
      >
        ↗ {currentPriority.label} <span><ChevronDown className="w-3 h-3"/></span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-7 z-50 w-32 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">

          <p className="px-2 py-2 text-[9px] text-gray-400">
            Priority
          </p>

          {priorities.map((item) => (
            <button
              key={item.value}
              className="flex w-full items-center justify-between rounded-md px-2 py-2 text-[11px] hover:bg-gray-50"
              onClick={() => {
                onChange?.(item.value);
                setOpen(false);
              }}
            >
              <span>{item.label}</span>
              {item.value === priority && (
                <span>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
