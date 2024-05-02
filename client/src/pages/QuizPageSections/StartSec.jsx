
import TopBar from "../../components/TopBar";

const difficulties = ["Easy", "Medium", "Hard"];
const categories = ["General Knowledge", "Books", "Film", "Music", "Musical & Theatres", "Television", "Video Games", "Board Games", "Science and Nature", "Computers", "Mathematics", "Mythology", "Sports", "Geography", "History", "Politics", "Art", "Celebrities", "Animals", "Vehicles", "Comics", "Gadgets", "Japanese Anime & Manga", "Cartoon & Animations"];
const numbers = [5, 10, 15, 20, 25, 30];


function StartSec(){
   return (
      <section id="home_pg">
         <h1 className="gameTitle">QuizTime !
            <p>Take a Challenge, test your knowledge</p>
         </h1>
         <span id="logo">?</span>
         <div className="btn_box">
            <button type="button" id="startBtn" className="btn1">START</button>

            <label htmlFor="difficulty">Choose Difficulty Level :</label>
            <select id="difficulty">
               {difficulties.map((opt, i) => (
                  <option key={i}>{opt}</option>
               ))}
            </select>

            <label htmlFor="category">Choose the Category of Questions :</label>
            <select id="category">
               {categories.map((opt, i) => (
                  <option key={i+9}>{opt}</option>
               ))}
            </select>

            <label htmlFor="number">Choose Number of Questions :</label>
            <select id="number">
               {numbers.map((opt, i) => (
                  <option key={i}>{opt}</option>
               ))}
            </select>
            <div className="hz_box sound_box">
               <button title="Sound Button" type="button" className="btn1 fas fa-volume-high sound"></button>
               <button title="Volume Button" type="button" className="btn1 fas fa-music music"></button>
            </div>
         </div>

         <TopBar />
         
      </section>
   )
}


export {StartSec}