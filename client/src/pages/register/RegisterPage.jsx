import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styles from './register.module.css'
import { registerUser } from '../../actions/userAction';
import { Loader } from '../../components/Loader';


function RegisterPage(){

   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");
   const [showPass, setShowPass] = useState(false);

   const [data, setData] = useState({
      username: "",
      fullname: "",
      email: "",
      password: ""
   });

  
   const register = async (e) => {
      e.preventDefault();
      try {
         setError("");
         setIsLoading(true);
         const res = await registerUser(data);
         navigate("/login");
      } catch (error) {
         console.log(error);
         setError(error.message);
      } finally {
         setIsLoading(false);
      }
   }

   useEffect(() => {
      setData({
         username: "",
         fullname: "",
         email: "",
         password: ""
      })
   }, [navigate])

   return(
      isLoading ? <Loader text="Registering..." /> :
      <section className={`section ${styles.registerPage}`}>
         <h2 className={styles.gameTitle}>QuizRoom</h2>
         <div className={styles.container}>
            <h2>Sign Up</h2>
            <form className={styles.registrationForm} onSubmit={(e) => register(e)}>
      
               <div className={styles.inputBox}>
                  <label htmlFor="usernameField">Username:</label>
                  <input 
                     type="text" 
                     name="username"
                     id="usernameField" 
                     onChange={(e)=>setData({...data, username: e.currentTarget.value})} 
                     value={data.username} required 
                  /> 
               </div>
               
               <div className={styles.inputBox}>
                  <label htmlFor="fullnameField">Full Name:</label>
                  <input 
                     type="text" 
                     name="fullname"
                     id="fullnameField" 
                     onChange={(e)=>setData({...data, fullname: e.currentTarget.value})} 
                     value={data.fullname} required 
                  />
               </div>
      
               <div className={styles.inputBox}>
                  <label htmlFor="emailField">Email:</label>
                  <input 
                     type="email" 
                     name="email"
                     id="emailField" 
                     onChange={(e)=>setData({...data, email: e.currentTarget.value})} 
                     value={data.email} required 
                  />
               </div>
      
               <div className={styles.inputBox}>
                  <label htmlFor="passwordField">Password:</label>
                  <input 
                     type={showPass ? "text" : "password"}  
                     name="password"
                     id="passwordField" 
                     onChange={(e)=>setData({...data, password: e.currentTarget.value})} 
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