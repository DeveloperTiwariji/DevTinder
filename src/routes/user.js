const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const connectionReqest = require("../models/connectionRequests");

const USER_SAFE_DATA = "firstName lastName age gender skills photoUrl";
userRouter.get("/user/requests/received", userAuth, async (req,res)=>{
    try{
        const loggedInUser = req.user;
        const connectionReqests = await connectionReqest.find({
           toUserId:loggedInUser._id,
           status:"interested", 
        }).populate("fromeUserId", USER_SAFE_DATA);
    
        res.json({
            message: "Data fetched successfully",
            data:connectionReqests,
        });
    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res)=>{
    try{
        const loggedInUser = req.user;

        const connectionReqests = await connectionReqest.find({
            $or:[
                {fromeUserId:loggedInUser._id, status:"accepted"},
                {toUserId:loggedInUser._id, status: "accepted"},
            ]
        }).populate("fromeUserId", USER_SAFE_DATA ).populate("toUserId", USER_SAFE_DATA);

        const data = connectionReqests.map((row)=> {
            if(row.fromeUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromeUserId;
        });

        res.json({data});
    }catch(err){
        res.status(400).send("Error: "+err.message);
    }
})


module.exports = userRouter;