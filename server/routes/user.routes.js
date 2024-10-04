import {Router} from 'express'
import { register, login, logout, updateProfile, getAllUser, deleteUser, updateProfileImg } from '../controllers/user.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import multer from 'multer';
import {singleUpload} from '../middleware/multer.js';
import {adminAuth} from '../middleware/adminAuth.js';


const router = Router();


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.post('/updateProfileImg', isAuthenticated, singleUpload('profilePhoto'), updateProfileImg);
router.post('/updateProfile', isAuthenticated, updateProfile);
router.route("/getAllUsers").get(getAllUser);
router.route("/deleteUser/:id").delete(isAuthenticated, adminAuth, deleteUser);


export default router;