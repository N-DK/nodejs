const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const User = new Schema({   
    first_name: {type: String, default: ""},
    last_name: {type: String, default: ""},
    email: {type: String, default: ""},
    password: {type: String, default: ""},
}, {    
    timestamps: true,
})

module.exports = mongoose.model('User', User);