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

const connectDB = require("./config/database")

const app = express();

const User = require("./model/user");

app.use(express.json());

app.post("/signup" , async (req , res)=>{
    const user= new User(req.body);
    try{
        await user.save();
        res.send("User Added Successfully");
    }
    catch(err){
        res.status(400).send("Error Occures in DB")
    }
    
})

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




