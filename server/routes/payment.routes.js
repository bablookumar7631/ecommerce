import express from 'express';
import { createCheckoutSession, getAllOrders, getUserOrders, updateOrderStatus } from '../controllers/payment.controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

router.post('/create-checkout-session', isAuthenticated, createCheckoutSession);
router.get('/get-all-orders', isAuthenticated, adminAuth, getAllOrders);
router.get('/my-orders', isAuthenticated, getUserOrders);
router.patch('/update-status', isAuthenticated, adminAuth, updateOrderStatus);

export default router;