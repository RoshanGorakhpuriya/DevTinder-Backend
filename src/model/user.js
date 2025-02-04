const mongoose = require("mongoose");
const validator = require("validator");
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
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address"+value);
            }
        }
    },
    photoUrl :{
        type : String,
        default : "https://roshanannu.com/images/user-profile.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new error("Invalid url");
            }
        }    
    },
    password : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new error("Enter a Strong Password"+value);
            }
        }
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

userSchema.methods.getJWT = async function(){

    const user = this;
    const token = await jwt.sign({_id : user._id}, "DEV@Tinder$790" , {
        expiresIn : "7d",
    })
    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );
}

module.exports = mongoose.model("User" , userSchema);