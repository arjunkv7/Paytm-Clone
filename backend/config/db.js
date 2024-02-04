const mongoose = require('mongoose')
const dbUrl = 'mongodb+srv://Arjunroot:TsK6It1f4HvMdGwM@cluster0.scesfd7.mongodb.net/paytm';

async function connectToDb() {
    await mongoose.connect(dbUrl);
    console.log("DB connected successfully");
}

module.exports = connectToDb;