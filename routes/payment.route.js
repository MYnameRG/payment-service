const express = require('express');
const PaymentController = require('../controllers/payment.controller');

const router = express.Router();

// Define routes for payment operations
router.get('/create', new PaymentController.createPayments);

router.get('/verify', new PaymentController.verifyPayments);

module.exports = router;