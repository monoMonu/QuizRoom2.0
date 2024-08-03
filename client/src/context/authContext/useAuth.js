import { useContext } from 'react';
import { AuthContext } from './Auth';
import { loginUser, registerUser, logoutUser, updateUserDetails } from '../../actions/userAction';

export const useAuth = () => {
   const { state, dispatch } = useContext(AuthContext);

   const login = async (userData) => {
      try {
         dispatch({ type: 'LOADING', payload: 'Logging in...' });
         const data = await loginUser(userData);
         dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      } catch (error) {
         dispatch({ type: 'LOGIN_FAIL', payload: error.message });
      }
   };

   const register = async (userData) => {
      try {
         dispatch({ type: 'LOADING', payload: 'Registering user...' });
         const data = await registerUser(userData);
         dispatch({ type: 'REGISTER_SUCCESS', payload: data });
      } catch (error) {
         dispatch({ type: 'REGISTER_FAIL', payload: error.message });
      }
   };

   const logout = async () => {
      try {
         dispatch({ type: 'LOADING', payload: 'Logging out...' });
         const data = await logoutUser();
         dispatch({ type: 'LOGOUT' });
         return data.message;
      } catch (error) {
         dispatch({ type: 'LOGOUT_ERROR', payload: error.message });
      }
   };

   const updateUser = async (userData) => {
      try {
         dispatch({ type: 'LOADING', payload: 'Updating User Details...' });
         const data = await updateUserDetails(userData);
         dispatch({ type: 'UPDATE_USER_SUCCESS', payload: data })
      } catch (error) {
         dispatch({ type: 'ERROR', payload: error.message });
      }
   }

   const clearError = () => {
      dispatch({ type: 'CLEAR_ERROR' });
   };

   return {
      ...state,
      login,
      register,
      logout,
      clearError,
      updateUser
   };
};