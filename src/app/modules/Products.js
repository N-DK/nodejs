const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Product = new Schema({
    name: { type: String, default: "" },
    desc: { type: String, default: "Nothing information" },
    image: { type: String},
    category: { type: String},
    cost: {type: Number},
    discount: {type: mongoose.Types.Decimal128},
    hot: {type: Boolean, default: false},
    new: {type: Boolean, default: false},
    slug: { type: String, slug: "name" },
    slug_category: {type: String, slug: "category"},
}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', Product);