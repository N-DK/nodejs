const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Order = new Schema({
    user_id: {type: Schema.Types.ObjectId, default: new mongoose.Types.ObjectId("5962a5f37bde228394da6f72")},
    email: {type: String, default: 0},
    products: {type: Array,  default: []},
    shipping: {type: Number, default: 0},
    payment_method: {type: String, default: ""},
    total: {type: Number, default: 0},
    key: {type: String, default: ""},
}, {
    timestamps: true,
});

module.exports = mongoose.model('Order', Order);