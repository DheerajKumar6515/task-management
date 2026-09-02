"use client";

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
    setColor:(newColor:Color)=>void;
    changeTheme:(newTheme:Theme)=>void;
    setUserDetails:(user:any)=>void;
}

const GlobalContext = createContext<ColorContextType | undefined>(undefined);

export function ColorProvider({children}:{children:React.ReactNode}){
    const [userDetails,setUserDetails]=useState<userProps | null>(null)
    const [color, setColorState] = useState<Color>("black");
    const [theme, setTheme] = useState<Theme>("light");

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

  return (
    <GlobalContext.Provider value={{ color,theme, setColor, changeTheme, userDetails,setUserDetails }}>
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