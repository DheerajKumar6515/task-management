export type TaskStatus = "todo" | "doing" | "completed" | "on-hold";

export type TaskPriority = "high" | "medium" | "low"

export interface SubTasks {
   id: string,
    title: string,
    priority: TaskPriority,
    assignee: string,
    dueDate: string,
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  column_id:string;
  priority: TaskPriority;
  assignee: string;
  avatar?: string;
  dueDate: string;
  tags: string[];
  description?:string;
  subtasks?:SubTasks[];
  assigneeImage?: string
}

export interface TaskColumn {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}