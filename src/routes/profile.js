const express = require("express");
const {userAuth} = require("../middlewares/auth");

const profileRouter = express.Router();


profileRouter.post("/profile", userAuth, async (req,res)=>{

    try{ 
     const user = req.user;
     res.send(user);
 }catch (error) {
        
         res.status(500).send("Error: "+ error.message);
     }
 })


 module.exports = profileRouter;
