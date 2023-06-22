const Product = require('../modules/Products');
const { multipleMongooseToObject } = require('../../util/mongoose')

class SiteController {

    // [GET] /
    home(req, res, next) {
        Product.find({})
            .then(products => {
                res.render('home', { products : multipleMongooseToObject(products)});
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

    //[GET] /wishlist
    wishlist(req, res) {
        res.render('wishlist');
    }

    //[GET] /checkout
    checkout(req, res, next) {
        res.render("checkout");
    }

}

module.exports = new SiteController;