import { useState } from 'react'
import { createRoutesFromElements, RouterProvider, Route, createBrowserRouter } from 'react-router-dom'
import { RegisterPage } from './pages/RegisterPage'
import { LogInPage } from './pages/LoginPage'
import { QuizPage } from './pages/QuizPage';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<>OOOOOPps!</>}>
      <Route path='/' element={<div>Hello World</div>} />
      <Route path='/login' element={<LogInPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/quiz' element={<QuizPage />}>
        
      </Route>
    </Route>
  )
);


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
