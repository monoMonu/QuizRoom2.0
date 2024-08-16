import { useContext } from "react"
import { QuizContext } from "./Quiz"

export const useQuiz = () => {
   const { state, dispatch, scoreState, dispatchScore, musicState, setMusicState } = useContext(QuizContext);

   const setSelections = (selections) => dispatch({ type: 'SET_SELECTIONS', payload: selections });
   const setQuestions = async (questions) => dispatch({ type: 'SET_QUESTIONS', payload: questions });
   const startQuiz = () => dispatch({ type: 'START_QUIZ' });
   const answerQuestion = (answer) => dispatch({ type: 'ANSWER_QUESTION', payload: answer });
   const nextQuestion = () => dispatch({ type: 'NEXT_QUESTION' });
   const prevQuestion = () => dispatch({ type: 'PREV_QUESTION' });
   const finishQuiz = () => dispatch({ type: 'FINISH_QUIZ' });
   const resetQuiz = () => dispatch({ type: 'RESET_QUIZ' });


   // Score reducer functions
   const updateScore = (score) => {
      if(score != scoreState.score) 
         dispatchScore({ type: 'UPDATE_SCORE', payload: score });
      if (score > scoreState.highScore) 
         dispatchScore({ type: 'UPDATE_HIGHSCORE', payload: score });
   }

   const toggleMusicState = () => {
      setMusicState(!musicState);
   }


   return {
      ...state,
      setSelections,
      setQuestions,
      startQuiz,
      answerQuestion,
      nextQuestion,
      prevQuestion,
      finishQuiz,
      resetQuiz,
      ...scoreState,
      updateScore,
      musicState, 
      toggleMusicState
   }

}