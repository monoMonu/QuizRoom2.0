import { Router } from "express";
import { changePassword, getUserDetails, logInUser, logOutUser, registerUser, updateAvatar, updateUserDetails } from "../controllers/user.controller.js";
import { verifyJWT } from '../middlewares/auth.middleware.js';
import upload from "../middlewares/multer.middleware.js";

const router = Router();

// routes
router.route('/register').post(
   upload.single('avatar'),
   registerUser
);
router.route('/login').post(logInUser);
router.route('/logout').get(verifyJWT, logOutUser);
router.route('/getuserdetails').get(verifyJWT, getUserDetails);
router.route('/updateuserdetails').put(verifyJWT, updateUserDetails);
router.route('/update-avatar').patch(
   verifyJWT, 
   upload.single('avatar'), 
   updateAvatar
);
router.route('/changepassword').put(verifyJWT, changePassword);


export default router;