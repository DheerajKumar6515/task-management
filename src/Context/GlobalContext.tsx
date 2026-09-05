"use client";

import { Task, TaskColumn } from "@/types/task";
import { promises } from "dns";
import React, { createContext, useContext, useState, useEffect } from "react";

export type Color = "amber" | "blue" | "pink" | "rose" | "emerald" | "black";
type Theme = "light" | "dark";

export interface userProps{
  userId:string;
  googleName:string;
  googleAvatar:string;
  email:string;
}

interface ColorContextType{
    color:Color;
    theme:Theme;
    userDetails:userProps | null;
    taskColumns:TaskColumn[];
    task:Task | null;
    setColor:(newColor:Color)=>void;
    changeTheme:(newTheme:Theme)=>void;
    setUserDetails:(user:any)=>void;
    fetchTask:()=>Promise<void>
    fetchTaskById:(taskId:string)=>Promise<void>
}

const GlobalContext = createContext<ColorContextType | undefined>(undefined);

export function ColorProvider({children}:{children:React.ReactNode}){
    const [userDetails,setUserDetails]=useState<userProps | null>(null)
    const [color, setColorState] = useState<Color>("black");
    const [theme, setTheme] = useState<Theme>("light");
     const [taskColumns,setTaskColumns]=useState<TaskColumn[]>([])
     //store taskBy Id data
     const [task, setTask] = useState<Task | null>(null);

  // Mount hone par localStorage se sync karein
  useEffect(() => {
    const savedColor = localStorage.getItem("color") as Color | null;
    if (savedColor) {
      setColorState(savedColor);
      document.documentElement.setAttribute("color-theme", savedColor.toLowerCase());
    }

    //for theme
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if(savedTheme){
      const currentTheme: Theme =
      savedTheme === "dark" ? "dark" : "light";
      setTheme(currentTheme);

     document.documentElement.classList.toggle("dark",currentTheme === "dark");
    }
    
  }, []);

  //for color
   const setColor = (newColor: Color) => {
    setColorState(newColor);
    localStorage.setItem("color", newColor);
    document.documentElement.setAttribute("color-theme", newColor.toLowerCase());
  };

  //for theme
    const changeTheme = (newTheme: Theme) => {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark",newTheme === "dark");
    };

  //Fetching tasks
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

  //fetch task by Id
  const fetchTaskById = async (taskId:string) => {
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



  return (
    <GlobalContext.Provider 
    value={{ 
      color,theme,
      task,
      fetchTaskById,
      fetchTask,
      taskColumns, 
      setColor, 
      changeTheme, 
      userDetails,
      setUserDetails }}>
      {children}
    </GlobalContext.Provider>
  );

}

//Custom Hook
export function useContextData(){
    const context=useContext(GlobalContext);
    if(!context){
        throw new Error("useColor must be used within a ColoProvider.")
    }

    return context;
}