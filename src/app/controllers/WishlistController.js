const Wishlist = require('../modules/Wishlist');
const Product = require('../modules/Products');
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose')


class CartController {
    //[GET] /carts
    // index(req, res, next) {
    //     if(req.session.user) {
    //         Cart.find({user_id: req.session.user._id})
    //         .then(carts => res.render('cart', {carts: multipleMongooseToObject(carts)}))
    //         .catch(next);
    //     } else  {
    //         res.render('cart');
    //     }
    // }

    // [GET] /wishlist
    index(req, res, next) {
        res.render('wishlist');
    }


    // [POST] /wishlist/add-to-wishlist/:id
    addToWishlist(req, res, next) {
        Product.findOne({_id: req.params.id})
            .then((products) => { 
                Wishlist.findOne({product_id: products._id, user_id: req.body.user_id})
                        .then(async product => {
                            req.body.product_name = products.name;
                            req.body.product_image = products.image;
                            req.body.product_price = Math.round(products.cost * (1 - products.discount));
                            if(!product) {
                                const wishlist = new Wishlist(req.body);
                                await wishlist.save()
                            }
                        })
                        .then(() => res.redirect(`back`))
                        .catch(next);
            })
    }

    // [DELETE] /wishlist/delete/:id
    destroy(req, res, next) {
        Wishlist.deleteOne({product_id: req.params.id, user_id: req.body.user_id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new CartController