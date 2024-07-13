import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null);

// auth Provider
export const AuthProvider = ({children}) => {

   const [user, setUser] = useState(true);
   
   const updateUser = (user) => {
      setUser(user);
   }
   
   const removeUser = () => {
      setUser(null);
   }

   return (
      <AuthContext.Provider value={{user, updateUser, removeUser}}>
         {children}
      </AuthContext.Provider>
   )
}

// useAuth
export const useAuth = () => useContext(AuthContext);