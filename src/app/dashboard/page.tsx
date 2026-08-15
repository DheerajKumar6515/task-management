"use client";

import { useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import TaskHeader from "@/components/tasks/TaskHeader";
import TaskBoard from "@/components/tasks/TaskBoard";
import TaskList from "@/components/tasks/TaskList";

type ViewMode = "list" | "board";

function page() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
   const [viewMode, setViewMode] = useState<ViewMode>("list");
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
        {/* Header */}
        <TaskHeader 
         onMenuClick={() => setSidebarOpen(true)}
         viewMode={viewMode}
            onViewChange={setViewMode}
        />

         {/* Content */}
        {viewMode === "list" ? (
          <TaskList />
        ) : (
          <div className="min-h-0 flex-1 px-3 sm:px-4">
            <TaskBoard />
          </div>
        )}
      </main>
    </div>
  )
}

export default page
