const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connect to DB")
    } catch (err) {
        console.log("There are some error to connect DB ", err)
    }
}

module.exports = connectDB;