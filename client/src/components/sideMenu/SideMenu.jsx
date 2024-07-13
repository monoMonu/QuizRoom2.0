import React from 'react';
import styles from './sideMenu.module.css';
import { useAuth } from '../../context/Auth';
import { Link } from 'react-router-dom';


const SideMenu = () => {

   const { user } = useAuth();

   return (
      <div className={styles.sideMenu}>
         <div className={styles.profileSection}>
            <img src={user.avatar} alt="User Profile Picture" className={styles.profilePic} />
            <div className={styles.profileInfo}>
               <h2 className={styles.fullname}>{user.fullname}</h2>
               <p className={styles.username}>{user.username}</p>
               <p className={styles.email}>{user.email}</p>
               <p className={styles.highScore}>
                  High Score: <span>15</span>
               </p>
            </div>
         </div>
         <nav className={styles.navButtons}>
            <Link to="/quiz/edit-profile">
               <button className={styles.navBtn}>Update Profile</button>
            </Link>
            <Link to="/quiz/leaderboard">
               <button className={styles.navBtn}>Leaderboard</button>
            </Link>
            <button className={styles.navBtn}>Logout</button>
         </nav>
         <p className={styles.copyRight}>
            &copy; {new Date().getFullYear()}, QuizRoom. All Rights Reserved.
         </p>
      </div>
   );
};


export default SideMenu;
