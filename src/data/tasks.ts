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
        assignee: "Admin",
        dueDate: "29 Jul",
        tags: ["Deployment", "Deployment"],
      },
      {
        id: "task-2",
        title: "Implement Search Function",
        status: "todo",
        assignee: "Admin",
        dueDate: "29 Jul",
        tags: ["Deployment", "Deployment"],
      },
      {
        id: "task-3",
        title: "Deploy to Production",
        status: "todo",
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
        assignee: "Admin",
        dueDate: "29 Jul",
        tags: ["Deployment", "Deployment"],
      },
      {
        id: "task-5",
        title: "Design Mockups Finalized",
        status: "doing",
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
        assignee: "QA Team",
        dueDate: "30 Jul",
        tags: ["Testing", "Passed"],
      },
      {
        id: "task-7",
        title: "UI Design Updated",
        status: "completed",
        assignee: "Designer",
        dueDate: "31 Jul",
        tags: ["Design", "Updated"],
      },
      {
        id: "task-8",
        title: "Security Audit Scheduled",
        status: "completed",
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
        assignee: "Designer",
        dueDate: "01 Aug",
        tags: ["Review"],
      },
      {
        id: "task-10",
        title: "Backend Integration",
        status: "on-hold",
        assignee: "Dev Team",
        dueDate: "02 Aug",
        tags: ["Development"],
      },
      {
        id: "task-11",
        title: "User Feedback",
        status: "on-hold",
        assignee: "Product",
        dueDate: "03 Aug",
        tags: ["Research"],
      },
      {
        id: "task-12",
        title: "Performance Optimization",
        status: "on-hold",
        assignee: "Engineering",
        dueDate: "04 Aug",
        tags: ["Optimization"],
      },
    ],
  },
];