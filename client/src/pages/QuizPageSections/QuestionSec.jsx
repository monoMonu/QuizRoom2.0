

function QuestionSec(){
   return (
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
            <p id="ques"> {/* Question */}</p>
            <div className="option_box vt_box">
               <button type="button" title="option-1" className="option">{/* Option - 1 */}</button>
               <button type="button" title="option-2" className="option">{/* Option - 2 */}</button>
               <button type="button" title="option-3" className="option">{/* Option - 3 */}</button>
               <button type="button" title="option-4" className="option">{/* Option - 4 */}</button>
            </div>
         </div>
         <button id="next" type="button" className="btn1">NEXT</button>
      </section>
   )
}


export { QuestionSec }