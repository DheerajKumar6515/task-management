import { CalendarDays, MoreHorizontal } from "lucide-react";
import type { Task } from "@/types/task";
import Avatar from "@/components/ui/Avatar";
import TaskTag from "./TaskTag";
import Link from "next/link";
import TaskActions from "@/components/tasks/TaskActions";


interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
 //console.log(task)
  return (
    <Link href={`/task/${task.id}`}>
      <article className="w-68.25 h-28.5 rounded-md border border-[#E5E5E5] bg-white dark:bg-gray-900 dark:border-gray-800 p-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-sm gap-2 mb-1.5 dark:shadow-none transition-all dark:hover:border-gray-700">
        {/* Task title */}
        <div className="w-61.75 h-5 flex items-start justify-between gap-2">
          <h3 className="w-50 h-5 text-sm font-sans font-medium leading-5 text-[#0A0A0A] dark:text-gray-100 truncate">
            {task.title}
          </h3>

          <TaskActions taskId={task.id} task={task} />
        </div>

        {/* Assignee + Date */}
        <div className="w-61.75 h-13 flex items-center justify-between">
          <div className="w-22.5 h-5 flex min-w-0 items-center gap-1">
            {/* Avatar IMage here */}
            <div className="w-6.5 h-5 rounded-full">
              <Avatar 
              name={task.assignee} 
              src={task.avatar || '/defaultimg.png'}/>
            </div>

            <span className="w-full capitalize h-4 text-xs font-sans font-medium text-[#0A0A0A] dark:text-gray-300 truncate">
              {task.assignee}
            </span>
          </div>

          <span className="w-16.75 capitalize h-5 inline-flex shrink-0 items-center justify-center gap-1 rounded-3xl border border-white dark:border-gray-800 bg-red-50 dark:bg-red-950/40 py-0.5 text-xs font-sans leading-4 font-medium text-[#DC2626] dark:text-red-400">
            <CalendarDays className="h-3 w-3" />
            {task.dueDate}
          </span>
        </div>

        {/* Tags */}
        <div className="w-full h-5 flex flex-wrap gap-1.5">
          {task.tags.slice(0, 2).map((tag, index) => (
            <TaskTag key={`${task.id}-${tag}-${index}`} label={tag} />
          ))}
        </div>
      </article>
    </Link>
  );
}

export default TaskCard;
