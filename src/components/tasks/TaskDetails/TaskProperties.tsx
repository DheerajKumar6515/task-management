import { CalendarDays } from "lucide-react";

interface TaskPropertiesProps {
  assignee: string;
  dueDate: string;
}

export default function TaskProperties({
  assignee,
  dueDate,
}: TaskPropertiesProps) {
  return (
    <div className="mt-5">
      <h2 className="mb-3 text-xs font-semibold">
        Properties
      </h2>

      <div className="flex flex-wrap items-center gap-4 text-xs">
        <span className="text-gray-500">
          Assignee
        </span>

        <span className="text-gray-800">
          A&nbsp; {assignee}
        </span>

        <span className="text-gray-500">
          Due Date
        </span>

        <span className="flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-red-500">
          <CalendarDays size={12} />
          {dueDate}
        </span>
      </div>
    </div>
  );
}
