const express = require("express");
const {userAuth} = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequests");
const requestRouter = express.Router();
const User = require("../models/user");

requestRouter.post("/sendConnectionRequest",userAuth, async (req, res)=>{
    console.log("Sending a connection request");

    const user = req.user;


    res.send(user.firstName+ " send the connection request");
})

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res)=>{

    try{
        const fromeUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["interested","ignored"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Invalid stauts type: "+ status});
        }

        const toUser  = await User.findById(toUserId);

        if(!toUser){
            return res.status(404).json({message: "User not found!!"});
        }


        const existingConnectionRequest = await connectionRequest.findOne({
            $or:[
                {fromeUserId, toUserId},
                {fromeUserId: toUserId, toUserId:fromeUserId},
            ],
        })

        if(existingConnectionRequest){
            return res.status(400).json({message: "Connection Request Already Exists!!"});
        }


        const connectionRequestData =  new connectionRequest({
            fromeUserId,
            toUserId,
            status,
        });

        const data = await connectionRequestData.save();
        res.json({
            message: req.user.firstName+" is "+status+ " to "+toUser.firstName,
            data:data,
        })

 
    }catch(err){
        res.status(400).send("Error: "+ err.message)
    }
})


module.exports = requestRouter;