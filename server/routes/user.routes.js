import {Router} from 'express'
import { register, login, logout, updateProfile } from '../controllers/user.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { singleUpload } from '../middleware/multer.js';



const router = Router();


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/updateProfile").post(isAuthenticated, singleUpload, updateProfile);


export default router;