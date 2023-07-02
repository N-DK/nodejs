
const mongoose = require('mongoose');

async function connect() {
    
    try {
        // show loading
        // process.env.MONGODB_CONNECT_URI
        await mongoose.connect('mongodb://127.0.0.1/ndk_sellWatch_dev');
        console.log("Connect successfully");
        // hide loading
    } catch (error) {
        console.log("Connect failure" + error.message);
    }

}

module.exports = { connect }