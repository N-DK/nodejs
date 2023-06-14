const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Cart = new Schema({
    product_id: {type: Schema.Types.ObjectId},
    user_id: {type: Schema.Types.ObjectId, default: 0},
    product_name: { type: String, default: "" },
    product_image: {type: String, default: ""},
    product_price: {type: Number, default: ""},
    quantify: {type: Number, default: 1},
    total_price: {type: Number, default: 0},
    product_slug: { type: String, slug: "product_name" }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Cart', Cart);