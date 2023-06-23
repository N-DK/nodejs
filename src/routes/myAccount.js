const express = require('express');
const router = express.Router();
const myAccountController = require('../app/controllers/MyAccountController');


router.post('/handleRegister', myAccountController.handleRegister);
router.post('/handleLogin', myAccountController.handleLogin);
router.post('/logout', myAccountController.logout);
router.get('/orders', myAccountController.orders);
router.get('/order-view/:key', myAccountController.orderView);
router.get('/edit-account', myAccountController.editAccount);
router.put('/:id', myAccountController.update);
router.get('/:item', myAccountController.index);
router.get('/', myAccountController.index);

module.exports = router;