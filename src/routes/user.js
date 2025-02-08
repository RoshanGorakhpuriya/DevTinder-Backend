const express = require("express");

const userRouter = express.Router();

const {userAuth} = require("../middleware/auth");

const ConnectionRequest = 
require("../model/connectionRequest")


//get all the pending connection request for the logged in user   
userRouter.get("/user/requests/recieved" , userAuth , async(req , res) =>{
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId : loggedInUser._id,
            status : "interested"
        }).populate("fromUserId" , ["firstName" , "lastName" , "photoUrl" , "skills" , "about"]);

        res.json({
            message : "Data fetched successfully",
            data : connectionRequests,
        });
    }
    catch(err){
        res.status(400).send("ERROR:"+err.message);
    }
})

//show that user has how many connection
//via -> accepted
userRouter.get("/user/connections" , userAuth , async(req , res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or : [
                {
                    toUserId : loggedInUser._id ,
                    status : "accepted"
                },
                {
                    fromUserId : loggedInUser._id,
                    status : "accepted"
                }
            ],
        }).populate("fromUserId" , ["firstName" , "lastName" , "skills" , "about" , "photoUrl"])
        .populate("toUserId" , ["firstName" , "lastName" , "skills" , "about" , "photoUrl"]);

        const data = connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({data});
    }
    catch(err){
        res.status(400).send({message : err.message});
    }
});
module.exports = userRouter;