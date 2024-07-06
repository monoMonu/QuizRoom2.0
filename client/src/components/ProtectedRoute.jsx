import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth.jsx";

export const ProtectedRoute = ({children}) => {

   const { user } = useAuth();

   return ( user ? <>{children}</> 
                 : <Navigate to="/login" replace /> );

}