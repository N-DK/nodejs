const Cart = require('../modules/Cart');
const Product = require('../modules/Products');
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose')


class CartController {
    //[GET] /carts
    index(req, res, next) {
        if(req.session.user) {
            Cart.find({user_id: req.session.user._id})
            .then(carts => res.render('cart', {carts: multipleMongooseToObject(carts)}))
            .catch(next);
        } else  {
            res.render('cart');
        }
    }

    // [POST] /cart/add-to-cart/:id
    addToCart(req, res, next) {
        Product.findOne({_id: req.params.id})
            .then((products) => { 
                Cart.findOne({product_id: products._id, user_id: req.body.user_id})
                        .then(async product => {
                            req.body.product_name = products.name;
                            req.body.product_image = products.image;
                            req.body.product_price = Math.round(products.cost * (1 - products.discount));
                            if(!product) {
                                req.body.total_price = req.body.quantify * req.body.product_price;
                                const cart = new Cart(req.body);
                                await cart.save()
                            } else {
                                req.body.quantify = parseInt(req.body.quantify) + product.quantify;
                                req.body.total_price = req.body.quantify * req.body.product_price;
                                await Cart.updateOne({product_id: req.body.product_id}, req.body);
                            } 
                        })
                        .then(() => res.redirect(`/product/${products.slug}`))
                        .catch(next);
            })
    }

    // [DELETE] /cart/delete/:id
    destroy(req, res, next) {
        Cart.deleteOne({product_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new CartController