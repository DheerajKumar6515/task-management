"use client";
import { useState } from "react";
import {Plus, Settings, ChevronDown,Check,Users,} from "lucide-react";
import DateButton from '@/components/tasks/TaskDetails/DateButton'


type Priority =
  | "no-priority"
  | "urgent"
  | "high"
  | "medium"
  | "low";

const priorityOptions: {
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


interface DetailsPanelProps {
  priority: Priority;
}



export default function DetailsPanel({
  priority,
}: DetailsPanelProps) {
      const [currentPriority, setCurrentPriority] =
    useState<Priority>(priority);

    const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

    const [priorityOpen, setPriorityOpen] =
    useState(false);

  const [calendarOpen, setCalendarOpen] =
    useState(false);

  const [selectedDay, setSelectedDay] =
    useState(10);

  const [memberAdded, setMemberAdded] =
    useState(false);

    const formatDate = (date: string) => {
    if (!date) return "";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
      }
    );
  };


  return (
    <aside className="w-full lg:w-56">
      <div className=" relative rounded-lg border border-gray-200 bg-white">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-3 py-2.5">
          <div>
           <ChevronDown size={13} />
            <h2 className="text-xs font-semibold">
            Details
          </h2>
          </div>
          

          <div className="flex items-center gap-3">
            <button  type="button"
              className="text-gray-700 hover:text-black"
              aria-label="Add property">             
              <span className="cursor-pointer"><Plus size={14} /></span>
            </button>

            <button type="button"
              className="text-gray-700 hover:text-black"
              aria-label="Settings">
              <span className="cursor-pointer"><Settings size={14} /></span>
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4 p-3">

          <DetailRow
            label="Status"
            value={
             <button
                type="button"
                className="flex items-center gap-1 text-[11px] text-orange-500"
              >
                <span className="text-[9px]">
                  ●
                </span>

                Backlog
              </button>
            }
          />

          <DetailRow
            label="Priority"
            value={
                <div className="relative">

                <button
                  type="button"
                  onClick={() =>
                    setPriorityOpen(
                      (previous) => !previous
                    )
                  }
                  className="flex items-center gap-1 text-[11px] text-red-500"
                >
                  <span className="text-[10px]">
                    ◢
                  </span>

                  {
                    priorityOptions.find(
                      (item) =>
                        item.value ===
                        currentPriority
                    )?.label
                  }

                  <ChevronDown size={11} />
                </button>

                {/* Priority Dropdown */}
                {priorityOpen && (
                  <div className="absolute right-0 top-6 z-50 w-36 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">

                    <p className="px-2 py-2 text-[10px] text-gray-400">
                      Priority
                    </p>

                    {priorityOptions.map(
                      (option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setCurrentPriority(
                              option.value
                            );

                            setPriorityOpen(
                              false
                            );
                          }}
                          className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-[11px] text-gray-700 hover:bg-gray-50"
                        >
                          <span
                            className={
                              option.value ===
                              "urgent"
                                ? "text-red-500"
                                : option.value ===
                                    "high" ||
                                  option.value ===
                                    "medium"
                                ? "text-orange-500"
                                : "text-gray-500"
                            }
                          >
                            {option.label}
                          </span>

                          {currentPriority ===
                            option.value && (
                            <Check
                              size={12}
                              className="text-gray-700"
                            />
                          )}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            }
          />

          <DetailRow
            label="Members"
            value={
               <button
                type="button"
                onClick={() =>
                  setMemberAdded(
                    (previous) => !previous
                  )
                }
                className="flex items-center gap-1 text-[11px] text-gray-700 hover:text-black"
              >
                <Users size={12} />

                {memberAdded
                  ? "Admin"
                  : "Add members"}
              </button>
            }
          />

          <DetailRow
            label="Dates"
            value={
               <div className="flex items-center gap-1">

                {/* START DATE */}
                <DateButton
                  value={startDate}
                  placeholder="Start"
                  formattedValue={formatDate(startDate)}
                  onChange={setStartDate}
                />

                <span className="text-[10px] text-gray-400">
                  →
                </span>

                {/* END DATE */}
                <DateButton
                  value={endDate}
                  placeholder="End"
                  formattedValue={formatDate(endDate)}
                  onChange={setEndDate}
                />

              </div>
            }
          />

          <DetailRow
            label="Labels"
            value={
              <div className="flex flex-wrap gap-1">

                <span className="rounded-full bg-gray-100 px-2 py-1 text-[9px] text-gray-600">
                  Research
                </span>

                <span className="rounded-full bg-gray-100 px-2 py-1 text-[9px] text-gray-600">
                  Design
                </span>

              </div>
            }
          />

          <DetailRow
            label="Teams"
            value={<button
                type="button"
                className="text-[11px] text-gray-500 hover:text-gray-800"
              >
                Add team
              </button>}
          />

          <DetailRow
            label="Reporter"
            value={<button
                type="button"
                className="text-[11px] text-gray-700"
              >
                Admin
              </button>}
          />

        </div>
      </div>
    </aside>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div  className="grid grid-cols-[52px_minmax(0,1fr)] items-start gap-2">
      <span className="text-xs text-gray-500">
        {label}
      </span>

      <div className="min-w-0">{value}</div>
    </div>
  );
}