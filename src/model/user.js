const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName :{
        type : String,
        required : true,
        minLength : 3,
        maxLength : 20
    },
    lastName :{
        type : String,
    },
    email :{
        type :String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    password :{
        type : String,
        required : true
    },
    age :{
        type : Number,
    },
    gender : {
        type : String,
        validate(value){
            if(!["male" , "female" , "others"].includes(value)){
                throw new error("Gender data is not valid");
            }
        }
    },
    about : {
        type : String,
        default : "This is default description of user"
    }
},{
    timestamps:true
});

module.exports = mongoose.model("User" , userSchema);