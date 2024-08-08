import React, { useContext } from "react";
import { ThemeContext } from "./Theme";

export const useTheme = () => {
   const states = useContext(ThemeContext);

   return {
      ...states
   }
}