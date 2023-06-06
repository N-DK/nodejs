
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
}   

module.exports = new ProductsController;