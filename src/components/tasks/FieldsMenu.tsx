"use client";

import { useState } from "react";
import { Check, Grid2X2, List } from "lucide-react";

type ViewMode = "list" | "board";

interface FieldOption {
  id: string;
  label: string;
  checked: boolean;
}

const initialFields: FieldOption[] = [
  {
    id: "priority",
    label: "Priority",
    checked: false,
  },
  {
    id: "members",
    label: "Members",
    checked: true,
  },
  {
    id: "dueDate",
    label: "Due Date",
    checked: false,
  },
  {
    id: "labels",
    label: "Labels",
    checked: false,
  },
  {
    id: "status",
    label: "Status",
    checked: false,
  },
  {
    id: "reporter",
    label: "Reporter",
    checked: false,
  },
];

interface FieldsMenuProps {
  onClose: () => void;
  viewMode: "list" | "board";
  onViewChange: (view: "list" | "board") => void;
}

export default function FieldsMenu({
  onClose,
  viewMode,
  onViewChange,
}: FieldsMenuProps) {
  // const [viewMode, setViewMode] =
  //   useState<ViewMode>("board");

  const [fields, setFields] = useState<FieldOption[]>(initialFields);

  const toggleField = (fieldId: string) => {
    setFields((currentFields) =>
      currentFields.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              checked: !field.checked,
            }
          : field,
      ),
    );
  };

  return (
    <>
      {/* Background Overlay */}
      <button
        type="button"
        aria-label="Close fields menu"
        onClick={onClose}
        className="fixed inset-0 z-40 cursor-default bg-transparent"
      />

      {/* Fields Menu */}
      <div className="absolute right-10 top-30 z-50 w-75.25 h-77.5 max-w-[calc(100vw-24px)] rounded-md border border-[#E5E5E5] dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-md transition-colors duration-200">
        {/* View Switcher */}
        <div className="w-66.75 h-69 border border-gray-200/40 dark:border-gray-800 rounded-md">
          <div className="w-full h-9 flex overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800 p-0.5">
            {/* List */}
            <button
              type="button"
              onClick={() => onViewChange("board")}
              className={`w-[133.5px] h-9 rounded-md cursor-pointer border border-[#E5E5E5] dark:border-gray-700 px-3 py-2.5
            flex flex-1 items-center justify-center gap-1
            text-base font-medium
            transition
            ${
              viewMode === "list"
                ? "bg-white dark:bg-gray-950 text-black dark:text-white shadow-sm"
                : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }
          `}
            >
              <List className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              <span className="w-6.25 h-5 text-sm font-sans font-medium leading-5 text-[#171717] dark:text-gray-100">
                List
              </span>
            </button>

            {/* Board */}
            <button
              type="button"
              onClick={() => onViewChange("list")}
              className={`w-[133.5px] h-9 rounded-md cursor-pointer border border-[#E5E5E5] dark:border-gray-700 px-3 py-2.5
            flex flex-1 items-center justify-center gap-2
            text-base font-medium
            transition
            ${
              viewMode === "board"
                ? "bg-white dark:bg-gray-950 text-black dark:text-white shadow-sm"
                : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }
          `}
            >
              <Grid2X2 className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              <span className="text-sm font-sans font-medium leading-5 text-[#171717] dark:text-gray-100">
                Board
              </span>
            </button>
          </div>

          {/* Fields */}
          <div className="w-66.75 h-56 mt-2 space-y-1">
            <div className="w-full h-8">
              {fields.map((field) => (
                <button
                  key={field.id}
                  type="button"
                  onClick={() => toggleField(field.id)}
                  className="flex w-full items-center justify-between rounded-lg px-1 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="w-20 min-w-20 h-4 text-xs font-sans font-medium leading-4 text-[#171717] dark:text-gray-200">
                    {field.label}
                  </span>

                  <div
                    className={`flex h-4 w-4 items-center justify-center
                  rounded
                  transition
                  ${
                    field.checked
                      ? "bg-gray-900 dark:bg-white"
                      : "bg-gray-200 dark:bg-gray-700"
                  }
                `}
                  >
                    <span className="w-4 h-4 flex items-center justify-center">
                      {field.checked && (
                        <Check className="h-4 w-4 text-white dark:text-gray-900" />
                      )}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
