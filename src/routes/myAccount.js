const express = require('express');
const router = express.Router();
const myAccountController = require('../app/controllers/MyAccountController');


router.post('/handleRegister', myAccountController.handleRegister);
router.post('/handleLogin', myAccountController.handleLogin);
router.post('/logout', myAccountController.logout);
router.get('/orders', myAccountController.orders);
router.get('/:item', myAccountController.index);
router.get('/', myAccountController.index);

module.exports = router;