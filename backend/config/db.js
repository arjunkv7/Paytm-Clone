const mongoose = require('mongoose')
const dbUrl = '';

async function connectToDb() {
    await mongoose.connect(dbUrl);
    console.log("DB connected successfully");
}

module.exports = connectToDb;
