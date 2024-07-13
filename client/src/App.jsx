import { createRoutesFromElements, RouterProvider, Route, createBrowserRouter } from 'react-router-dom'
import { RegisterPage } from './pages/register/RegisterPage'
import { LogInPage } from './pages/login/LoginPage'
import { QuizPage } from './pages/QuizPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { StartSec } from './pages/QuizPageSections/StartSec';
import { QuestionSec } from './pages/QuizPageSections/QuestionSec';
import { EditProfileForm } from './pages/QuizPageSections/EditProfileSec';


function App() {

   const router = createBrowserRouter(
      createRoutesFromElements(
         <Route errorElement={<NotFoundPage />}>
            <Route
               path='/'
               element={<div>Hello World, This is Home page</div> } // Landing page
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
            > 
                  <Route
                     path=''
                     element={<StartSec />}
                  />

                  <Route
                     path='play'
                     element={<QuestionSec />}
                  />

                  <Route
                     path='edit-profile'
                     element={ <EditProfileForm />}
                  />
            </Route>
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
