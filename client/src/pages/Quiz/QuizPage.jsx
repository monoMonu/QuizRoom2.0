import { Outlet } from "react-router-dom"
import { QuizProvider } from "../../context/quizContext/Quiz"


function QuizPage(){
   return (
      <QuizProvider>
         <Outlet />
      </QuizProvider>
   )
}


export { QuizPage }