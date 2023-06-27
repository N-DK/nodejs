
const blogsController = require('./blogs');
const siteController = require('./site');
const productsController = require('./products');
const myAccountController = require('./myAccount');
const cartController = require('./cart');
const shopController = require('./shop');
const checkoutController = require('./checkout');
const wishlistController = require('./wishlist')
const Cart = require('../app/modules/Cart');
const Wishlist = require('../app/modules/Wishlist');
const Order = require('../app/modules/Orders');
const Products = require('../app/modules/Products');
const Blogs = require('../app/modules/Blogs');
const { order } = require('../app/controllers/CheckoutController');

function route(app) {
    
    app.use((req, res, next) => {
        Products.find({})
            .then(products => {
                res.locals.dataProduct = products.map(product => product.toObject());
                next();
            }).catch(next);
    })

    app.use((req, res, next) => {
        Blogs.find({})
            .then(blogs => {
                res.locals.dataBlogs = blogs.map(blog => blog.toObject());
                next();
            }).catch(next);
    })

    const totalQuantify = async function(user_id) {
        try {
            const arr = await Cart.find({user_id: user_id});
            const result = arr.reduce((total, num) => total + num.quantify, 0);
            return result;
        } catch (error) {
            console.log(error);
        }
    };

    app.use(function(req, res, next) {
        if(req.session.user) {
            Cart.find({user_id: req.session.user._id})
                .then(carts => req.session.carts = carts.map(cart => cart.toObject()))
                .catch(next);
            next();
        } else {
            next();
        }
    })

    app.use(function(req, res, next) {
        if(req.session.user) {
            Wishlist.find({user_id: req.session.user._id})
                .then(wishlist => req.session.wishlist = wishlist.map(item => item.toObject()))
                .catch(next);
            next();
        } else {
            next();
        }
    })

    app.use(function(req, res, next) {
        if(req.session.user) {
            Order.find({user_id: req.session.user._id})
                .then(orders => req.session.orders = orders.map(order => order.toObject()))
                .catch(next);
            next();
        } else {
            next();
        }
    })
      
    app.use(function(req, res, next) {
        res.locals.session = req.session;
        next();
    });

      
    app.use(async (req, res, next) => {
        const user = req.session.user ?? {};
        const userId = user._id;
        const cartQuantity = userId ? await totalQuantify(userId) : 0;
        res.locals.cartQuantity = cartQuantity;
        next();
    });

    app.use('/wishlist', wishlistController);
    app.use('/checkout', checkoutController);
    app.use('/shop', shopController);
    app.use('/cart', cartController);
    app.use('/my-account', myAccountController);
    app.use('/blogs', blogsController);
    app.use('/product', productsController);
    app.use('/', siteController);
    
}

module.exports = route;
