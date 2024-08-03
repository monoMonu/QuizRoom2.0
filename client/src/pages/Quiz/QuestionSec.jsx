import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Loader } from "../../components/Loader";
import { useQuiz } from "../../context/quizContext/useQuiz";
import { fetchQuizData, updatePlayNum } from "../../actions/quizAction";
import { QuestionBox } from "../../components/QuestionBox";


function QuestionSec() {

   const navigate = useNavigate();
   const { options, currQuesInd, timeRemaining, nextQuestion, prevQuestion, finishQuiz, quizFinished} = useQuiz();
   const { questions, error, isLoading } = useQuizData();

   const currQues = questions[currQuesInd]?.question || null;

   const handleFinishQuiz = () => {
      finishQuiz();
      (async () => {
         if(!quizFinished)
            await updatePlayNum();
      })();  
      return navigate('/quiz/result', { replace: true });
   }

   useEffect(() => {
      if(error) {
         console.log(error); //Improve
         navigate(-1, { replace: true });
      }
   }, [error]);

   if (isLoading)
      return <Loader text="Fetching Questions..."/>;
   
   return (
      <section id="ques_pg">
         <div className="progress_box">
            <div className="quitNnum">
               <button 
                  type="button" id="quit"
                  onClick={() => {
                     const res = confirm("Are sure you want to quit ?"); // can improve with custom propmt box
                     if (res) navigate('/quiz', { replace: true });
                  }}
               > QUIT </button>
               <span id="ques_num">
                  {currQuesInd+1}/{questions.length}
               </span>
            </div>
            <div className="progress_outer">
               <p className="progress_inner" style={{
                  width: `${100*(currQuesInd+1)/(questions.length)}%`
               }}></p>
            </div>
         </div>
         {currQues && <QuestionBox 
            question={currQues} 
            options={options} 
            timeLeft={timeRemaining}
         />}
         <div className="nextPrevBtnBox">
            <button
               type="button" className="btn2 prevBtn" onClick={prevQuestion}
               disabled={currQuesInd===0 ? true : false} style={{opacity: currQuesInd===0 ? .6 : 1 }}
            > PREV </button>

            {
               currQuesInd===questions?.length-1 ? 
                  <button
                     type="button" className="btn2 nextBtn" onClick={handleFinishQuiz}
                  > FINISH </button>
                  : 
                  <button
                     type="button" className="btn2 nextBtn" onClick={nextQuestion}
                  > NEXT </button>
            }
         </div>
      </section>
   )
}


// custom hook to fetch quiz data
const useQuizData = () => {

   const [error, setError] = useState();
   const [isLoading, setIsLoading] = useState(true);
   const { setQuestions, questions, quizStarted, selections, startQuiz } = useQuiz();
   const { amount, category, difficulty } = selections;
   const questionsRef = useRef(false);

   useEffect(() => {
      if(questionsRef.current) return;

      questionsRef.current = true;
      const fetch = async () => {
         try {
            const questions = await fetchQuizData( amount, category, difficulty );
            if (!(questions.length > 0)) 
               setError("Couldn't fetch questions. Please retry and if the problem persists, try to change the quiz options as the questions might not be available for the selected combination");
            
            setQuestions(questions);
            startQuiz();
         } catch (error) {
            setError(`Error while fetching data. Error: ${error}`);
         } finally {
            setIsLoading(false);
         }
      }
      
      fetch();

   }, [quizStarted])

   return { questions, error, isLoading }
}


export { QuestionSec }