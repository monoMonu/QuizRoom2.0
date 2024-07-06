import { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/login.css'


function LogInPage (){

   const [data, setData] = useState({
      emailORusername: '',
      password: ''
   });

   return (
      <section className='loginPage'>

         <h2 className="gameTitle">QuizTime</h2>
         <div className="container">

            <h2>Log In</h2>

            <form className="loginForm">

               <label htmlFor="emailORusername">Username or Email:</label>
               <input 
                  type="text" 
                  className="emailORusername" 
                  onChange={(e)=>setData({...data, emailORusername: e.currentTarget.value})} 
                  value={data.emailORusername} required 
               />

               <label htmlFor="password">Password:</label>
               <input 
                  type="password" 
                  className="password"  
                  onChange={(e)=>setData({...data, password: e.currentTarget.value})} 
                  value={data.password} required 
               />

               <button className="btn1 submit" type="submit">Log In</button>

            </form>

            <p className="alreadyAccount">Don't have an account ? 
               <Link to="/register">Register here</Link>
            </p>

         </div>

      </section>
   )
}


export {LogInPage}