import { useQuiz } from "../context/quizContext/useQuiz";
import { decodeHTMLEntities } from "../utils/helperFunctions";


export const PreviewSheet = ({ onClose }) => {

   const { questions, answers } = useQuiz();

   const handleOutOfBoxClick = (e) => {
      if(e.currentTarget === e.target) {
         onClose();
      }
   }

   return (
      <section id="previewSheetWrapper" onClick={handleOutOfBoxClick}>
         <div id="previewSheet">
            <h1>Preview Sheet</h1>
            <div id="previews">
               {questions.map((el, ind) => (
                  <Preview 
                     key={ind}
                     num={ind+1} 
                     question={decodeHTMLEntities(el.question)} 
                     userAns={answers[ind]} 
                     correctAns={decodeHTMLEntities(el.correct_answer)} 
                  />
               ))}
            </div>
            <button 
               type="button" id="previewBack"
               onClick={ onClose }
            >CLOSE</button>
         </div>
      </section>
   )
}

export const Preview = ({ num, question, userAns, correctAns }) => {
   return (
      <div>
         <div className='ques'>{num}. {question}</div>
         <p> - { userAns } {num === 0 ? "(Your Answer)" : ""}</p>
         <p className="c_a"> - { correctAns } {num === 0 ? "(Correct Answer)" : ""}</p>
      </div>
   )
}
