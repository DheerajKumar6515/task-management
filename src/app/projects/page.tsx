"use client";
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import TaskHeader from "@/components/tasks/TaskHeader";
import { SidebarClose } from "lucide-react";
import ProjectRow from "@/components/projects/ProjectRow";


type ViewMode = "list" | "board";

function page() {
       // Search state
      const [searchQuery, setSearchQuery] = useState("");
      // Mobile sidebar state
      const [sidebarOpen, setSidebarOpen] = useState(false);
      // Board / List state
      const [viewMode, setViewMode] = useState<ViewMode>("board");

  return (
    <div className="flex h-screen overflow-hidden bg-white">

      <Sidebar 
        open={sidebarOpen}
        onClose={()=>setSidebarOpen(false)}
      />

      <main className="flex min-w-0 flex-1 flex-col">

        <Topbar onMenuClick={() => setSidebarOpen(true)}/>

        <TaskHeader 
          onMenuClick={() => setSidebarOpen(true)}
         viewMode={viewMode}
          onViewChange={setViewMode}
           searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="px-3 sm:px-4">

          <h1 className="mb-3 text-xs font-semibold">
            Projects
          </h1>

          {/* Projects table */}
          <div className="overflow-hidden rounded-md border border-gray-200">

            <div className="grid grid-cols-4 bg-gray-50 px-3 py-2 text-[10px] font-medium">
              <span>Projects</span>
              <span>Priority</span>
              <span>Lead</span>
              <span>Actions</span>
            </div>

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

            <button
              type="button"
              className="px-3 py-2 text-[10px]"
            >
              + Add Projects
            </button>

          </div>

        </div>

      </main>
    </div>
  )
}

export default page
