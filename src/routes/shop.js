const express = require('express');
const router = express.Router();
const shopController = require('../app/controllers/ShopController');

router.use('/', shopController.index);


module.exports = router;