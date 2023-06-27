const express = require('express');
const router = express.Router();
const blogsController = require('../app/controllers/BlogsController');


router.get('/create', blogsController.create);
router.get('/category/:slug', blogsController.category);
router.get('/page/:page', blogsController.changePage);
router.post('/store', blogsController.store);
router.get('/:slug', blogsController.show);
router.get('/', blogsController.index);

module.exports = router;