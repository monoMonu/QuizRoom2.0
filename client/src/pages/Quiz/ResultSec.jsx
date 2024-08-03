import { useEffect, useState } from "react";
import { useQuiz } from "../../context/quizContext/useQuiz";
import SideMenu from "../../components/sideMenu/SideMenu";
import { usePersistState } from "../../utils/hooks";
import { setScoreStats } from "../../actions/quizAction";
import { decodeHTMLEntities } from "../../utils/helperFunctions";
import { Link } from "react-router-dom";
import { PreviewSheet } from "../../components/PreviewSheet";

function ResultSec(){

   const { quizFinished, questions, answers, updateScore } = useQuiz();
   const [stats, setStats] = usePersistState(null, 'scoreState');
   const [showPreview, setShowPreview] = useState(false);

   const calcStats = () => {
      let score = 0, wrong = 0, correct = 0, unanswered = 0;
      for (let i = 0; i < questions.length; i++) {
         if(answers[i]===undefined || answers[i]===null) {
            unanswered++;
            continue;
         }
         if (decodeHTMLEntities(questions[i].correct_answer) === answers[i]) {
            score += 5;
            correct += 1;
            continue;
         }
         if (decodeHTMLEntities(questions[i].correct_answer) !== answers[i]) {
            score -= 1;
            wrong += 1;
            continue;
         }
      }
      return { score, wrong, correct, unanswered }
   }
   
   useEffect(() => {
      if (!quizFinished) throw Error("You have to play a quiz to see the result");
      const stats = calcStats();
      setStats(stats);
      (async () => {
         await setScoreStats({ score: stats.score });
      })()
      updateScore(stats.score);
   }, [quizFinished])

   return (
      
      <section id="result_pg">
         <SideMenu />
         <div className="quizResults">
            <h1 className="heading">RESULT</h1>
            <p id="feedback">Well Done !</p>
            <div className="stat_box vt_box">
               <p>
                  <span>Score :</span>
                  <b id="score">{stats?.score}</b>
               </p>
               <p> 
                  <span>Correct Answers :</span> 
                  <b id="correct_ans">{stats?.correct}</b>
               </p>
               <p>
                  <span>Wrong Answers :</span> 
                  <b id="wrong_ans">{stats?.wrong}</b>
               </p>
               <p>
                  <span>Unanswered :</span> 
                  <b id="unans">{stats?.unanswered}</b>
               </p>
               <button 
                  type="button" id="previewBtn" className="btn1"
                  onClick={() => setShowPreview(!showPreview)}
               > PREVIEW </button>
            </div>
            <div className="hz_box homeRestart_box sound_box">
               <Link to="/quiz">
                  <button title="homeIcon" type="button" id="homeBtn" className="btn1">
                     <i className="fas fa-home"></i>
                  </button>
               </Link>
               <Link to="/quiz/play">
                  <button title="restartIcon" type="button" id="restartBtn" className="btn1">
                     <i className="fas fa-rotate"></i>
                  </button>
               </Link>
            </div>
         </div>
         {/* Preview Sheet */}
         { showPreview ? <PreviewSheet onClose={() => setShowPreview(false)} /> : "" }
      </section>
   )
}

export { ResultSec }