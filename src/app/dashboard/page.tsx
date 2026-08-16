"use client";

import { useState,useMemo } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import TaskHeader from "@/components/tasks/TaskHeader";
import TaskBoard from "@/components/tasks/TaskBoard";
import TaskList from "@/components/tasks/TaskList";
import { taskColumns } from "@/data/tasks";


type ViewMode = "list" | "board";

function page() {
   // Search state
  const [searchQuery, setSearchQuery] = useState("");
  // Mobile sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Board / List state
  const [viewMode, setViewMode] = useState<ViewMode>("board");

   // Filter tasks based on search
    const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

     // If search box is empty,
    // return all tasks
    if (!query) {
      return taskColumns;
    } 

    return taskColumns.filter((task)=> task.title.toLowerCase().includes(query));

  }, [searchQuery]);


  return (
   <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <main className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
        />
        {/* Header */}
        <TaskHeader 
         onMenuClick={() => setSidebarOpen(true)}
         viewMode={viewMode}
          onViewChange={setViewMode}
           searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

         {/* Content */}
        {viewMode === "list" ? (
          <TaskList taskColumns={filteredTasks}/>
        ) : (
          <div className="min-h-0 flex-1 px-3 sm:px-4">
            <TaskBoard taskColumns={filteredTasks}/>
          </div>
        )}
      </main>
    </div>
  )
}

export default page
