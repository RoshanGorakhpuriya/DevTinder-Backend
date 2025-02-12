const mongoose = require("mongoose");
const connectDB = async ()=>{
        await mongoose.connect("mongodb+srv://roshangorakhpuriya:0OYnIkd2SND9sm7T@devtinder.xmooa.mongodb.net/?retryWrites=true&w=majority&appName=DevTinder"
        );
}
module.exports = connectDB;
