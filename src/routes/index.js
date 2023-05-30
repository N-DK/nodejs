
const aboutController = require('./about');
const shopController = require('./shop');
const blogsController = require('./blogs');
const contactController = require('./contact');

function route(app) {

    app.use('/about', aboutController);
      
    app.use('/shop', shopController);

    app.use('/blogs', blogsController);

    app.use('/contact', contactController);

    app.get('/', (req, res) => {
        res.render('home');
    })
}

module.exports = route;
