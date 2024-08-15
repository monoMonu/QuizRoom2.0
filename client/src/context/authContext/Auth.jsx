import React, { createContext, useReducer, useEffect } from 'react';
import { getUserDetails } from '../../actions/userAction';
import authReducer from '../../reducers/authReducer';

const initialState = {
   user: null,
   isAuthenticated: false,
   isLoading: true,
   loaderText: 'Loading data...',
   error: null,
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [state, dispatch] = useReducer(authReducer, initialState);

   useEffect(() => {
      const loadUser = async () => {
         try {
            dispatch({ type: 'LOADING' });
            const userData = await getUserDetails();
            dispatch({ type: 'LOGIN_SUCCESS', payload: userData.data });
         } catch (error) {
            dispatch({ type: 'AUTH_ERROR' });
         }
      };

      loadUser();
   }, []);

   return (
      <AuthContext.Provider value={{ state , dispatch }}>
         {children}
      </AuthContext.Provider>
   );
};
