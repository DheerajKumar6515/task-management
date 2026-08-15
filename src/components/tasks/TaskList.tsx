import { taskColumns } from "@/data/tasks";

import TaskListSection from "./TaskListSection";

export default function TaskList() {
  return (
    <div className="min-w-0 flex-1 overflow-y-auto px-3 pb-6 sm:px-4">
      {taskColumns.map((column) => (
        <TaskListSection
          key={column.id}
          column={column}
        />
      ))}
    </div>
  );
}
