const express = require('express');
const router = express.Router();
const myAccountController = require('../app/controllers/MyAccountController');

router.post('/handleRegister', myAccountController.handleRegister);
router.get('/', myAccountController.index);

module.exports = router;