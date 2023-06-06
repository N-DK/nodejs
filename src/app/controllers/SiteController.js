const Product = require('../modules/Products');
const { multipleMongooseToObject } = require('../../util/mongoose')

class SiteController {

    // [GET] /
    home(req, res, next) {
        Product.find({})
            .then(products => {
                res.render('home', { products : multipleMongooseToObject(products) });
            })
            .catch(next);
    }

    // [GET] /about
    about(req, res) {
        res.render('about');
    }

    // [GET] /contact
    contact(req, res) {
        res.render('contact');
    }

    // [GET] /shop
    shop(req, res) {
        res.render('shop');
    }

    //[GET] /wishlist
    wishlist(req, res) {
        res.render('wishlist');
    }

    //[GET] /cart
    cart(req, res) {
        res.render('cart');
    }

}

module.exports = new SiteController;