import React from "react";
import styles from "./notFoundPage.module.css";
import { Link } from "react-router-dom";
import notFoundSvg from "../../assets/notFound.svg";


const NotFoundPage = () => {
   return (
      <div className={styles.notFoundPage}>
         <div className={styles.container}>
            <img src={notFoundSvg} alt="Not Found Page" />
            <p>Page Not Found</p>
            <Link 
               to="/" className={styles.homeButton}
            > Go Home </Link>
         </div>
      </div>
   );
};

export default NotFoundPage;
