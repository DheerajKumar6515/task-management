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
      <h2 className="mb-3 text-xs font-semibold text-gray-900 dark:text-gray-100">
        Properties
      </h2>

      <div className="flex flex-wrap items-center gap-4 text-xs">
        <span className="text-gray-500 dark:text-gray-400">Assignee</span>

        <span className="text-gray-800 dark:text-gray-200 font-medium">
          A&nbsp; {assignee}
        </span>

        <span className="text-gray-500 dark:text-gray-400">Due Date</span>

        <span className="flex items-center gap-1 rounded-full bg-red-50 dark:bg-red-950/40 px-2 py-1 text-red-500 dark:text-red-400 border border-transparent dark:border-red-900/40 transition-colors">
          <CalendarDays size={12} />
          {dueDate}
        </span>
      </div>
    </div>
  );
}
