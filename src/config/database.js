const mongoose = require("mongoose");
const connectDB = async ()=>{
        await mongoose.connect("mongodb+srv://roshangorakhpuriya:nU1AjvXqebZTlXKr@devtinder.l3ygg.mongodb.net/"
        );
}
module.exports = connectDB;