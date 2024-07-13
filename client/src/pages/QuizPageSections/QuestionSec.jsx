import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useQuizData } from "../../context/Quiz"
import { decodeHTMLEntities, shuffleArray } from "../../utils/helperFunctions";
import { fetchQuizData } from "../../actions/quizAction";
import { Loader } from "../../components/Loader";

function QuestionSec() {

   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(true);
   const { selections, updateQuizData, quizData } = useQuizData();
   const [currQues, setCurrQues] = useState(null);
   const [options, setOptions] = useState([]);
   const { amount, category, difficulty } = selections;

   console.log(currQues)

   useEffect(() => {
      (async () => {
         try {
            const res = await fetchQuizData(amount, category, difficulty);
            console.log("Success")
            updateQuizData(res);
            console.log("Success2");
         } catch (error) {
            // Error Handling
            console.log(error)
            navigate("/quiz");
            alert("Error while fetching questions..");
         }
         finally {
            setIsLoading(false);
         }
      })();
      return () => {
         if(quizData) {
            setCurrQues(quizData[0]);

         }
      }
   }, [])

   useEffect(() => {
      if (currQues) {
         setOptions(
            shuffleArray([...currQues.incorrect_answers, currQues.correct_answer])
         );
      }
   }, [currQues]);

   useEffect(() => {
      if(quizData){
         setCurrQues(quizData[0]);
      }
   }, [quizData])

   return (
      isLoading ? <Loader text="Fetching Questions..."/> :
      <section id="ques_pg">
         <div className="progress_box">
            {/* Quit Button is inside progress box div */}
            <div className="quitNnum">
               <button type="button" id="quit">QUIT</button>
               <span id="ques_num">5/20</span>
            </div>
            <div className="progress_outer">
               <p className="progress_inner"></p>
            </div>
         </div>
         <div className="ques_box">
            <div className="timer">
               <span id="time">5</span>
               <b>SEC</b>
            </div>
            <p id="ques"> {decodeHTMLEntities(currQues?.question)}</p>
            <div className="option_box vt_box">
               {options.map((el, ind) =>
                  <button
                     key={ind} type="button" className="option"
                  >
                     {decodeHTMLEntities(options[ind])}
                  </button>
               )}
            </div>
         </div>
         <button
            id="next" type="button" className="btn1"
         > NEXT </button>
      </section>
   )
}


export { QuestionSec }