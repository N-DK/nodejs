
const mongoose = require('mongoose');

async function connect() {
    
    try {
        // show loading
        await mongoose.connect(process.env.MONGODB_CONNECT_URI);
        console.log("Connect successfully");
        // hide loading
    } catch (error) {
        console.log("Connect failure" + error.message);
    }

}

module.exports = { connect }