import { Router } from 'express';
import { createProduct, deleteProduct, getAllProducts, getCategoryByProducts, getProductById, searchProducts, totalProducts, updateProduct } from '../controllers/product.controller.js';
import multer from 'multer';
import {isAuthenticated} from '../middleware/isAuthenticated.js';
import {adminAuth} from '../middleware/adminAuth.js';
import {singleUpload} from '../middleware/multer.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

router.post('/products', adminAuth, upload.single('prodImage'), createProduct);
router.get('/getAllProducts', getAllProducts);
router.get('/category/:categoryName/products', getCategoryByProducts);
router.get('/search', searchProducts);
router.delete('/delete-product/:id', isAuthenticated, adminAuth, deleteProduct);
router.put('/update-product/:id', isAuthenticated, adminAuth, singleUpload('prodImage'), updateProduct);
router.get('/getproductbyid/:id', getProductById);
router.get('/total-products',isAuthenticated, adminAuth, totalProducts);

export default router;
