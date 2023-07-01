const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Blog = new Schema({
    name: { type: String, default: "" },
    content: { type: String, default: "Nothing information" },
    image: { type: String},
    category: { type: String},
    slug: { type: String, slug: "name" },
    slug_category: {type: String, slug: "category"},
}, {
    timestamps: true,
});

module.exports = mongoose.model('Blog', Blog);