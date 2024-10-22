import express from 'express';
import { createCheckoutSession, getAllOrders, getUserOrders, requestCancelOrder, stripeWebhook, totalOrder, totalRevenue, updateOrderStatus } from '../controllers/payment.controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

router.post('/create-checkout-session', isAuthenticated, createCheckoutSession);
router.get('/get-all-orders', isAuthenticated, adminAuth, getAllOrders);
router.get('/my-orders', isAuthenticated, getUserOrders);
router.patch('/update-status', isAuthenticated, adminAuth, updateOrderStatus);
router.post('/request-cancel-order/:id', isAuthenticated,requestCancelOrder);
router.get('/total-orders', isAuthenticated, adminAuth, totalOrder);
router.get('/total-revenue', isAuthenticated, adminAuth, totalRevenue);


// Webhook route for Stripe
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

export default router;