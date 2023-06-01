
const blogsController = require('./blogs');
const siteController = require('./site');

function route(app) {

    app.use('/blogs', blogsController);

    app.use('/', siteController);

}

module.exports = route;
