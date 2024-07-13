
const quizReducer = (state, action) => {
   switch (action.type) {
      case 'SET_QUESTIONS':
         return { ...state, questions: action.payload, answers: new Array(action.payload.length).fill(null) };
      case 'START_QUIZ':
         return { ...state, quizStarted: true, timeRemaining: 30 };
      case 'ANSWER_QUESTION':
         const newAnswers = [...state.answers];
         newAnswers[state.currentQuestionIndex] = action.payload;
         return { ...state, answers: newAnswers, timeRemaining: 30 };
      case 'NEXT_QUESTION':
         return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1, timeRemaining: 30 };
      case 'PREV_QUESTION':
         return { ...state, currentQuestionIndex: state.currentQuestionIndex - 1, timeRemaining: 30 };
      case 'FINISH_QUIZ':
         return { ...state, quizFinished: true };
      case 'TICK_TIMER':
         return { ...state, timeRemaining: state.timeRemaining - 1 };
      default:
         return state;
   }
};