import { Router } from 'express';
import { createProduct, getAllProducts, getCategoryByProducts } from '../controllers/product.controller.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

router.post('/products', upload.single('prodImage'), createProduct);
router.get('/getAllProducts', getAllProducts);
router.get('/category/:categoryName/products', getCategoryByProducts);

export default router;


