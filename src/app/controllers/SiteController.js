const Product = require('../modules/Products');

class SiteController {

    // [GET] /
    home(req, res) {
        Product.find().then(data => res.json(data))
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

}

module.exports = new SiteController;