import React from 'react';
import styles from './sideMenu.module.css';
import { useAuth } from '../../context/authContext/useAuth';
import { Link } from 'react-router-dom';
import { useQuiz } from '../../context/quizContext/useQuiz';
import { useTheme } from '../../context/theme/useTheme';


const SideMenu = ({open=false}) => {
   const { theme, toggleTheme } = useTheme();
   const { user, isLoading, logout, error } = useAuth();
   const { highScore } = useQuiz();

   if (error) alert("Error while logging out");

   if (isLoading) 
      return <Loader text="Logging out..."/>;

   return (
      <div className={`${styles.sideMenu} ${open ? styles.openMenu : ""}`}>
         <button onClick={toggleTheme} className={styles.themeBtn}>
            <i className={theme ? "fas fa-sun" : "fas fa-moon"}></i>
         </button>
         <div className={styles.profileSection}>
            <img src={user.avatar} alt="User Profile Picture" className={styles.profilePic} />
            <div className={styles.profileInfo}>
               <h2 className={styles.fullname}>{user.fullname}</h2>
               <p className={styles.username}>{user.username}</p>
               <p className={styles.email}>{user.email}</p>
               <p className={styles.highScore}>
                  High Score: <span>{highScore}</span>
               </p>
            </div>
         </div>
         <nav className={styles.navButtons}>
            <Link to="/quiz/edit-profile">
               <button className={styles.navBtn}>Update Profile</button>
            </Link>
            <Link to="/quiz/leaderboard?page=1&limit=10">
               <button className={styles.navBtn}>Leaderboard</button>
            </Link>
            <Link to="/login" replace>
               <button className={styles.navBtn} onClick={logout}>Log Out</button>
            </Link>
         </nav>
         <p className={styles.copyRight}>
            &copy; {new Date().getFullYear()}, QuizRoom. All Rights Reserved.
         </p>
      </div>
   );
};


export default SideMenu;
