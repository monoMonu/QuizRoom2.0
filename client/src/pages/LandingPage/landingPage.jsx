import React from 'react';
import { Link } from 'react-router-dom';
import styles from './landingPage.module.css'; 

const LandingPage = () => {
   return (
      <section className={styles.landingPageWrap}>
         <header className={styles.header}>
            <h1>Welcome to QuizRoom</h1>
            <p>Your ultimate destination for quiz enthusiasts! Challenge your knowledge and compete with others.</p>
            <Link to="/quiz" className={styles.ctaButton}>
               Get Started
            </Link>
         </header>
      </section>
   );
};

export default LandingPage;
