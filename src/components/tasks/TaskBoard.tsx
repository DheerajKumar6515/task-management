import { taskColumns } from "@/data/tasks";
import TaskColumn from "./TaskColumn";

function TaskBoard() {
  return (
    <div className="min-w-0 flex-1 overflow-hidden">
      <div
        className="flex h-full md:h-148 gap-4 overflow-x-auto overflow-y-auto pb-4 pr-2 scrollbar-thin
">
        {taskColumns.map((column) => (
          <TaskColumn
            key={column.id}
            column={column}
          />
        ))}
      </div>
    </div>
  )
}

export default TaskBoard
