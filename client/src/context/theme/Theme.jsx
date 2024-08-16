import React, { createContext, useEffect } from "react";
import { usePersistState } from "../../utils/hooks";
import { ToastContainer } from "react-toastify";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {

   const [mode, setMode] = usePersistState(0, "modeState"); // 0 = dark, 1 = light
   const [theme, setTheme] = usePersistState(1, "themeState");
   const setDarkMode = () => setMode(0);
   const setLightMode = () => setMode(1);
   const toggleMode = () => 
      mode ? setDarkMode() : setLightMode();
   const setNewTheme = (themeCode) => {
      setTheme(themeCode);
   }

   useEffect(() => {
      mode ? document.documentElement.className = `light-theme-${theme}`
            : document.documentElement.className = `dark-theme-${theme}`;
   }, [mode, theme])

   return (
      <ThemeContext.Provider value={{ mode, theme, setDarkMode, setLightMode, toggleMode, setNewTheme }} >
         <ToastContainer
            toastClassName="custom-toast"
            theme={mode}
         />
         {children}
      </ThemeContext.Provider>
   )
};