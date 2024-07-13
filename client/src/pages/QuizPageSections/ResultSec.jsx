import { useAuth } from "../../context/Auth"

function ResultSec(){

   const { user } = useAuth();

   return (
      <section id="result_pg">
         <h1 className="heading">RESULT</h1>
         <p id="feedback">Well Done !</p>
         <div className="stat_box vt_box">
            <p>
               <span>Score :</span> 
               <b id="score">25</b>
            </p>
            <p> 
               <span>Correct Answers :</span> 
               <b id="correct_ans">15</b>
            </p>
            <p>
               <span>Wrong Answers :</span> 
               <b id="wrong_ans">2</b>
            </p>
            <p>
               <span>Unanswered :</span> 
               <b id="unans">3</b>
            </p>
            <button type="button" id="previewBtn" className="btn1">PREVIEW</button>
         </div>
         <div className="hz_box homeRestart_box sound_box">
            <button title="homeIcon" type="button" id="homeBtn" className="btn1 fas fa-home"></button>
            <button title="restartIcon" type="button" id="restartBtn" className="btn1 fas fa-rotate"></button>
         </div>

         {/* Absolute positioned */}
         <div className="top_bar">
            <p className="hs_box">Highest Score : <span className="hs">0</span></p>
            <button title="Profile button" type="button" className="profile_btn">
               <img src={user.avatar} alt="Profile Button"/>
            </button>
         </div>

      </section>
   )
}

export { ResultSec }