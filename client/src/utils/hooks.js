import { useEffect, useState } from "react";

// To store in local storage for state management on refresh
export const usePersistState = (passedState, uniqueId) => {

   const getInitialState = () => {
      const existingState = localStorage.getItem(uniqueId);
      if(existingState) 
         return JSON.parse(existingState);
      return passedState;
   }

   const initialState = getInitialState();

   const [state, setState] = useState(initialState);

   useEffect(() => {
      const newState = JSON.stringify(state);
      localStorage.setItem(uniqueId, newState);
   }, [state])

   return [ state, setState ];

}
