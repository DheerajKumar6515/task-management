import TaskListSection from "./TaskListSection";
import {TaskColumn } from "@/types/task";

interface TaskListProps {
 taskColumns: TaskColumn[];
}

export default function TaskList({taskColumns}:TaskListProps) {
 
  return (
    <div className="min-w-0 flex-1 overflow-y-auto px-3 pb-6 sm:px-4">
    
      
      {taskColumns.map((column) => (
        <TaskListSection
          key={column.id}
          title={column.title}
          tasks={column.tasks}
        />
      ))}

    </div>
  );
}
