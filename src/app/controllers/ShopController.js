const Products = require('../modules/Products');
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose');

class ShopController {

    // [GET] /shop
    index(req, res, next) {
        var per_page = req.params.per_page ?? 2;
        var page = 1;
        var quantifySkip = (page - 1) * parseInt(per_page);
        Products.find({})
            .skip(quantifySkip)
            .limit(per_page)
            .then(products => {
                res.render('shop', {products: multipleMongooseToObject(products), page_active: page})
            })
            .catch(next);
    }

    // [GET] /shop/page/:page
    show(req, res, next) {
        var per_page = req.params.per_page ?? 2;
        var page = parseInt(req.params.page);
        var quantifySkip = (page - 1) * parseInt(per_page);
        Products.find({})
            .skip(quantifySkip)
            .limit(per_page)
            .then(products => {
                res.render('shop', {products: multipleMongooseToObject(products), page_active: page})
            })
            .catch(next);
    }
}

module.exports = new ShopController; 