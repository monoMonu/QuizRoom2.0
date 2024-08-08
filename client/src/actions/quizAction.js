import { mainApi, quizApi } from "../utils/api.js"

export const fetchQuizData = async ( amount, category, difficulty ) => {
   try {
      const { data } = await quizApi.get(`/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`);
      return await data.results;
   } catch (error) {
      throw new Error("Error while fetching quiz data...");
   }
}


export const getScoreStats = async () => {
   try {
      const { data } = await mainApi.get('/stats/getstats');
      return await data?.data;
   } catch (error) {
      console.log(error);
      throw new Error("Error while fetching user stats data...");
   }
}


export const setScoreStats = async (score) => {
   try {
      const { data } = await mainApi.post('/stats/setstats', score);
      return await data?.data;
   } catch (error) {
      if(error?.response?.data?.statusCode) 
         throw new Error(error.response.data.message);
      else 
         throw new Error("Error while updating user stats data...");
   }
}

export const updatePlayNum = async (score) => {
   try {
      const { data } = await mainApi.get('/stats/updateplays');
      return await data?.data;
   } catch (error) {
      if(error?.response?.data?.statusCode) 
         throw new Error(error.response.data.message);
      else 
         throw new Error("Error while updating user stats data...");
   }
}

export const fetchLeaderboard = async (page, limit) => {
   try {
      const { data } = await mainApi.get('/stats/leaderboard', {
         params: {
            page,
            limit
         }
      });
      return await data?.data;
   } catch (error) {
      if(error?.response?.data?.statusCode) 
         throw new Error(error.response.data.message);
      else 
         throw new Error("Error fetching leaderboard data");
   }
}