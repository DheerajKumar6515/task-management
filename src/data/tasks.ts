import type { TaskColumn } from "@/types/task";

export const taskColumns: TaskColumn[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: "task-1",
        title: "Write API Documentation",
        status: "todo",
         priority: "high",
        assignee: "Admin",
        dueDate: "29 Jul",
        tags: ["Deployment", "Deployment"],
      },
      {
        id: "task-2",
        title: "Implement Search Function",
        status: "todo",
         priority: "low",
        assignee: "Admin",
        dueDate: "29 Jul",
        tags: ["Deployment", "Deployment"],
      },
      {
        id: "task-3",
        title: "Deploy to Production",
        status: "todo",
         priority: "medium",
        assignee: "Admin",
        dueDate: "29 Jul",
        tags: ["Deployment", "Deployment"],
      },
    ],
  },

  {
    id: "doing",
    title: "Doing",
    tasks: [
      {
        id: "task-4",
        title: "Code Review Completed",
        status: "doing",
         priority: "high",
        assignee: "Admin",
        dueDate: "29 Jul",
        tags: ["Deployment", "Deployment"],
      },
      {
        id: "task-5",
        title: "Design Mockups Finalized",
        status: "doing",
         priority: "low",
        assignee: "Admin",
        dueDate: "29 Jul",
        tags: ["Deployment", "Deployment"],
      },
    ],
  },

  {
    id: "completed",
    title: "Completed",
    tasks: [
      {
        id: "task-6",
        title: "Feature Testing Passed",
        status: "completed",
         priority: "high",
        assignee: "QA Team",
        dueDate: "30 Jul",
        tags: ["Testing", "Passed"],
      },
      {
        id: "task-7",
        title: "UI Design Updated",
        status: "completed",
         priority: "low",
        assignee: "Designer",
        dueDate: "31 Jul",
        tags: ["Design", "Updated"],
      },
      {
        id: "task-8",
        title: "Security Audit Scheduled",
        status: "completed",
        priority: "medium",
        assignee: "Security",
        dueDate: "01 Aug",
        tags: ["Audit", "Scheduled"],
      },
    ],
  },

  {
    id: "on-hold",
    title: "On Hold",
    tasks: [
      {
        id: "task-9",
        title: "UI Review",
        status: "on-hold",
         priority: "high",
        assignee: "Designer",
        dueDate: "01 Aug",
        tags: ["Review"],
      },
      {
        id: "task-10",
        title: "Backend Integration",
        status: "on-hold",
         priority: "low",
        assignee: "Dev Team",
        dueDate: "02 Aug",
        tags: ["Development"],
      },
      {
        id: "task-11",
        title: "User Feedback",
        status: "on-hold",
         priority: "medium",
        assignee: "Product",
        dueDate: "03 Aug",
        tags: ["Research"],
      },
      {
        id: "task-12",
        title: "Performance Optimization",
        status: "on-hold",
         priority: "high",
        assignee: "Engineering",
        dueDate: "04 Aug",
        tags: ["Optimization"],
      },
    ],
  },
];