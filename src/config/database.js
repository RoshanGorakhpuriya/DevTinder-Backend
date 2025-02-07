const mongoose = require("mongoose");
const connectDB = async ()=>{
        await mongoose.connect("mongodb+srv://roshangorakhpuriya:DGUQnxcVEriZaenG@devtinder.l3ygg.mongodb.net/"
        );
}
module.exports = connectDB;