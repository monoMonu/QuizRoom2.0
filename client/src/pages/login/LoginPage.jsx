import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import styles from './login.module.css'
import { Loader } from '../../components/Loader';
import { useAuth } from '../../context/authContext/useAuth';
import { toast } from 'react-toastify';


function LogInPage (){
   
   const [showPass, setShowPass] = useState(false);
   const { login, isLoading, isAuthenticated, clearError } = useAuth();
   const [data, setData] = useState({
      emailORusername: "",
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
      const res = await login(data);
      if(!(res.statusCode===200)){
         toast.error(res.message);
         clearError();
      } else {   
         toast.success(res.message);
      }
   }

   if (isAuthenticated)
      return <Navigate to="/quiz" replace />;

   if (isLoading) 
      return <Loader />;

   return (
      <section className={styles.loginPage}>

         <h2 className={styles.gameTitle}>QuizRoom</h2>
         <div className={styles.container}>

            <h2>Log In</h2>

            <form className={styles.loginForm} onSubmit={(e) => handleSubmit(e)}>
               <div className={styles.inputBox}>
                  <label htmlFor="emailORusername">Username or Email:</label>
                  <input 
                     name="emailORusername"
                     type="text"
                     onChange={ handleInputChange } 
                     value={data.emailORusername} required 
                  />
               </div>

               <div className={styles.inputBox}>
                  <label htmlFor="password">Password:</label>
                  <input 
                     name="password"
                     type={showPass ? "text" : "password"}
                     onChange={ handleInputChange } 
                     value={data.password} required 
                  />
                  <i
                     className={`fas ${showPass ? "fa-eye" : "fa-eye-slash"}`}
                     onClick={() => setShowPass(!showPass)}
                     aria-label={showPass ? "Hide password" : "Show password"}
                  ></i>
               </div>

               {/* <p className={styles.errorBox}>{error}</p> */}

               <button 
                  type="submit"
               > Log In </button>

            </form>

            <p className={styles.alreadyAccount}>Don't have an account ? 
               <Link to="/register"> Register here</Link>
            </p>

         </div>

      </section>
   )
}


export {LogInPage}