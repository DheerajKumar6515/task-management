# 📋 Task Management Platform

A modern, full-stack Task Management application built using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase**. Designed to help users organize, filter, and manage tasks seamlessly with dynamic column views, interactive board layouts, dark/light theme persistence, and secure authentication.

---

## 🚀 Key Features
* **Task & Board Management:**
  * **Dual Views:** Switch between **Board View** (`TaskBoard`) and **List View** (`TaskList`) seamlessly.
  * **Column Organization:** Categorize tasks across columns (`TaskColumn`) with state-based grouping and real-time filtering.
  * **Subtask & Tag Support:** Task cards feature tags (`TaskTag`), detailed status updates, and interactive modal management (`UpdateTaskModal`, `TaskActions`).

* **Theme & UI:**
  * **Dark & Light Mode:** Custom class-based theme toggle utilizing Tailwind CSS and client-side `localStorage` state synchronization.
  * **Responsive Design:** Mobile-first layout with collapsible sidebars and responsive navigation components (`Topbar`, `Sidebar`, `TaskHeader`).

---

## 🛠️ Tech Stack

### **Frontend**
* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (v4 configuration with custom CSS directives)
* **Icons & Components:** Lucide React 

### **Backend & Database**
* **Backend as a Service (BaaS):**Nest.js, Supabase
* **Auth SDK:** `@supabase/supabase-js`
* **Session Strategy:** Local browser storage & Supabase Auth Tokens

---

## 📁 Project Structure

```text
task-management/
├── backend/                  # Additional backend configuration/scripts
├── src/
│   ├── app/                  # Next.js App Router routes
│   │   ├── dashboard/        # Main Dashboard view
│   │   ├── task/[id]/        # Dynamic task details page
│   │   ├── globals.css       # Tailwind directives & dark mode overrides
│   │   └── page.tsx          # Landing / Entry page
│   ├── components/
│   │   ├── auth/             # Auth UI components (LoginCard, etc.)
│   │   └── tasks/            # Task management UI components
│   │       ├── TaskBoard.tsx
│   │       ├── TaskCard.tsx
│   │       ├── TaskColumn.tsx
│   │       ├── TaskList.tsx
│   │       ├── TaskRow.tsx
│   │       ├── TaskTag.tsx
│   │       ├── TaskActions.tsx
│   │       └── UpdateTaskModal.tsx
│   ├── lib/                  # Helper utilities and Supabase client setup
│   │   └── supabaseClient.ts
│   ├── data/                 # Sample data & mock fallbacks (tasks.ts)
│   └── types/                # TypeScript interfaces (task.ts)
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
