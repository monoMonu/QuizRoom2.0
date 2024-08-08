import React, { createContext, useEffect } from "react";
import { usePersistState } from "../../utils/hooks";
import { ToastContainer } from "react-toastify";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {

   const [theme, setTheme] = usePersistState(0, "themeState"); // 0 = dark, 1 = light
   const setDarkTheme = () => setTheme(0);
   const setLightTheme = () => setTheme(1);
   const toggleTheme = () => 
      theme ? setDarkTheme() : setLightTheme();

   useEffect(() => {
      theme ? document.documentElement.className = "light-theme"
            : document.documentElement.className = "dark-theme";
   }, [theme])

   return (
      <ThemeContext.Provider value={{ theme, setDarkTheme, setLightTheme, toggleTheme }} >
         <ToastContainer
            toastClassName="custom-toast"
            theme={theme}
         />
         {children}
      </ThemeContext.Provider>
   )
};