
class BlogsController {

    index(req, res) {
        res.render('blogs');
    }

}

module.exports = new BlogsController;