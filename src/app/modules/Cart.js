const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Cart = new Schema({
    product_name: { type: String, default: "" },
    user_id: {type: mongoose.Schema.Types.ObjectId, default: ""},
    quantify: {type: Number, default: 1},
    product_id: {type: mongoose.Schema.Types.ObjectId, default: ""},
}, {
    timestamps: true,
});

module.exports = mongoose.model('Cart', Cart);