import { mainApi } from "../utils/api"

export const loginUser = async (userData) => {
   try {
      
      const { data } = await mainApi.post("/user/login", userData);
      return await data;

   } catch (error) {
      if(error?.response?.data?.statusCode) 
         throw new Error(error.response.data.message);
      else 
         throw new Error("Error while logging in user. Please try again");
   }
}


export const registerUser = async (userData) => {
   try {
      
      const { data } = await mainApi.post("/user/register", userData);
      return await data;

   } catch (error) {
      if(error?.response?.data?.statusCode) 
         throw new Error(error.response.data.message);
      else 
         throw new Error("Error while registering user. Please try again")
   }
}

export const logoutUser = async () => {
   try {
      
      const { data } = await mainApi.get("/user/logout");
      return await data;

   } catch (error) {
      if(error?.response?.data?.statusCode) 
         throw new Error(error.response.data.message);
      else 
         throw new Error("Error while logging out. Please try again")
   }
}


export const getUserDetails = async () => {
   try {
      
      const { data } = await mainApi.get("/user/getuserdetails");
      // console.log(data.data)
      return await data;

   } catch (error) {
      if(error?.response?.data?.statusCode) 
         throw new Error(error.response.data.message);
      else 
         throw new Error("Error while fetching user details. Please try again")
   }
}


export const updateUserDetails = async (userData) => {
   try {

      const { data } = await mainApi.put("/user/updateuserdetails", userData );
      return await data;
      
   } catch (error) {
      if(error?.response?.data?.statusCode) 
         throw new Error(error.response.data.message);
      else 
         throw new Error("Error while updating user details. Please try again")
   }
}


export const updateUserAvatar = async (avatarFile) => {
   const formData = new FormData();
   formData.append('avatar', avatarFile);
   try {
      const { data } = await mainApi.patch(
         "/user/update-avatar", 
         formData,
         {
            headers: {
               "Content-Type": "multipart/form-data",
            }
         }
      );
      return await data;
      
   } catch (error) {
      if(error?.response?.data?.statusCode) 
         throw new Error(error.response.data.message);
      else 
         throw new Error("Error while updating user details. Please try again")
   }
}

