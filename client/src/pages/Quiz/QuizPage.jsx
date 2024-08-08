import { Outlet } from "react-router-dom"
import { QuizProvider } from "../../context/quizContext/Quiz"
import { Music } from "../../components/Music"


function QuizPage(){

   return (
      <QuizProvider>
         <Music />
         <Outlet />
      </QuizProvider>
   )
}


export { QuizPage }