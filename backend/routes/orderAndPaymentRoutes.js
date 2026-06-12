const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getOrderById, deleteOrder, updateOrderStatus } = require('../controller/orderController');
const { processPayment, deletePayment } = require('../controller/paymentController');

// Order routes
router.post('/order', createOrder);
router.get('/orders', getAllOrders);
router.get('/order/:id', getOrderById);
router.delete('/order/:id', deleteOrder);
router.put('/order/updateOrderStatus/:id', updateOrderStatus);

// Stripe payment route
router.post('/payment', processPayment);
router.delete('/payment/:id', deletePayment);

module.exports = router;
