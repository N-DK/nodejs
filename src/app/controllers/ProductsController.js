
const Product = require('../modules/Products');
const { mongooseToObject } = require('../../util/mongoose')

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
}   

module.exports = new ProductsController;