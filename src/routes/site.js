const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.use('/about', siteController.about);
router.use('/contact', siteController.contact);
router.use('/wishlist', siteController.wishlist);
router.use('/', siteController.home);


module.exports = router;