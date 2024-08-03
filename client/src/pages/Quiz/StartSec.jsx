import { Link } from "react-router-dom";
import SideMenu from "../../components/sideMenu/SideMenu";
import { useQuiz } from "../../context/quizContext/useQuiz";
import { useEffect } from "react";

// Constants
const quizConfigs = {
   difficulties: ["Easy", "Medium", "Hard"],
   categories: ["General Knowledge", "Books", "Film", "Music", "Musical & Theatres", "Television", "Video Games", "Board Games", "Science and Nature", "Computers", "Mathematics", "Mythology", "Sports", "Geography", "History", "Politics", "Art", "Celebrities", "Animals", "Vehicles", "Comics", "Gadgets", "Japanese Anime & Manga", "Cartoon & Animations"],
   numbers: [5, 10, 15, 20, 25, 30]
}

function StartSec(){

   const { selections, setSelections, resetQuiz } = useQuiz();
   const {difficulties, categories, numbers} = quizConfigs;

   const handleSelections = (e) => {
      setSelections({
         ...selections,
         [e.currentTarget.name]: e.currentTarget.value
      })
   }

   // resetting 
   useEffect(() => {
      resetQuiz();
   }, [])

   console.log(3); 
   
   return (
      <section id="home_pg">

         <SideMenu />

         <div className="quizControls">
            <h1 className="gameTitle">QuizRoom !
               <p>Take a Challenge, test your knowledge</p>
            </h1>
            <span id="logo">?</span>
            <div className="btn_box">
               <Link to="/quiz/play">
                  <button type="button" className="btn2 startBtn">START</button>
               </Link>

               <label htmlFor="difficulty">Choose Difficulty Level :</label>
               <select 
                  name="difficulty"  
                  value={selections.difficulty}
                  onChange={handleSelections}
               >
                  {difficulties.map((opt, i) => (
                     <option key={i} value={opt.toLowerCase()}>{opt}</option>
                  ))}
               </select>

               <label htmlFor="category">Choose the Category of Questions :</label>
               <select 
                  name="category" 
                  value={selections.category}
                  onChange={handleSelections}
               >
                  {categories.map((opt, i) => (
                     <option key={i+9} value={i+9}>{opt}</option>
                  ))}
               </select>

               <label htmlFor="number">Choose Number of Questions :</label>
               <select 
                  name="amount" 
                  value={selections.amount}
                  onChange={handleSelections}
               >
                  {numbers.map((opt, i) => (
                     <option key={i} value={opt}>{opt}</option>
                  ))}
               </select>

               <div className="hz_box sound_box">
                  <button title="Sound Button" type="button" className="btn1">
                     <i className="fas fa-volume-high sound"></i>
                  </button>
                  <button title="Volume Button" type="button" className="btn1">
                     <i className="fas fa-music music"></i>
                  </button>
               </div>
            </div>
         </div>

      </section>
   )
}


export {StartSec}