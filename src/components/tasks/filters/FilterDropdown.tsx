"use client";

import PriorityFilter from "@/components/tasks/filters/PriorityFilter";
import { useState } from "react";
import {
  Circle,
  Flag,
  Users,
  CalendarDays,
  UsersRound,
  Tag,
  User,
  ChevronRight,
} from "lucide-react";


interface FilterDropdownProps {
  onClose?: () => void;
}

type FilterItem = {
  id: string;
  label: string;
};

const filterItems: FilterItem[] = [
  {
    id: "status",
    label: "Status",
  },
  {
    id: "priority",
    label: "Priority",
  },
  {
    id: "members",
    label: "Members",
  },
  {
    id: "due-date",
    label: "Due Date",
  },
  {
    id: "teams",
    label: "Teams",
  },
  {
    id: "labels",
    label: "Labels",
  },
  {
    id: "reporter",
    label: "Reporter",
  },
];

const icons = {
  status: Circle,
  priority: Flag,
  members: Users,
  "due-date": CalendarDays,
  teams: UsersRound,
  labels: Tag,
  reporter: User,
};

export default function FilterDropdown({
  onClose,
}: FilterDropdownProps) {
  const [activeFilter, setActiveFilter] =
    useState<string | null>(null);

  return (
    <div className="absolute right-0 top-10 z-50 flex">

      {/* Main Filter Menu */}
      <div className="w-32 rounded-md border border-gray-200 bg-white p-1 shadow-lg">

        {filterItems.map((item) => {
          const Icon = icons[item.id as keyof typeof icons];

          const isActive =
            activeFilter === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (item.id === "priority") {
                  setActiveFilter(
                    isActive ? null : "priority"
                  );
                  return;
                }

                setActiveFilter(
                  isActive ? null : item.id
                );
              }}
              className={`
                flex
                w-full
                items-center
                justify-between
                rounded
                px-2
                py-1.5
                text-left
                text-[10px]
                text-gray-700
                transition

                ${
                  isActive
                    ? "bg-gray-50"
                    : "hover:bg-gray-50"
                }
              `}
            >
              <span className="flex items-center gap-2">

                <Icon size={12} />

                {item.label}

              </span>

              <ChevronRight size={10} />
            </button>
          );
        })}

      </div>

      {/* Priority Submenu */}
      {activeFilter === "priority" && (
        <PriorityFilter />
      )}

    </div>
  );
}