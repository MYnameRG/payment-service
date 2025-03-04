const express = require('express');
const PaymentController = require('../controllers/payment.controller');

const router = express.Router();
const PaymentServiceController = new PaymentController();

router.post('/order/create', PaymentServiceController.createOrder);

router.post('/verify', PaymentServiceController.verifyPayments);

module.exports = router;