const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Order = new Schema({
    email: {type: String, default: 0},
    products: {type: Array,  default: []},
    shipping: {type: String, default: ""},
    payment_method: {type: String, default: ""},
    total: {type: Number, default: 0}
}, {
    timestamps: true,
});

module.exports = mongoose.model('Order', Order);