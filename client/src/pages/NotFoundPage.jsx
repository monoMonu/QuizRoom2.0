import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
   return (
      <div className="notFoundPage">
         <div className="container">
            <h1>404</h1>
            <p>Page Not Found</p>
            <Link to="/" className="homeButton">Go Home</Link>
         </div>
      </div>
   );
};

export default NotFoundPage;
