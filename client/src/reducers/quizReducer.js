import { shuffleArray } from "../utils/helperFunctions";

export const quizReducer = (state, action) => {
   switch (action.type) {
      case 'SET_SELECTIONS':
         return { 
            ...state, 
            selections: action.payload,
         };
      case 'SET_QUESTIONS':
         return { 
            ...state, 
            questions: action.payload, 
            answers: new Array(action.payload.length).fill(null) 
         };
      case 'SET_OPTIONS':
         const options = shuffleArray([
            ...state.questions[state.currQuesInd].incorrect_answers,
            state.questions[state.currQuesInd].correct_answer
         ]);
         return { 
            ...state, 
            options,
         };
      case 'START_QUIZ':
         return { 
            ...state, 
            currQuesInd: 0, 
            quizStarted: true, 
            quizFinished: false, 
            answers: [],
            timeRemaining: new Array(state.questions.length).fill(30)
         };
      case 'ANSWER_QUESTION':
         const newAnswers = [...state.answers];
         newAnswers[state.currQuesInd] = action.payload;
         return { 
            ...state, 
            answers: newAnswers,
         };
      case 'NEXT_QUESTION':
         return { 
            ...state, 
            currQuesInd: state.currQuesInd + 1,
         };
      case 'PREV_QUESTION':
         return { 
            ...state, 
            currQuesInd: state.currQuesInd - 1,
         };
      case 'FINISH_QUIZ':
         return { 
            ...state, 
            quizFinished: true, 
            quizStarted: false,
         };
      case 'TICK_TIMER':
         return {
            ...state,
            timeRemaining: state.timeRemaining.map((time, index) => 
               index === state.currQuesInd ? time - 1 : time
            ),
         };
      case 'RESTORE_STATE':
         return { 
            ...state, 
            ...action.payload,
         };
      case 'RESET_QUIZ':
         return {
            ...state,
            questions: [],
            currQuesInd: NaN,
            options: [],
            answers: [],
            timeRemaining: [],
            quizStarted: false,
            quizFinished: false,
         }
      default:
         return state;
   }
};


export const scoreReducer = (state, action) => {
   switch (action.type) {
      case 'UPDATE_SCORE':
         return {
            ...state,
            score: action.payload
         }
      case 'UPDATE_HIGHSCORE':
         return {
            ...state,
            highScore: action.payload
         }
      default:
         return state;
   }
}

