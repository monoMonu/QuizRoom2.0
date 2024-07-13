import { useEffect } from "react";

export const Loader = ({text}) => {

   return (
      <section 
         className="loaderCover"
      >
         <div className="loader"></div>
         <p className="loaderText">
            {text || "Loading..."}
         </p>
      </section>
   )
}
