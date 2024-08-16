import React, { useState } from 'react';
import styles from './sideMenu.module.css';
import { useAuth } from '../../context/authContext/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useQuiz } from '../../context/quizContext/useQuiz';
import { useTheme } from '../../context/theme/useTheme';
import { toast } from 'react-toastify';


const SideMenu = ({open=false}) => {
   const navigate = useNavigate();
   const [ showThemes, setShowThemes ] = useState(0);
   const { mode, toggleMode, theme } = useTheme();
   const { user, isLoading, logout, clearError } = useAuth();
   const { highScore } = useQuiz();

   const handleLogout = async () => {
      const res = await logout();
      if(!(res.statusCode===200)){
         toast.error(res.message);
         clearError();
      } else {
         toast.success(res.message);
         navigate("/login");
      }
   }

   if (isLoading) 
      return <Loader text="Logging out..."/>;

   return (
      <div className={`${styles.sideMenu} ${open ? styles.openMenu : ""}`}>
         <button onClick={toggleMode} className={styles.themeBtn}>
            <i className={mode ? "fas fa-sun" : "fas fa-moon"}></i>
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
            <button 
               className={styles.navBtn} onClick={() => setShowThemes(!showThemes)}
            > Themes </button>
            {showThemes ? <ThemePalatte /> : "" }
            <Link to="/login" replace>
               <button className={styles.navBtn} onClick={handleLogout}>Log Out</button>
            </Link>
         </nav>
         <p className={styles.copyRight}>
            &copy; {new Date().getFullYear()}, QuizRoom. All Rights Reserved.
         </p>
      </div>
   );
};


// Theme palatte
const ThemePalatte = () => {

   const { theme, setNewTheme } = useTheme();

   return (
      <div className={`${styles.themePalatte} ${styles.currentTheme}`}>
         <h3>Select Theme</h3>
         <div className={styles.themeBox}>
            {Array(4).fill(0).map((el, i) => (
               <button
                  key={i}
                  onClick={() => setNewTheme(i+1)}
                  className={`${styles.themeOption} ${theme==i+1 ? styles.selected : ""} ${styles[`theme-${i+1}`]}`}
               > </button>
            ))}
         </div>
      </div>
   );
}


export default SideMenu;
