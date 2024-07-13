import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.css'
import { loginUser } from '../../actions/userAction';
import { useAuth } from '../../context/Auth';
import { Loader } from '../../components/Loader';


function LogInPage (){

   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");
   const { updateUser } = useAuth();
   const [showPass, setShowPass] = useState(false);
   
   const [data, setData] = useState({
      emailORusername: "",
      password: ""
   });
   
   const login = async (e) => {
      e.preventDefault(); 
      try {
         setError("");
         setIsLoading(true);
         const res = await loginUser(data);
         updateUser(res);
         navigate("/quiz", { replace: true });
      } catch (error) {
         console.error(error);
         setError(error.message);
      } finally {
         setIsLoading(false);
      }
   }

   useEffect(() => {
      setData({
         emailORusername: "",
         password: ""
      })
      setError("");
   }, [navigate])

   return (
      isLoading ? <Loader text="Logging in..."/> :
      <section className={styles.loginPage}>

         <h2 className={styles.gameTitle}>QuizRoom</h2>
         <div className={styles.container}>

            <h2>Log In</h2>

            <form className={styles.loginForm} onSubmit={(e) => login(e)}>
               <div className={styles.inputBox}>
                  <label htmlFor="emailORusername">Username or Email:</label>
                  <input 
                     name="emailORusername"
                     type="text" 
                     id="emailORusername" 
                     onChange={(e)=>setData({...data, emailORusername: e.currentTarget.value})} 
                     value={data.emailORusername} required 
                  />
               </div>

               <div className={styles.inputBox}>
                  <label htmlFor="password">Password:</label>
                  <input 
                     name="password"
                     type={showPass ? "text" : "password"} 
                     id="password"  
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