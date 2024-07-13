import { mainApi } from "../utils/api"

export const loginUser = async (userData) => {
   try {
      
      const { data } = await mainApi.post("/user/login", 
         userData,
         {
            headers: {
               "Content-type": "application/json"
            }
         }
      )

      return await data?.data;

   } catch (error) {
      if(error.response.data.statusCode) 
         throw new Error(error.response.data.message);
      else 
         throw new Error("Error while logging user. Please try again")
   }
}


export const registerUser = async (userData) => {
   try {
      
      const { data } = await mainApi.post("/user/register", 
         userData,
         {
            headers: {
               "Content-type": "application/json"
            }
         }
      )

      return await data.data;

   } catch (error) {
      if(error.response.data.statusCode) 
         throw new Error(error.response.data.message);
      else 
         throw new Error("Error while registering user. Please try again")
   }
}


export const getUserDetails = async () => {
   try {
      
      const { data } = await mainApi.get("/user/getuserdetails",
         {
            headers: {
               "Content-type": "application/json"
            }
         }
      )

      return await data.data;

   } catch (error) {
      if(error.response.data.statusCode) 
         throw new Error(error.response.data.message);
      else 
         throw new Error("Error while registering user. Please try again")
   }
}



export const updateUserDetails = async (userData) => {
   try {
      
      const { data } = await mainApi.put("/user/updateuserdetails",
         userData,
         {
            headers: {
               "Content-type": "application/json"
            }
         }
      )

      return await data.data;

   } catch (error) {
      if(error.response.data.statusCode) 
         throw new Error(error.response.data.message);
      else 
         throw new Error("Error while updating user details. Please try again")
   }
}