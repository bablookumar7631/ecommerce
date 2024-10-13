import express from 'express';
import { createCheckoutSession, getAllOrders, getUserOrders } from '../controllers/payment.controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';

const router = express.Router();

router.post('/create-checkout-session', isAuthenticated, createCheckoutSession);
router.get('/get-all-orders', getAllOrders);
router.get('/my-orders', isAuthenticated, getUserOrders);

export default router;