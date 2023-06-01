
class SiteController {

    // [GET] /
    home(req, res) {
        res.render('home');
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