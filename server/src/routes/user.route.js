import { Router } from "express";
import { changePassword, getUserDetails, logInUser, logOutUser, registerUser, updateAvatar, updateUserDetails } from "../controllers/user.controller.js";
import { authUser } from '../middlewares/auth.middleware.js';
import upload from "../middlewares/multer.middleware.js";

const router = Router();

// routes
router.route('/register').post(
   upload.single('avatar'),
   registerUser
);
router.route('/login').post(logInUser);
router.route('/logout').get(authUser, logOutUser);
router.route('/getuserdetails').get(authUser, getUserDetails);
router.route('/updateuserdetails').put(authUser, updateUserDetails);
router.route('/update-avatar').patch(
   authUser, 
   upload.single('avatar'), 
   updateAvatar
);
router.route('/changepassword').put(authUser, changePassword);


export default router;