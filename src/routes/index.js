
const blogsController = require('./blogs');
const siteController = require('./site');
const productsController = require('./products');
const myAccountController = require('./myAccount');

function route(app) {

    app.use('/my-account', myAccountController);
    app.use('/blogs', blogsController);
    app.use('/product', productsController);
    app.use('/', siteController);

}

module.exports = route;
