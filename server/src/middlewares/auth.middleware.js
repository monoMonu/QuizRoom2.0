import Jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
   try {
      const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');
      if(!token)
         throw new ApiError(401, 'Unauthorized request');
         
      // Verify the token
      const decodedToken = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decodedToken?._id).select('-password -refreshToken');
      if (!user) 
         throw new ApiError(401, 'The user does not exist!');
      
      // Add user to the request object
      req.user = user;

      next();

   } catch (error) {
      throw new ApiError(401, 'Invalid access token');
   }
})

export { verifyJWT };