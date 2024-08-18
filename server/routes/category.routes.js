import { Router } from 'express';
import { createCategory, getAllCategories } from '../controllers/category.controller.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

router.post('/categories', upload.single('categoryImage'), createCategory);
router.get('/getAllCategories', getAllCategories);

export default router;
