const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.use('/about', siteController.about);
router.use('/contact', siteController.contact);
router.use('/shop', siteController.shop);
router.use('/wishlist', siteController.wishlist);
router.use('/cart', siteController.cart);
router.use('/', siteController.home);


module.exports = router;