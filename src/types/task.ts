export type TaskStatus = "todo" | "doing" | "completed" | "on-hold";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
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