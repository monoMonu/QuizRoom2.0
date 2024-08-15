import { createRoutesFromElements, RouterProvider, Route, createBrowserRouter } from 'react-router-dom'
import { RegisterPage } from './pages/register/RegisterPage'
import { LogInPage } from './pages/login/LoginPage'
import { QuizPage } from './pages/Quiz/QuizPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { StartSec } from './pages/Quiz/StartSec';
import { QuestionSec } from './pages/Quiz/QuestionSec';
import { EditProfileForm } from './pages/Quiz/EditProfileSec';
import { ResultSec } from './pages/Quiz/ResultSec';
import { Leaderboard } from './pages/Quiz/Leaderboard';
import LandingPage from './pages/LandingPage/landingPage';


function App() {

   const router = createBrowserRouter(
      createRoutesFromElements(
         <Route errorElement={<NotFoundPage />}>
            <Route
               path='/'
               element={<LandingPage />}
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
                     path='result'
                     element={<ResultSec />}
                  />

                  <Route
                     path='edit-profile'
                     element={ <EditProfileForm /> }
                  />

                  <Route
                     path='leaderboard'
                     element={ <Leaderboard /> }
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
