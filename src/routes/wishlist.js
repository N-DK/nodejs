const express = require('express');
const router = express.Router();
const wishlistController = require('../app/controllers/WishlistController');

router.post('/add-to-wishlist/:id', wishlistController.addToWishlist);
router.delete('/delete/:id', wishlistController.destroy);
router.get('/', wishlistController.index);

module.exports = router;