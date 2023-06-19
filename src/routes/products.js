const express = require('express');
const router = express.Router();
const productsController = require('../app/controllers/ProductsController');

router.get('/category/:slug', productsController.category);
router.post('/store', productsController.store)
router.get('/create', productsController.create)
router.get('/:slug', productsController.show);

module.exports = router;