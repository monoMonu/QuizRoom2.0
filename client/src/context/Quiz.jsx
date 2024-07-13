import { createContext, useContext, useState } from "react";

const QuizDataContext = createContext(null);

export const QuizDataProvider = ({ children }) => {

   const [quizData, setQuizData] = useState(null);
   const [selections, setSelections] = useState({
      amount: 5,
      category: 9,
      difficulty: "easy"
   });

   const values = {
      quizData: quizData,
      selections,
      quizConfigs: {
         difficulties: ["Easy", "Medium", "Hard"],
         categories: ["General Knowledge", "Books", "Film", "Music", "Musical & Theatres", "Television", "Video Games", "Board Games", "Science and Nature", "Computers", "Mathematics", "Mythology", "Sports", "Geography", "History", "Politics", "Art", "Celebrities", "Animals", "Vehicles", "Comics", "Gadgets", "Japanese Anime & Manga", "Cartoon & Animations"],
         numbers: [5, 10, 15, 20, 25, 30]
      },

      updateQuizData: (newData) => {
         setQuizData(newData);
      },
   }

   return (
      <QuizDataContext.Provider value={values}>
         {children}
      </QuizDataContext.Provider>
   );
}


export const useQuizData = () => useContext(QuizDataContext);
