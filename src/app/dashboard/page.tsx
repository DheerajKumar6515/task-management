"use client";

import { useState,useMemo, useEffect } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import TaskHeader from "@/components/tasks/TaskHeader";
import TaskBoard from "@/components/tasks/TaskBoard";
import TaskList from "@/components/tasks/TaskList";
import type {TaskColumn} from '@/types/task'
import AddColumnModal from "@/components/tasks/taskModel/AddColumnModal";
import { createClient } from "@/lib/supabaseClient";



type ViewMode = "list" | "board";

function page() {
  const supabase=createClient();
   // Search state
  const [searchQuery, setSearchQuery] = useState("");
  // Mobile sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Board / List state
  const [viewMode, setViewMode] = useState<ViewMode>("board");
  //Arraydata
  const [taskColumns,setTaskColumns]=useState<TaskColumn[]>([])
  //add column for task
  const [isModalOpen, setIsModalOpen] = useState(false);
  //fix hydration error
  const [hasHydrated,setHashydrated]=useState(false)

   // Filter tasks based on search
    const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

     // If search box is empty,
    // return all tasks
    if (!query) {
      return taskColumns;
    } 

    return taskColumns.filter((task)=> task.title.toLowerCase().includes(query));

  }, [searchQuery,taskColumns]);

  const backendUrl=process.env.NEXT_PUBLIC_baCKEND_URL;
   const fetchTask = async () => {
      try {
      
        const response = await fetch(`${backendUrl}/tasks`);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Task not found`);
        }

        const data = await response.json();
        setTaskColumns(data);
      } catch (err: any) {
        console.log(err.message || 'Failed to fetch task');
      } 
    };

    useEffect(()=>{
       fetchTask();
       setHashydrated(true)
       //Realtime data
      //  const channel=supabase.channel('realtime-tasks').on('postgres_changes',{
      //   event:"*",
      //   schema:'public',
      //   table:"tasks"
      //  },(payload)=>{
         
      //    //Insert task data
      //     if(payload.eventType === 'INSERT'){
      //       const newTask = payload.new as TaskColumn;
      //       setTaskColumns((prev) =>[newTask, ...prev]);
      //     }

      //     //Update status/Data 
      //     if(payload.eventType === 'UPDATE'){
      //       const updateTask = payload.new as TaskColumn;
      //       setTaskColumns((prev)=>prev.map((task)=>(task.id === updateTask.id ? updateTask : task)))
      //     }

      //     //Deleted Task
      //     if(payload.eventType === 'DELETE'){
      //       const deletedId = payload.old.id;
      //       setTaskColumns((prev)=>prev.filter((task)=> task.id !== deletedId))
      //     }

      //  }
      // )
      //Cleanup component unmount
      // return ()=>{
      //   supabase.removeChannel(channel)
      // };

    },[])

    if(!hasHydrated) return null


  return (
   <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <main className="flex min-w-0 flex-1 flex-col bg-gray-50 dark:bg-gray-900">
    {/* Topbar */}
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
          onOpenModal={() => setIsModalOpen(true)}
        />

        <AddColumnModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchTask}
      />

         {/* Content */}
        {viewMode === "list" ? (
          <TaskList
           taskColumns={filteredTasks}
           />
        ) : (
          <div className="min-h-0 flex-1 px-3 sm:px-4 bg-gray-50 dark:bg-gray-900">
            <TaskBoard taskColumns={filteredTasks}/>
          </div>
        )}
      </main>
    </div>
  )
}

export default page
