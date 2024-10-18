import {Router} from 'express'
import { register, login, logout, updateProfile, getAllUser, deleteUser, updateProfileImg, totalCustomers } from '../controllers/user.controller.js';
// import {isAuthenticated} from '../middleware/isAuthenticated.js';
import {isAuthenticated} from '../middleware/isAuthenticated.js';
import multer from 'multer';
import {singleUpload} from '../middleware/multer.js';
import {adminAuth} from '../middleware/adminAuth.js';


const router = Router();

// User-related routes
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.post('/updateProfileImg', isAuthenticated, singleUpload('profilePhoto'), updateProfileImg);
router.post('/updateProfile', isAuthenticated, updateProfile);

// Admin-related routes
router.route("/getAllUsers").get(isAuthenticated, adminAuth, getAllUser);
router.route("/deleteUser/:id").delete(isAuthenticated, adminAuth, deleteUser);
router.route("/total-customers").get(isAuthenticated, adminAuth, totalCustomers);


export default router;