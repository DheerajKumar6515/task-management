"use client";

import { useState } from "react";
import { Check } from "lucide-react";

type Priority = "none" | "urgent" | "high" | "medium" | "low";

const priorities: {
  value: Priority;
  label: string;
}[] = [
  {
    value: "none",
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

export default function PriorityFilter() {
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(
    null,
  );

  return (
    <div className="ml-1 w-32 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-1 shadow-lg dark:shadow-black/40 transition-colors duration-200">
      <p className="px-2 py-2 text-[9px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
        Priority
      </p>

      {priorities.map((priority) => {
        const selected = selectedPriority === priority.value;

        return (
          <button
            key={priority.value}
            type="button"
            onClick={() => setSelectedPriority(priority.value)}
            className="flex w-full items-center justify-between rounded px-2 py-1.5 text-left text-[10px] hover:bg-gray-50 dark:hover:bg-gray-800/70 cursor-pointer transition-colors"
          >
            <span
              className={`
            ${
              priority.value === "urgent"
                ? "text-red-500 dark:text-red-400 font-medium"
                : priority.value === "high" || priority.value === "medium"
                  ? "text-orange-500 dark:text-orange-400 font-medium"
                  : "text-gray-500 dark:text-gray-400"
            }
          `}
            >
              {priority.label}
            </span>

            {selected && (
              <Check size={11} className="text-gray-700 dark:text-gray-200" />
            )}
          </button>
        );
      })}
    </div>
  );
}
