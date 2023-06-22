const express = require('express');
const router = express.Router();
const checkoutController = require('../app/controllers/CheckoutController');


router.post('/order', checkoutController.order);
router.get('/order-received', checkoutController.orderReceived);

module.exports = router;