"use client";

import { useState } from "react";
import { Check } from "lucide-react";

type Priority =
  | "none"
  | "urgent"
  | "high"
  | "medium"
  | "low";

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
  const [selectedPriority, setSelectedPriority] =
    useState<Priority | null>(null);

  return (
    <div className="ml-1 w-32 rounded-md border border-gray-200 bg-white p-1 shadow-lg">

      <p className="px-2 py-2 text-[9px] text-gray-400">
        Priority
      </p>

      {priorities.map((priority) => {
        const selected =
          selectedPriority === priority.value;

        return (
          <button
            key={priority.value}
            type="button"
            onClick={() =>
              setSelectedPriority(priority.value)
            }
            className="flex w-full items-center justify-between rounded px-2 py-1.5 text-left text-[10px] hover:bg-gray-50"
          >
            <span
              className={`
                ${
                  priority.value === "urgent"
                    ? "text-red-500"
                    : priority.value === "high" ||
                        priority.value === "medium"
                    ? "text-orange-500"
                    : "text-gray-500"
                }
              `}
            >
              {priority.label}
            </span>

            {selected && (
              <Check
                size={11}
                className="text-gray-700"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
