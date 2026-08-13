"use client";

import { useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import TaskHeader from "@/components/tasks/TaskHeader";
import TaskBoard from "@/components/tasks/TaskBoard";

function page() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
   <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <main className="flex min-w-0 flex-1 flex-col">
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        <TaskHeader />

        <div className="min-h-0 flex-1 px-3 sm:px-4">
          <TaskBoard />
        </div>
      </main>
    </div>
  )
}

export default page
