
const Product = require('../modules/Products');
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose')

class ProductsController {
    // [GET]  product/:slug
    show(req, res, next) {
        Product.findOne({slug: req.params.slug})
            .then(product => {
                res.render('product/show', {
                    product: mongooseToObject(product),
                });
            })       
            .catch(next);
    }

    // [GET] product/create
    create(req, res, next) {
        res.render('product/create')
    }

    // [POST]  product/store
    async store(req, res, next) {
        const product = new Product(req.body);
        await product.save()
        .then(() => res.redirect('/'));
    }

    // [GET] product/category/:slug
    category(req, res, next) {
        Product.find({slug_category: req.params.slug})
            .then(products => {
                res.render('product/category', { products : multipleMongooseToObject(products), title: req.params.slug});
            })
            .catch(next);
    }
}   

module.exports = new ProductsController;