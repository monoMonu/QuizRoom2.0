import { useEffect } from "react";
import { useAuth } from "../context/authContext/useAuth";

export const Loader = ({text}) => {

   const { loaderText } = useAuth();

   return (
      <section 
         className="loaderCover"
      >
         <div className="loader"></div>
         <p className="loaderText">
            {text || loaderText}
         </p>
      </section>
   )
}
