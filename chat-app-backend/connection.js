const mongoose = require('mongoose');

 const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://dmabuhasib:dmabuhasib@cluster0.wwa72fu.mongodb.net/ChatAppData')
        console.log("db is connected")
    } catch (error) {
        console.log("db is not connected")
        console.log(error)
        process.exit(1)
    }
 }

module.exports= connectDB;