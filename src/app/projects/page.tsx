"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import TaskHeader from "@/components/tasks/TaskHeader";
import ProjectRow from "@/components/projects/ProjectRow";
import AddProjectModal from "@/components/projects/AddProjectModal";



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
      // for project modal
      const [projectModalOpen,setProjectModalOpen]=useState(false)

      const fetchProjects = async () => {
    // Database se projects fetch karne ka logic
     };

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">

  <Sidebar 
    open={sidebarOpen}
    onClose={() => setSidebarOpen(false)}
  />

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

    <div className="px-3 sm:px-4 py-4">

      <h1 className="mb-3 text-xs font-semibold text-gray-900 dark:text-gray-100">
        Projects
      </h1>

      {/* Projects table */}
      <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-200">

        {/* Table Header */}
        <div className="grid grid-cols-4 bg-gray-50 dark:bg-gray-800/50 px-3 py-2 text-[10px] font-medium text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
          <span>Projects</span>
          <span>Priority</span>
          <span>Lead</span>
          <span>Actions</span>
        </div>

        {/* Project Rows */}
        <ProjectRow
          title="Design Homepage"
          priority="High"
        />

        <ProjectRow
          title="Develop Login Feature"
          priority="Low"
        />

        <ProjectRow
          title="Test Payment Gateway"
          priority="Medium"
        />

        {/* Add Button */}
        <button
          type="button"
          onClick={() => setProjectModalOpen(true)}
          className="w-full border-t border-gray-200 dark:border-gray-800 px-3 py-2 text-left text-[10px] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 transition-colors cursor-pointer"
        >
          + Add Projects
        </button>

        {/* Add Project Form Modal */}
      <AddProjectModal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        onProjectAdded={fetchProjects}
      />

      </div>

    </div>

  </main>
</div>
  )
}

export default page
