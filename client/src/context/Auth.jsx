import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null);

// auth Provider
export const AuthProvider = ({children}) => {

   const [user, setUser] = useState({name: "Monu"});
   
   const login = (user) => {
      setUser(user);
   }
   
   const logout = () => {
      setUser(null);
   }

   return (
      <AuthContext.Provider value={{user, login, logout}}>
         {children}
      </AuthContext.Provider>
   )
}

// useAuth
export const useAuth = () => useContext(AuthContext);