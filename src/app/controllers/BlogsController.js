const Blog = require('../modules/Blogs');
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose')

class BlogsController {

    index(req, res, next) {
        var per_page = req.params.per_page ?? 2;
        var page = 1;
        var quantifySkip = (page - 1) * parseInt(per_page);
        Blog.find({})
            .skip(quantifySkip)
            .limit(per_page)
            .then(blogs => {
                res.render('blogs', {blogs: multipleMongooseToObject(blogs), page_active: page})
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

    // [GET] blogs/page/:page
    changePage(req, res, next) {
        var per_page = req.params.per_page ?? 2;
        var page = parseInt(req.params.page);
        var quantifySkip = (page - 1) * parseInt(per_page);
        Blog.find({})
            .skip(quantifySkip)
            .limit(per_page)
            .then(blogs => {
                res.render('blogs', {blogs: multipleMongooseToObject(blogs), page_active: page})
            })
            .catch(next);
    }

    // [GET] /Blogs/category/:slug
    category(req, res, next) {
        Blog.find({slug_category: req.params.slug})
            .then(blogs => {
                res.render('blog/category', { blogs : multipleMongooseToObject(blogs), title: req.params.slug});
            })
            .catch(next);
    }

}

module.exports = new BlogsController;