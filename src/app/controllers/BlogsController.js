const Blog = require('../modules/Blogs');
const { mongooseToObject } = require('../../util/mongoose')

class BlogsController {

    index(req, res) {
        res.render('blogs');
    }

    // [GET] /blog/:slug
    show(req, res, next) {
        Blog.findOne({slug: req.params.slug})
            .then(blog => {
                // res.render('blog/show', {
                //     blog: mongooseToObject(blog),
                // });
                res.json(req.params.slug);
            })       
            .catch(next);
    }

}

module.exports = new BlogsController;