
const blogsController = require('./blogs');
const siteController = require('./site');
const productsController = require('./products');

function route(app) {

    app.use('/blogs', blogsController);

    app.use('/product', productsController);

    app.use('/', siteController);

}

module.exports = route;
