import { taskColumns } from "@/data/tasks";
import TaskColumn from "@/components/tasks/TaskColumn";
import { TaskColumn as taskColumn } from "@/types/task";

interface TaskBoardProps {
  taskColumns: taskColumn[];
}

function TaskBoard({ taskColumns }: TaskBoardProps) {
  return (
    <div className="min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-200">
      <div
        className="flex h-full md:h-148 gap-4 overflow-x-auto overflow-y-auto pb-4 pr-2 scrollbar-thin dark:scrollbar-thumb-gray-800 dark:scrollbar-track-gray-900
"
      >
        {taskColumns.map((column) => (
          <TaskColumn key={column.id} column={column} />
        ))}
      </div>
    </div>
  );
}

export default TaskBoard;
