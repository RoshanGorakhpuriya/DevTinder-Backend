const express = require("express");

const app = express();

app.use("/" , (req , res)=>{
    res.send("Server");
})

app.use("/test" , (req , res)=>{
    res.send("Test");
})

app.use("/hello" , (req, res)=>{
    res.send("Hello Server");
})

app.listen(3000 , ()=>{
    console.log("Server established successfully\n");
})
