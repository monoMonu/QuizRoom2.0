import React, { createContext, useReducer, useEffect, useRef } from 'react';
import quizReducer, { scoreReducer } from '../../reducers/quizReducer';
import { getScoreStats } from '../../actions/quizAction';
import { useNavigate } from 'react-router-dom';

const initQuizState = {
   questions: [],
   currQuesInd: NaN,
   options: [],
   answers: [],
   timeRemaining: [],
   quizStarted: false,
   quizFinished: false,
   selections: {
      amount: 5,
      category: 9,
      difficulty: "easy"
   }
};

const initScoreState = {
   score: 0,
   highScore: 0
}

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {

   const navigate = useNavigate();
   const [state, dispatch] = useReducer(quizReducer, initQuizState, (initial) => {
      const savedState = localStorage.getItem('quizState');
      return savedState ? JSON.parse(savedState) : initial;
   });

   const [scoreState, dispatchScore] = useReducer(scoreReducer, initScoreState);

   const initializedRef = useRef(false);

   useEffect(() => {
      if (!initializedRef.current) {
         initializedRef.current = true;

         (async () => {
            const scoreData = await getScoreStats();
            if (scoreData.highScore) 
               dispatchScore({ type: 'UPDATE_HIGHSCORE', payload: scoreData.highScore });
         })();

         const savedState = localStorage.getItem('quizState');
         if (savedState) {
            const parsedState = JSON.parse(savedState);
            dispatch({ type: 'RESTORE_STATE', payload: parsedState });
         }
      }
   }, []);

   useEffect(() => {
      if (initializedRef.current) {
         localStorage.setItem('quizState', JSON.stringify(state));
      }
   }, [state]);

   useEffect(() => {
      let timer;
      if(
         state.timeRemaining[state.currQuesInd] === 0 && 
         state.questions.length===state.currQuesInd+1
      ) {
         dispatch({ type: 'FINISH_QUIZ' });
         return navigate("/quiz/result", { replace: true });
      }

      if(state.timeRemaining[state.currQuesInd] === 0) dispatch({ type: 'NEXT_QUESTION' });

      if (state.quizStarted && !state.quizFinished && state.timeRemaining[state.currQuesInd] > 0) {
         timer = window.setInterval(() => {
            dispatch({ type: 'TICK_TIMER' });
         }, 1000);
      }
      return () => {
         clearInterval(timer);
      }
   }, [state.quizStarted, state.quizFinished, state.timeRemaining[state.currQuesInd]]);

   useEffect(() => {
      if(state.questions.length > 0)
         dispatch({ type: 'SET_OPTIONS' });
   }, [state.currQuesInd])

   return (
      <QuizContext.Provider value={{ state , dispatch, scoreState, dispatchScore }}>
         {children}
      </QuizContext.Provider>
   );
};