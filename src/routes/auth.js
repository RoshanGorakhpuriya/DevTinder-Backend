const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
const User = require("../model/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup" , async (req , res)=>{
    try{
        validateSignUpData(req);

        const {firstName , lastName , email , password} = req.body;

        // Encrypt the password;
        const passwordHash = await bcrypt.hash(password , 10);

        console.log(passwordHash);
        const  user= new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
        });
        const savedUser = await user.save();
        const token = await savedUser.getJWT();

        res.cookie("token" , token , {
           expires : new Date (Date.now() + 8 * 3600000),
        });

        res.json({message : "User Added Successfully",
            data : savedUser});
    }
    catch(err){
        res.status(400).send(err.message);
    } 
});


authRouter.post("/login" , async(req , res)=>{
    try{
        const{email , password} = req.body;

        const user = await User.findOne({email : email});

        if(!user){
            throw new Error("Invalid Credential");
        }

        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){
            const token = await user.getJWT();

            res.cookie("token" , token , {
                expires : new Date(Date.now() + 8 * 3600000) // expires after 8 hours
            });
            res.send(user);
        }
        else{
            throw new Error("ERROR : Invalid Credentails");
        }
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

authRouter.post("/logout" , async(req , res)=>{
    res.cookie("token" , null , {
        expires:new Date(Date.now()),
    });
    res.send("Logout successful");
});



module.exports = authRouter;