import { quizApi } from "../utils/api.js"

export const fetchQuizData = async ( amount, category, difficulty ) => {
   try {
      const { data } = await quizApi.get(`/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`);
      console.log(data.results);
      return await data.results;
   } catch (error) {
      console.log(error);
      throw new Error("Error while fetching quiz data...");
   }
}