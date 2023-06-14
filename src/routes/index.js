
const blogsController = require('./blogs');
const siteController = require('./site');
const productsController = require('./products');
const myAccountController = require('./myAccount');
const cartController = require('./cart');
const Cart = require('../app/modules/Cart');

function route(app) {

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
    Cart.find({})
        .then(carts => req.session.carts = carts.map(cart => cart.toObject()))
        next();
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

    app.use('/cart', cartController);
    app.use('/my-account', myAccountController);
    app.use('/blogs', blogsController);
    app.use('/product', productsController);
    app.use('/', siteController);
    
}

module.exports = route;
