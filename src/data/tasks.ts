import type { TaskColumn } from "@/types/task";

// export const taskColumns: TaskColumn[] = [
//   {
//     id: "todo",
//     title: "To Do",
//     tasks: [
//       {
//         id: "task-1",
//         title: "Write API Documentation",
//         status: "todo",
//         column_id:"todo",
//         priority: "high",
//         assignee: "Admin",
//         dueDate: "29 Jul",
//         tags: ["Research", "Design", "Development", "Testing", "Deployment"],
//         description:
//           "Create clear and detailed API documentation to guide developers in using the inventory and sales metrics features effectively.",

//         subtasks: [
//           {
//             id: "subtask-1",
//             title: "Subtask 1",
//             priority: "high",
//             assignee: "Admin",
//             dueDate: "12 Sep 2026",
//           },
//           {
//             id: "subtask-2",
//             title: "Subtask 2",
//             priority: "low",
//             assignee: "CN",
//             dueDate: "15 Sep 2026",
//           },
//           {
//             id: "subtask-3",
//             title: "Subtask 3",
//             priority: "medium",
//             assignee: "Admin",
//             dueDate: "18 Sep 2026",
//           },
//         ],
//       },
//       {
//         id: "task-2",
//         title: "Implement Search Function",
//         status: "todo",
//         column_id:"todo",
//         priority: "low",
//         assignee: "Admin",
//         dueDate: "29 Jul",
//         tags: ["Deployment", "Deployment"],
//       },
//       {
//         id: "task-3",
//         title: "Deploy to Production",
//         status: "todo",
//         column_id:"todo",
//         priority: "medium",
//         assignee: "Admin",
//         dueDate: "29 Jul",
//         tags: ["Deployment", "Deployment"],
//       },
//     ],
//   },

//   {
//     id: "doing",
//     title: "Doing",
//     tasks: [
//       {
//         id: "task-4",
//         title: "Code Review Completed",
//         status: "doing",
//         column_id:"doing",
//         priority: "high",
//         assignee: "Admin",
//         dueDate: "29 Jul",
//         tags: ["Deployment", "Deployment"],
//       },
//       {
//         id: "task-5",
//         title: "Design Mockups Finalized",
//         status: "doing",
//         column_id:"doing",
//         priority: "low",
//         assignee: "Admin",
//         dueDate: "29 Jul",
//         tags: ["Deployment", "Deployment"],
//       },
//     ],
//   },

//   {
//     id: "completed",
//     title: "Completed",
//     tasks: [
//       {
//         id: "task-6",
//         title: "Feature Testing Passed",
//         status: "completed",
//         column_id:"completed",
//         priority: "high",
//         assignee: "QA Team",
//         dueDate: "30 Jul",
//         tags: ["Testing", "Passed"],
//       },
//       {
//         id: "task-7",
//         title: "UI Design Updated",
//         status: "completed",
//         column_id:"completed",
//         priority: "low",
//         assignee: "Designer",
//         dueDate: "31 Jul",
//         tags: ["Design", "Updated"],
//       },
//       {
//         id: "task-8",
//         title: "Security Audit Scheduled",
//         status: "completed",
//         column_id:"completed",
//         priority: "medium",
//         assignee: "Security",
//         dueDate: "01 Aug",
//         tags: ["Audit", "Scheduled"],
//       },
//     ],
//   },

//   {
//     id: "on-hold",
//     title: "On Hold",
//     tasks: [
//       {
//         id: "task-9",
//         title: "UI Review",
//         status: "on-hold",
//         column_id:"on-hold",
//         priority: "high",
//         assignee: "Designer",
//         dueDate: "01 Aug",
//         tags: ["Review"],
//       },
//       {
//         id: "task-10",
//         title: "Backend Integration",
//         status: "on-hold",
//         column_id:"on-hold",
//         priority: "low",
//         assignee: "Dev Team",
//         dueDate: "02 Aug",
//         tags: ["Development"],
//       },
//       {
//         id: "task-11",
//         title: "User Feedback",
//         status: "on-hold",
//         column_id:"on-hold",
//         priority: "medium",
//         assignee: "Product",
//         dueDate: "03 Aug",
//         tags: ["Research"],
//       },
//       {
//         id: "task-12",
//         title: "Performance Optimization",
//         status: "on-hold",
//         column_id:"on-hold",
//         priority: "high",
//         assignee: "Engineering",
//         dueDate: "04 Aug",
//         tags: ["Optimization"],
//       },
//     ],
//   },
// ];

export const taskColumns: TaskColumn[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: "task-1",
        title: "Write API Documentation",
        status: "todo",
        column_id: "todo",
        priority: "high",
        assignee: "Admin",
        dueDate: "29 Jul",
        tags: ["Research", "Design", "Development", "Testing", "Deployment"],
        description:
          "Create clear and detailed API documentation to guide developers in using the inventory and sales metrics features effectively.",
        subtasks: [
          {
            id: "subtask-1",
            title: "Draft Endpoints Structure",
            priority: "high",
            assignee: "Admin",
            dueDate: "12 Sep 2026",
          },
          {
            id: "subtask-2",
            title: "Add Request/Response Examples",
            priority: "low",
            assignee: "CN",
            dueDate: "15 Sep 2026",
          },
          {
            id: "subtask-3",
            title: "Review Auth Flow Docs",
            priority: "medium",
            assignee: "Admin",
            dueDate: "18 Sep 2026",
          },
        ],
      },
      {
        id: "task-2",
        title: "Implement Search Function",
        status: "todo",
        column_id: "todo",
        priority: "low",
        assignee: "Admin",
        dueDate: "29 Jul",
        tags: ["Deployment", "Development"],
        description:
          "Build full-text search capability for tasks and subtasks using optimized query filters.",
        subtasks: [
          {
            id: "subtask-4",
            title: "Setup Search Input Component",
            priority: "low",
            assignee: "Admin",
            dueDate: "10 Sep 2026",
          },
          {
            id: "subtask-5",
            title: "Integrate Backend Query Filter",
            priority: "medium",
            assignee: "Dev Team",
            dueDate: "14 Sep 2026",
          },
        ],
      },
      {
        id: "task-3",
        title: "Deploy to Production",
        status: "todo",
        column_id: "todo",
        priority: "medium",
        assignee: "Admin",
        dueDate: "29 Jul",
        tags: ["Deployment"],
        description:
          "Prepare environment variables and pipeline stages for production deployment.",
        subtasks: [
          {
            id: "subtask-6",
            title: "Verify Production Envs",
            priority: "high",
            assignee: "Admin",
            dueDate: "05 Sep 2026",
          },
          {
            id: "subtask-7",
            title: "Run Smoke Tests",
            priority: "medium",
            assignee: "QA Team",
            dueDate: "06 Sep 2026",
          },
        ],
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
        column_id: "doing",
        priority: "high",
        assignee: "Admin",
        dueDate: "29 Jul",
        tags: ["Deployment", "Review"],
        description:
          "Reviewing pull requests for core features to maintain code quality and prevent security flaws.",
        subtasks: [
          {
            id: "subtask-8",
            title: "Review Auth Module PR",
            priority: "high",
            assignee: "Admin",
            dueDate: "01 Sep 2026",
          },
          {
            id: "subtask-9",
            title: "Verify Test Coverage",
            priority: "medium",
            assignee: "QA Team",
            dueDate: "02 Sep 2026",
          },
        ],
      },
      {
        id: "task-5",
        title: "Design Mockups Finalized",
        status: "doing",
        column_id: "doing",
        priority: "low",
        assignee: "Admin",
        dueDate: "29 Jul",
        tags: ["Design", "UI"],
        description:
          "Finalizing responsive UI Figma designs for Dark and Light mode themes across dashboard widgets.",
        subtasks: [
          {
            id: "subtask-10",
            title: "Export Dark Theme Assets",
            priority: "low",
            assignee: "Designer",
            dueDate: "03 Sep 2026",
          },
          {
            id: "subtask-11",
            title: "Validate Accessibility Contrast",
            priority: "medium",
            assignee: "Admin",
            dueDate: "04 Sep 2026",
          },
        ],
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
        column_id: "completed",
        priority: "high",
        assignee: "QA Team",
        dueDate: "30 Jul",
        tags: ["Testing", "Passed"],
        description:
          "All edge cases and unit test suites passed successfully for core feature updates. 682c0bf6",
        subtasks: [
          {
            id: "subtask-12",
            title: "Execute End-to-End Cypress Tests",
            priority: "high",
            assignee: "QA Team",
            dueDate: "28 Jul 2026",
          },
          {
            id: "subtask-13",
            title: "Document Test Summary Report",
            priority: "low",
            assignee: "QA Team",
            dueDate: "29 Jul 2026",
          },
        ],
      },
      {
        id: "task-7",
        title: "UI Design Updated",
        status: "completed",
        column_id: "completed",
        priority: "low",
        assignee: "Designer",
        dueDate: "31 Jul",
        tags: ["Design", "Updated"],
        description:
          "Updated button states, font typography scales, and modal padding according to design token specs.",
        subtasks: [
          {
            id: "subtask-14",
            title: "Update Tailwind Config Tokens",
            priority: "medium",
            assignee: "Designer",
            dueDate: "30 Jul 2026",
          },
        ],
      },
      {
        id: "task-8",
        title: "Security Audit Scheduled",
        status: "completed",
        column_id: "completed",
        priority: "medium",
        assignee: "Security",
        dueDate: "01 Aug",
        tags: ["Audit", "Scheduled"],
        description:
          "Completed initial automated vulnerability scanning and scheduled deep penetration testing session.",
        subtasks: [
          {
            id: "subtask-15",
            title: "Run NPM Dependency Vulnerability Check",
            priority: "high",
            assignee: "Security",
            dueDate: "31 Jul 2026",
          },
          {
            id: "subtask-16",
            title: "Share Access Credentials with Audit Team",
            priority: "medium",
            assignee: "Admin",
            dueDate: "01 Aug 2026",
          },
        ],
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
        column_id: "on-hold",
        priority: "high",
        assignee: "Designer",
        dueDate: "01 Aug",
        tags: ["Review"],
        description:
          "On hold pending feedback from product owners regarding high-contrast color scheme choices. 461cf550",
        subtasks: [
          {
            id: "subtask-17",
            title: "Collect Stakeholder Feedback",
            priority: "high",
            assignee: "Designer",
            dueDate: "10 Aug 2026",
          },
        ],
      },
      {
        id: "task-10",
        title: "Backend Integration",
        status: "on-hold",
        column_id: "on-hold",
        priority: "low",
        assignee: "Dev Team",
        dueDate: "02 Aug",
        tags: ["Development"],
        description:
          "Paused until external payment gateway API specifications are finalized by partner team.",
        subtasks: [
          {
            id: "subtask-18",
            title: "Wait for Updated Webhook Docs",
            priority: "low",
            assignee: "Dev Team",
            dueDate: "12 Aug 2026",
          },
          {
            id: "subtask-19",
            title: "Prepare Sandbox Test Credentials",
            priority: "medium",
            assignee: "Dev Team",
            dueDate: "15 Aug 2026",
          },
        ],
      },
      {
        id: "task-11",
        title: "User Feedback",
        status: "on-hold",
        column_id: "on-hold",
        priority: "medium",
        assignee: "Product",
        dueDate: "03 Aug",
        tags: ["Research"],
        description:
          "Gathering qualitative feedback from beta testers before starting the next development cycle.",
        subtasks: [
          {
            id: "subtask-20",
            title: "Prepare Survey Form Questionnaire",
            priority: "medium",
            assignee: "Product",
            dueDate: "08 Aug 2026",
          },
        ],
      },
      {
        id: "task-12",
        title: "Performance Optimization",
        status: "on-hold",
        column_id: "on-hold",
        priority: "high",
        assignee: "Engineering",
        dueDate: "04 Aug",
        tags: ["Optimization"],
        description:
          "On hold until database indexing strategies are reviewed by senior database architect.",
        subtasks: [
          {
            id: "subtask-21",
            title: "Analyze Slow Query Logs",
            priority: "high",
            assignee: "Engineering",
            dueDate: "18 Aug 2026",
          },
          {
            id: "subtask-22",
            title: "Implement Redis Caching Layer",
            priority: "medium",
            assignee: "Engineering",
            dueDate: "20 Aug 2026",
          },
        ],
      },
    ],
  },
];