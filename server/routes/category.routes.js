import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategories, updateCategory } from '../controllers/category.controller.js';
import multer from 'multer';
import {isAuthenticated} from '../middleware/isAuthenticated.js';
import {adminAuth} from '../middleware/adminAuth.js';
import {singleUpload} from '../middleware/multer.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

router.post('/categories', isAuthenticated, adminAuth, upload.single('categoryImage'), createCategory);
router.get('/getAllCategories', getAllCategories);
router.delete('/deleteCategory/:id', isAuthenticated, adminAuth, deleteCategory);
router.put('/categories/updateCategory/:id', isAuthenticated, adminAuth, singleUpload('categoryImage'), updateCategory);

export default router;
