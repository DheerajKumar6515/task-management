"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import TaskHeader from "@/components/tasks/TaskHeader";
import ProjectsTable from "@/components/projects/ProjectsTable";

type ViewMode = "list" | "board";

function page() {
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  // Mobile sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Board / List state
  const [viewMode, setViewMode] = useState<ViewMode>("board");
  //for taskHeader
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex min-w-0 flex-1 flex-col bg-white dark:bg-gray-950">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <TaskHeader
          onMenuClick={() => setSidebarOpen(true)}
          viewMode={viewMode}
          onViewChange={setViewMode}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenModal={() => setIsModalOpen(true)}
        />

        <ProjectsTable />
      </main>
    </div>
  );
}

export default page;
