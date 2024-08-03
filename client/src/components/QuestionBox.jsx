import React from "react"
import { decodeHTMLEntities } from "../utils/helperFunctions"
import { useQuiz } from "../context/quizContext/useQuiz";


export const QuestionBox = ({ }) => {

   const { questions, options, timeRemaining, answers, answerQuestion, currQuesInd } = useQuiz();

   return (
      <div className="ques_box">
         <div className="timer">
            <span id="time">{timeRemaining[currQuesInd]}</span>
            <b>SEC</b>
         </div>
         <p id="ques"> 
            {decodeHTMLEntities(questions[currQuesInd].question)}
         </p>
         <div className="option_box vt_box">
            {options.map((el, ind) =>
               <button
                  key={ind} type="button" 
                  onClick={() => {
                     const toggle = answers[currQuesInd]===decodeHTMLEntities(options[ind]);
                     answerQuestion(toggle ? null : decodeHTMLEntities(options[ind]));
                  }}
                  className={`option ${answers[currQuesInd]===decodeHTMLEntities(options[ind]) ? 'selected' : ''}`}
               >
                  {decodeHTMLEntities(options[ind])}
               </button>
            )}
         </div>
      </div>
   )
}