import { createRoutesFromElements, RouterProvider, Route, createBrowserRouter } from 'react-router-dom'
import { RegisterPage } from './pages/RegisterPage'
import { LogInPage } from './pages/LoginPage'
import { QuizPage } from './pages/QuizPage';
import NotFoundPage from './pages/NotFoundPage';
import { ProtectedRoute } from './components/ProtectedRoute';


function App() {

   const router = createBrowserRouter(
      createRoutesFromElements(
         <Route errorElement={<NotFoundPage />}>
            <Route
               path='/'
               element={<div>Hello World, This is Home page</div>}
            />
            <Route 
               path='/login' 
               element={<LogInPage />} 
            />
            <Route 
               path='/register' 
               element={<RegisterPage />} 
            />
            <Route 
               path='/quiz' 
               element={
                  <ProtectedRoute>
                     <QuizPage />
                  </ProtectedRoute> 
               }
            > </Route>
         </Route>
      )
   );

   return (
      <>
         <RouterProvider router={router} />
      </>
   )
}

export default App
