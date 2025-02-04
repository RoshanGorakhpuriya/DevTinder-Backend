/*
create a server
Intialize the repo
node_modules , package.json , package-lock.json
Install express
Create a server
Listen to port 7777
Write request handlers for /hello and /test
Install nodemon nad update scripts  inside package.json
What are dependencies?
What is use of "-g" while npm install
D/B caret and tilde in express verison
*/
const express = require("express");

const bcrypt = require("bcrypt");

const connectDB = require("./config/database");

const app = express();

const User = require("./model/user");

const {validateSignUpData} = require("./utils/validation");

const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");

const {userAuth} = require("./middleware/auth.js");

app.use(express.json());
app.use(cookieParser());

app.post("/signup" , async (req , res)=>{
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
        await user.save();
        res.send("User Added Successfully");
    }

    catch(err){
        res.status(400).send(err.message);
    } 
})

app.post("/sendConnectionRequest" , userAuth , async(req , res)=>{
    const user = req.user;

    console.log("Send connection request");
    res.send(user.firstName + " Connection Request Sent");
})

app.post("/login" , async(req , res)=>{
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
            res.send("Login Successfully");
        }
        else{
            throw new Error("Password is not correct");
        }
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

app.get("/profile", userAuth , async(req , res)=>{
    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    } 
});

// get user by id
app.get("/userId" , async(req , res)=>{                                                    
    const userId = req.body.id;      

    try{
        const users = await User.findById(userId);

        res.send(users);
    }
    catch(err){
        res.status(404).send("User not found");
    }
})

// get user by Id and delete this
app.delete("/userId" , async(req , res)=>{
    const userId = req.body.id;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted Successfully");
    }
    catch(err){
        res.status(404).send("User not found");
    }
});

//get user by email

app.get("/user" , async(req , res)=>{
    const userEmail = req.body.email;

    try{
        const users = await User.findOne({email : userEmail});

        if(users.length === 0){
            res.status(404).send("User Not Found");
        }
        else{
            res.send(users);
        }
    }
    catch(err) {
        res.status(400).send("Something went wrong");
    }
})

// get id and updtae the data
app.patch("/user/:userId" , async(req , res)=>{
    const userId = req.body.id;
    const data = req.body;

    try{
        const ALLOWED_UPDATES = [
            "photoUrl",
            "about",
            "gender",
            "age",
            "skills"
        ]

        const isUpdateAllowed = Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k)
        );
        if(!isUpdateAllowed){
            throw new error("Update not allowed");
        }
        const users = await User.findByIdAndUpdate(userId , data);  
        res.send("user Updated successfully");
    }
    catch(err){
        res.status(404).send("Update Failed");
    }
})

//get all the user form the database;

app.get("/feed" , async(req , res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send("Somethings went wrong");
    }
});

connectDB().then(()=>{
    console.log("Database connection established");
    app.listen(7777 , ()=>{
        console.log("Server Launched Successfully");
    })
})
.catch((err)=>{
    console.log("Connection not established");
});

// connectDB()
//    .then(()=>{
//     console.log("Database connection establiished");
//     app.listen(7777 , ()=>{
//         console.log("Launched successfully");
//     });
//   })
//    .catch((err)=>{
//     console.error("Databse can not connected");
//    });

// app.use("/hello/2" , (req , res)=>{
//     res.send("Hello ");
// })

// app.use("/hello" , (req , res)=>{
//     res.send("aabrakadabra");
// })

// app.use("/test" , (req , res)=>{
//     res.send("Test Server");
// })
// app.use("/" , (req , res)=>{
//     res.send("Server Established");
// })

// app.use("/user" , (req , res)=>{
//     res.send("General route");
// })

// app.get("/user" , (req , res)=>{
//     res.send({"firstName" : "Roshan" , "lastName" : "Gorakhpuriya"})
// })

// app.post("/user" , (req , res)=>{
//     res.send("Data retrieve Successfully");
// })

// app.delete("/user" , (req , res)=>{
//     res.send("Data Delete successfully");
// })




