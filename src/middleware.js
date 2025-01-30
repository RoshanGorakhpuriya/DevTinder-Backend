const express = require("express");

const app = express();

// app.get("/user" , (req , res , next)=>{
//     console.log("Response 1");
//     //next();
//     res.send("General Routing");
//     next();
// });
// app.get("/user" , (req , res , next)=>{
//     console.log("Response 2");
//     //next();
//     res.send("General Routing 2");
// });

app.get("/admin" , (req , res )=>{
    res.send("Admin Data1");
})

const {adminAuth} = require("./middleware/auth");
app.get("/admin/getData" , adminAuth);

app.get("/user" , adminAuth ,  (req , res )=>{
    res.send("Admin Data1");
})



app.listen(7777 , ()=>{
    console.log("Server launched succesfully");
})