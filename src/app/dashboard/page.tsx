"use client";

import { useState, useMemo, useEffect,Suspense } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import TaskHeader from "@/components/tasks/TaskHeader";
import TaskBoard from "@/components/tasks/TaskBoard";
import TaskList from "@/components/tasks/TaskList";
import AddColumnModal from "@/components/tasks/taskModel/AddColumnModal";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useContextData } from "@/Context/GlobalContext";

type ViewMode = "list" | "board";

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { fetchTask, taskColumns } = useContextData();
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  // Mobile sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Board / List state
  const [viewMode, setViewMode] = useState<ViewMode>("board");
  //add column for task
  const [isModalOpen, setIsModalOpen] = useState(false);
  //fix hydration error
  const [hasHydrated, setHashydrated] = useState(false);

  // Filter tasks based on search
  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    // If search box is empty,
    // return all tasks
    if (!query) {
      return taskColumns;
    }

    return taskColumns.filter((task) =>
      task.title.toLowerCase().includes(query),
    );
  }, [searchQuery, taskColumns]);

  useEffect(() => {
    fetchTask();
    setHashydrated(true);
  }, []);

  useEffect(() => {
    if (searchParams.get("login") === "success") {
      toast.success("Successfully logged in with Google! 🎉");

      // Clean URL
      const newUrl = window.location.pathname;
      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams, router]);

  if (!hasHydrated) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen((prev) => !prev)}
      />

      {/* Main */}
      <main className="flex min-w-0 flex-1 flex-col bg-gray-50 dark:bg-gray-900">
        {/* Topbar */}
        {/* Topbar */}
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        {/* Header */}
        <TaskHeader
          onMenuClick={() => setSidebarOpen(true)}
          viewMode={viewMode}
          onViewChange={setViewMode}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenModal={() => setIsModalOpen(true)}
        />

        <AddColumnModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchTask}
        />

        {/* Content */}
        {viewMode === "list" ? (
          <TaskList taskColumns={filteredTasks} />
        ) : (
          <div className="min-h-0 flex-1 px-3 sm:px-4 bg-gray-50 dark:bg-gray-900">
            <TaskBoard taskColumns={filteredTasks} />
          </div>
        )}
      </main>
    </div>
  );
}

// Main Export Component jisme Suspense Boundary hai
export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          Loading dashboard...
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
