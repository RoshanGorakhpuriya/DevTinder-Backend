const mongoose = require("mongoose");

const connectDB = async ()=>{
        await mongoose.connect("mongodb+srv://roshangorakhpuriya1:1gqtXFT9G5sCfRBf@devtinder.hrih9.mongodb.net/"
        );
}

module.exports = connectDB;

