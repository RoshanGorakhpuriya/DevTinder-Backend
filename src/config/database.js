const mongoose = require("mongoose");
const connectDB = async ()=>{
        await mongoose.connect("mongodb+srv://roshangorakhpuriya:dCVvQrSZRQn5mhvn@devtinder.l3ygg.mongodb.net/"
        );
}
module.exports = connectDB;