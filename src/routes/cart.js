const express = require('express');
const router = express.Router();
const cartController = require('../app/controllers/CartController');

router.post('/add-to-cart/:id', cartController.addToCart);
router.get('/', cartController.index);

module.exports = router;