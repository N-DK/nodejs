const Blog = require('../modules/Blogs');
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose')

class BlogsController {

    index(req, res, next) {
        Blog.find({})
            .then(blogs => {
                res.render('blogs', {blogs: multipleMongooseToObject(blogs)})
            })
            .catch(next);
    }

    // [GET] /blogs/:slug
    show(req, res, next) {
        Blog.findOne({slug: req.params.slug})
            .then(blog => {
                res.render('blog/show', {
                    blog: mongooseToObject(blog),
                });
            })       
            .catch(next);
    }

    // [GET] blogs/create
    create(req, res, next) {
        res.render('blog/create');
    }
    
    // [POST] blogs/store
    async store(req, res, next) {
        const blog = new Blog(req.body);
        await blog.save()
            .then(() => res.redirect('/blogs')); 
    }


}

module.exports = new BlogsController;