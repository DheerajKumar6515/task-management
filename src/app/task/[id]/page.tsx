"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

import TaskDetailsHeader from "@/components/tasks/TaskDetails/TaskDetailsHeader";
import TaskProperties from "@/components/tasks/TaskDetails/TaskProperties";
import TaskLabels from "@/components/tasks/TaskDetails/TaskLabels";
import TaskResources from "@/components/tasks/TaskDetails/TaskResources";
import SubtaskTable from "@/components/tasks/TaskDetails/SubtaskTable";
import DetailsPanel from "@/components/tasks/TaskDetails/DetailsPanel";
import CommentSection from "@/components/tasks/TaskDetails/CommentSection";
import ActivityUpdates from "@/components/tasks/TaskDetails/ActivityUpdates";
import type { Task, TaskColumn } from "@/types/task";
import SubTaskModal from "@/components/tasks/taskModel/SubTaskModal";


function page() {
  const backendUrl = process.env.NEXT_PUBLIC_baCKEND_URL;
  const params = useParams();
  const taskId = params.id as string;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [task, setTask] = useState<Task | null>(null);
  
 
  const fetchTaskById = async () => {
    try {
      const response = await fetch(`${backendUrl}/tasks/${taskId}`);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Task not found`);
      }

      const data = await response.json();
      //console.log(data)
      setTask(data);
    } catch (err: any) {
      setTask(null);
      console.log(err.message || "Failed to fetch task");
    }
  };

  useEffect(() => {
    if (!taskId) return;
    fetchTaskById();
  }, [taskId]);

  // Agar task nahi mila
  if (!task) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-sm text-gray-500">Task not found</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Existing Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main */}
      <main className="flex min-w-0 flex-1 flex-col bg-white dark:bg-gray-950">
        {/* Existing Topbar */}
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Scrollable content */}
        <div className="min-h-0 flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl px-4 py-5 lg:px-6">
            {/* Task title + description */}
            <TaskDetailsHeader
              title={task.title}
              description={task.description}
            />

            {/* Main + Right panel */}
            <div className="mt-5 flex flex-col gap-6 lg:flex-row">
              {/* =====================
              LEFT / MAIN CONTENT
          ====================== */}
              <div className="min-w-0 flex-1 space-y-4">
                <TaskProperties
                  assignee={task.assignee}
                  dueDate={task.dueDate}
                />

                <TaskLabels labels={task?.tags} />

                <TaskResources />

                <SubtaskTable subtasks={task.subtasks ?? []} Taskid={task.id}/>

                <CommentSection />
              </div>

              {/* =====================
              RIGHT CONTENT
          ====================== */}
              <div className="w-full lg:w-56 space-y-4">
                <DetailsPanel priority={task.priority} />

                <ActivityUpdates />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default page;
