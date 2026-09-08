# 📋 Task Management Platform

A modern, full-stack Task Management application built using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase**. Designed to help users organize, filter, and manage tasks seamlessly with dynamic column views, interactive board layouts, dark/light theme persistence, and secure authentication.

---
                                  ┌─────────────────────────────────────────────────┐
                                  │              Next.js Frontend Client            │
                                  │        (Next.js, TypeScript, Tailwind CSS,)     │
                                  └───────────────────────┬─────────────────────────┘
                                                          │
                                               REST API / HTTP Requests
                                                          │
                                                          ▼
                                  ┌─────────────────────────────────────────────────┐
                                  │             NestJS Backend Service              │
                                  │   (Controllers, Services, DTOs, Validation)     │
                                  └───────────────────────┬─────────────────────────┘
                                                          │
                                                Supabase Service Role
                                                          │
                                                          ▼
           ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
           │                                     Supabase / PostgreSQL                                       │
           │    (tasks Table, comments Table, columns Table, subtask Table, Profiles Table, RLS Policies)    │
           └─────────────────────────────────────────────────────────────────────────────────────────────────┘
---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Lucide React
- **State Management:** React Hooks

### Backend
- **Framework:** NestJS
- **Data Validation:** `class-validator`, `class-transformer`
- **Database Client:** `@supabase/supabase-js`

### Database & Security
- **Database:** PostgreSQL (Hosted on Supabase)
- **Authentication:** Supabase Auth (Google OAuth 2.0)
- **Security:** PostgreSQL Row-Level Security (RLS)

---

## 🚀 Key Features
* **Task & Board Management:**
  * **Dual Views:** Switch between **Board View** (`TaskBoard`) and **List View** (`TaskList`) seamlessly.
  * **Column Organization:** Categorize tasks across columns (`TaskColumn`) with state-based grouping and real-time filtering.
  * **Subtask & Tag Support:** Task cards feature tags (`TaskTag`), detailed status updates, and interactive modal management (`UpdateTaskModal`, `TaskActions`).
  * **Modern Responsive UI:** Polished interface optimized across mobile, tablet, and desktop viewports.
  * **Multi-Method Authentication:** Supports Google OAuth 2.0 and Guest session management.
  * **Dynamic User Profiles:** Real-time profile state management allowing users to update titles, avatars, usernames, and contact information.
  * **Automated Upsert Logic:** Intelligent PostgreSQL `UPSERT` mechanics using `onConflict` resolution for handling concurrent user profile creation and updates seamlessly.
  * **Granular Access Control:** Enforced Row Level Security (RLS) policies within PostgreSQL alongside backend Service Role validation.

* **Theme & UI:**
  * **Dark & Light Mode:** Custom class-based theme toggle utilizing Tailwind CSS and client-side `localStorage` state synchronization.
  * **Responsive Design:** Mobile-first layout with collapsible sidebars and responsive navigation components (`Topbar`, `Sidebar`, `TaskHeader`).
---

## 📁 Repository Structure

```text
task-management/
├── backend/                  # Additional backend configuration/scripts
├── src/
│   ├── app/                  # Next.js App Router routes
|   |   |__auth/              # For Google Authentication 
│   │   ├── dashboard/        # Main Dashboard view
|   |   |__profile/           # User Profile
|   |   |__project/           # Display Project
│   │   ├── task/[id]/        # Dynamic task details page
│   │   ├── globals.css       # Tailwind directives & dark mode overrides
│   │   └── page.tsx          # Landing / Entry page
│   ├── components/
│   │   ├── auth/            # Auth UI components (LoginCard, etc.)
|   |   |   ├──LoginCard.tsx       
|   |   |__layout/
|   |   |  ├──ColorMode.tsx
|   |   |  ├──ProfileMenu.tsx
|   |   |  ├──Sidebar.tsx
|   |   |  ├──ThemeMenu.tsx
|   |   |  ├──Topbar.tsx      
|   |   |__projects/
|   |   |  ├──ActionDropdown.tsx
|   |   |  ├──AddProjectModal.tsx
|   |   |  ├──DeleteWarnModal.tsx
|   |   |  ├──EditProjectModal.tsx
|   |   |  ├──ProjectRow.tsx
|   |   |  ├──ProjctTable.tsx                  
│   │   └── tasks/                 # Task management UI components
|   |       ├── filters/
|   |       |     └── FilterDropdown.tsx
|   |       |     └── PriorityFilter.tsx
|   |       ├── TaskDetails/
|   |       |     └── ActivityUpdates.tsx
|   |       |     └── CommentSection.tsx
|   |       |     └── DateButton.tsx
|   |       |     └── DetailsPanel.tsx
|   |       |     └── PriorityDropdown.tsx
|   |       |     └── SubtaskDeleteWarning.tsx
|   |       |     └── SubtaskTable.tsx
|   |       |     └── TaskDetailsHeader.tsx
|   |       |     └── TaskLabels.tsx
|   |       |     └── TaskProperties.tsx
|   |       |     └── TaskResources.tsx
|   |       |     └── UpdateSubtaskModal.tsx
|   |       ├── taskModel/
|   |       |     └── AddColumnModal.tsx
|   |       |     └── SubTaskModal.tsx
|   |       |     └── TaskModal.tsx
|   |       |     └── UpdateProfile.tsx
|   |       ├── TaskHeader.tsx 
|   |       ├── TaskListSection.tsx 
|   |       ├── SearchInput.tsx 
|   |       ├── FormateTime.tsx 
|   |       ├── FieldsMenu.tsx 
|   |       ├── DeleteConfirmModal.tsx               
│   │       ├── TaskBoard.tsx   
│   │       ├── TaskCard.tsx
│   │       ├── TaskColumn.tsx
│   │       ├── TaskList.tsx
│   │       ├── TaskRow.tsx
│   │       ├── TaskTag.tsx
│   │       ├── TaskActions.tsx
│   │       └── UpdateTaskModal.tsx
|   ├── ui/
|   |   └── Avatar.tsx
|   |   └── CleanAvatar.tsx
|   |   └── IconButton.tsx
|   |   └── UserProfile.tsx
|   ├── Context/
|   |   └── GlobalContext.tsx
│   ├── lib/                  # Helper utilities and Supabase client setup
│   │   └── supabaseClient.ts
│   ├── data/                 # Sample data & mock fallbacks (tasks.ts)
│   └── types/                # TypeScript interfaces (task.ts)
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
