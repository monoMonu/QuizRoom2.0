import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext/useAuth';
import { Loader } from './Loader';

export const ProtectedRoute = ({ children }) => {
   const { isAuthenticated, isLoading } = useAuth();

   if (isLoading) {
      return <Loader text="Authenticating..." />;
   }

   return isAuthenticated ? children 
                          : <Navigate to="/login" replace />;
};
