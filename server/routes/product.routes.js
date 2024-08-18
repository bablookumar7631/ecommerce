import { Router } from 'express';
import { createProduct } from '../controllers/product.controller.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

router.post('/products', upload.single('prodImage'), createProduct);

export default router;