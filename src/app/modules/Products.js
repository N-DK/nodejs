const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name: { type: String, default: "" },
    desc: { type: String, default: "Nothing information" },
    img: { type: String},
    category: { type: String},
    cost: {type: Number},
    discount: {type: Number},
    hot: {type: Boolean, default: false},
    new: {type: Boolean, default: false},
    createAt: {type: Date, default: Date.now}, 
    updateAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Product', Product);