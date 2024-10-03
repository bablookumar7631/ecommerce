import { Router } from 'express';
import { createProduct, deleteProduct, getAllProducts, getCategoryByProducts, getProductById, searchProducts, updateProduct } from '../controllers/product.controller.js';
import multer from 'multer';
import {adminAuth} from '../middleware/adminAuth.js';
import {singleUpload} from '../middleware/multer.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

router.post('/products', adminAuth, upload.single('prodImage'), createProduct);
router.get('/getAllProducts', getAllProducts);
router.get('/category/:categoryName/products', getCategoryByProducts);
router.get('/search', searchProducts);
router.delete('/delete-product/:id',adminAuth, deleteProduct);
router.put('/update-product/:id', adminAuth, singleUpload('prodImage'), updateProduct);
router.get('/getproductbyid/:id', getProductById);

export default router;
