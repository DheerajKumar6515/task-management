export type TaskStatus = "todo" | "doing" | "completed" | "on-hold";

export type TaskPriority = "high" | "medium" | "low"

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  avatar?: string;
  dueDate: string;
  tags: string[];
}

export interface TaskColumn {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}