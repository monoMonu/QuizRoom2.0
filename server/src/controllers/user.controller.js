import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { uploadImgOnCloudinary } from '../utils/cloudinary.js';
import config from '../config.js';

const randAvatars = [
   "https://i.ibb.co/r7P3mGQ/fox-6249911.png",
   "https://i.ibb.co/Z1VDspm/parrot-4015657.png",
   "https://i.ibb.co/n1Q3fKH/bull-terrier-2829735.png",
   "https://i.ibb.co/3zc214y/pet-9108014.png",
   "https://i.ibb.co/0Xg1M2D/penguin-6250524.png"
]

const generateTokens = async (id) => {
   const user =  await User.findById(id).select('-password');
   const accessToken = jwt.sign(
      {
         _id: user._id,
         email: user.email,
         username: user.username,
         fullname: user.fullname,
      },
      config.access_token_secret,
      {
         expiresIn: config.access_token_expiry
      }
   )
   const refreshToken = jwt.sign(
      { _id: user._id },
      config.refresh_token_secret,
      { expiresIn: config.refresh_token_expiry }
   )

   return {accessToken, refreshToken}
}


const isPasswordCorrect =  async (password, hashedPassword) => {
   return await bcrypt.compare(password, hashedPassword);
}
        


const registerUser = asyncHandler(async (req, res)=>{
   let {email, username, fullname, password} = req.body;

   // validate data
   if(!email || !username || !fullname || !password) {
      throw new ApiError(400, "All the data is required");
   }

   const existingUser = await User.find({
      $or: [{username}, {email}]
   })

   if(existingUser.length > 0)
      throw new ApiError(400, "User with this email already exists");

   const avatarLocalPath = req.file?.path;
   let avatar;
   if(avatarLocalPath){
      avatar = await uploadImgOnCloudinary(avatarLocalPath);
   }

   const user = await User.create({
      email,
      username: username.toLowerCase(),
      fullname: fullname.trim(),
      password: await bcrypt.hash(password, 10),
      avatar: avatar?.secure_url || randAvatars[Math.floor(Math.random()*5)]
   })

   const createdUser = await User.findById(user._id).select("-password");
   if(!createdUser){
      throw new ApiError(500, "couldn't register. Something went wrong while registering.");
   }

   return res
   .status(200)
   .json(
      new ApiResponse(
         200, 
         createdUser,
         "User registered Succesfully"
      )
   )
})

const logInUser = asyncHandler(async (req, res) => {

   const {emailORusername, password} =  req.body;

   if((!emailORusername)  || (!password)) {
      throw new ApiError(400, 'Please provide required details');
   }

   const user = await User.findOne({
      $or: [{username: emailORusername}, {email: emailORusername}]
   });

   if(!user)
      throw new ApiError(404, "User with email or username does not exist");


   const isPasswordValid = await isPasswordCorrect(password , user.password);

   if(!isPasswordValid)
      throw new ApiError(401, "Invalid credentials");

   const {accessToken, refreshToken} = await generateTokens(user._id);

   const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

   const options = {
      httpOnly: true, secure: true, sameSite: 'none', maxAge: 24*60*60*1000
   }

   res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options);
   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            loggedInUser,
            "Logged in succesfully!!"
         )
      )

})

const logOutUser = asyncHandler( async (req, res) => {
   // Middleware is run before this, in route, which decides whether this code will run or not.

   await User.findByIdAndUpdate(
      req.user?._id,
      {
         $unset:{
            refreshToken:1 // removes the selected field from document
         }
      }
   )

   const options = {
      httpOnly: true, secure: true, sameSite: 'none',  maxAge: new Date(0)
   }

   return res
   .status(200)
   .clearCookie('accessToken', options)
   .clearCookie('refreshToken', options)
   .json(
      new ApiResponse(
         200, {}, "Logged out succesfully"
      )
   )
})

// get user details
const getUserDetails = asyncHandler((req,res)=> {
   return res
   .status(200)
   .json(
      new ApiResponse(200, req.user, "User details fetched succesfully")
   )

})

// Update user details
const updateUserDetails = asyncHandler( async (req, res) => {
   const {fullname, username, email} = req.body;
   
   if(!fullname && !username && !email)
      throw new ApiError(400, "Nothing is updated");

   const existingUser = await User.findOne({
      $or: [{ username }, { email }],
      _id: { $ne: req.user?._id }, // Exclude the current user
   });

   if (existingUser) {
      let duplicateField = '';
      if (existingUser.username === username) {
         duplicateField = 'Username';
      } else if (existingUser.email === email) {
         duplicateField = 'Email';
      }
      throw new ApiError(409, `${duplicateField} is already used by another account`);
   }

   const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
         $set: {
            fullname,
            username,
            email
         }
      },
      { new: true }
   ).select('-password -refreshToken');

   return res
   .status(200)
   .json(
      new ApiResponse(
         200, user, "User details updated succesfully"
      )
   )
})

// update avatar
const updateAvatar = asyncHandler(async (req, res)=>{
   const avatarLocalPath = req.file?.path;
   if(!avatarLocalPath) throw new ApiError(400, "Avatar is required");
   let avatar;
   if(avatarLocalPath){
      avatar = await uploadImgOnCloudinary(avatarLocalPath);
   }

   if(!avatar){
      throw new ApiError(400, "Avatar upload failed");
   }

   const user = await User.findByIdAndUpdate(
      req.user?._id,
      { 
         avatar: avatar.secure_url
      },
      { new: true }
   );

   return res
   .status(200)
   .json(
      new ApiResponse(200, avatar.secure_url, "Avatar updated succesfully")
   )
})

// Update password
const changePassword = asyncHandler( async(req, res) => {
   const { oldPassword, newPassword, confirmPassword } = req.body;

   const user = await User.findById(req.user?._id);
   const isPasswordValid = await isPasswordCorrect(oldPassword, user.password);
   if(!isPasswordValid)
      throw new ApiError(401, "Wrong old password");

   if(!(newPassword===confirmPassword))
      throw new ApiError(401, "New Password and Confirm password doesn't match");

   user.password = await bcrypt.hash(newPassword, 10);
   await user.save();

   return res
   .status(200)
   .json(
      new ApiResponse(
         200, {}, "Password Updated succesfully"
      )
   )

})

export {
   registerUser,
   logInUser,
   logOutUser,
   getUserDetails,
   updateUserDetails,
   updateAvatar,
   changePassword
}