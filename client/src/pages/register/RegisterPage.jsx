import React, { useState } from 'react'
import {Link, Navigate, redirect, useNavigate} from 'react-router-dom'
import styles from './register.module.css'
import { Loader } from '../../components/Loader';
import { useAuth } from '../../context/authContext/useAuth';


function RegisterPage(){

   const navigate = useNavigate();
   const [showPass, setShowPass] = useState(false);
   const { error, register, isLoading, isAuthenticated } = useAuth();
   const [data, setData] = useState({
      username: "",
      fullname: "",
      email: "",
      password: ""
   });

   const handleInputChange = (e) => {
      setData({
         ...data,
         [e.currentTarget.name]: e.currentTarget.value
      })
   }
  
   const handleSubmit = async (e) => {
      e.preventDefault();
      await register(data);
      navigate("/login")
   }

   if (isAuthenticated)
      return <Navigate to="/quiz" replace />;

   if (isLoading) 
      return <Loader />;

   return(
      <section className={`section ${styles.registerPage}`}>
         <h2 className={styles.gameTitle}>QuizRoom</h2>
         <div className={styles.container}>
            <h2>Sign Up</h2>
            <form className={styles.registrationForm} onSubmit={handleSubmit}>
      
               <div className={styles.inputBox}>
                  <label htmlFor="usernameField">Username:</label>
                  <input 
                     type="text" 
                     id="usernameField"
                     name="username"
                     onChange={handleInputChange} 
                     value={data.username} required 
                  /> 
               </div>
               
               <div className={styles.inputBox}>
                  <label htmlFor="fullnameField">Full Name:</label>
                  <input 
                     type="text" 
                     id="fullnameField"
                     name="fullname"
                     onChange={handleInputChange} 
                     value={data.fullname} required 
                  />
               </div>
      
               <div className={styles.inputBox}>
                  <label htmlFor="emailField">Email:</label>
                  <input 
                     type="email" 
                     id="emailField"
                     name="email" 
                     onChange={handleInputChange} 
                     value={data.email} required 
                  />
               </div>
      
               <div className={styles.inputBox}>
                  <label htmlFor="passwordField">Password:</label>
                  <input 
                     type={showPass ? "text" : "password"} 
                     id="passwordField"
                     name="password"
                     onChange={handleInputChange} 
                     value={data.password} required 
                  />
                  <i
                     className={`fas ${showPass ? "fa-eye" : "fa-eye-slash"}`}
                     onClick={() => setShowPass(!showPass)}
                     aria-label={showPass ? "Hide password" : "Show password"}
                  ></i>
               </div>

               <p className={styles.errorBox}>{error}</p>
      
               <button type="submit">Register</button>

            </form>

            <p className={styles.alreadyAccount}>
               Have already an account ? 
               <Link to="/login"> Login here</Link>
            </p>

         </div>
      </section>
   )
}

export { RegisterPage }