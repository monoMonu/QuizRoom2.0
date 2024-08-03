import axios from "axios"

// quizdata api default configs
export const quizApi = axios.create({
   baseURL: import.meta.env.VITE_QUIZ_API
});

// api default configs
export const mainApi = axios.create({
   baseURL: import.meta.env.VITE_MAIN_API,
   withCredentials: true,
   headers: {
      "Content-type": "application/json"
   }
});


