const mongoose = require("mongoose");

const connectDB = async ()=>{
        await mongoose.connect("mongodb+srv://roshangorakhpuriya:AjHgQNQSOamuN5Mg@nodejs.l3ygg.mongodb.net/"
        );
}

module.exports = connectDB;