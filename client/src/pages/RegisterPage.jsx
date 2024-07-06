import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './styles/register.css'


function RegisterPage(){

   const [data, setData] = useState({
      username: "",
      fullname: "",
      email: "",
      password: ""
   });

   return(
      <section className="section registerPage">
         <h2 className="gameTitle">QuizTime</h2>
         <div className="container">
            <h2>Sign Up</h2>
            <form method="POST" className="registrationForm">
               <label htmlFor="usernameField">Username:</label>
               <input 
                  type="text" 
                  name="username"
                  className="usernameField" 
                  onChange={(e)=>setData({...data, username: e.currentTarget.value})} 
                  value={data.username} required 
               /> 
      
               <label htmlFor="fullnameField">Full Name:</label>
               <input 
                  type="text" 
                  name="fullname"
                  className="fullnameField" 
                  onChange={(e)=>setData({...data, fullname: e.currentTarget.value})} 
                  value={data.fullname} required 
               />
      
               <label htmlFor="emailField">Email:</label>
               <input 
                  type="email" 
                  name="email"
                  className="emailField" 
                  onChange={(e)=>setData({...data, email: e.currentTarget.value})} 
                  value={data.email} required 
               />
      
               <label htmlFor="passwordField">Password:</label>
               <input 
                  type="password" 
                  name="password"
                  className="passwordField" 
                  onChange={(e)=>setData({...data, password: e.currentTarget.value})} 
                  value={data.password} required 
               />
      
               <button className="btn1 submit" type="submit">Register</button>

            </form>

            <p className="alreadyAccount">Have already an account ? 
               <Link to="/login">Login here</Link>
            </p>

         </div>
      </section>
   )
}

export { RegisterPage }