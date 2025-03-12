const express = require("express");
const User = require("../models/user");
const {validateSignUpData} = require("../utils/validation");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req,res)=>{

    try {
        validateSignUpData(req);
        const {firstName, lastName, email, password} = req.body;

        const bcryptPassword = await bcrypt.hash(password, 7);
        // console.log(bcryptPassword);
        const user  = new User({
            firstName,
            lastName,
            email,
            password:bcryptPassword
        });
        await user.save();
        res.send("User created successfully");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error: "+ error.message);
    }
})

authRouter.post("/login", async (req,res)=>{

    const {email, password} = req.body;

    try{

        const user = await User.findOne({email:email});
        if(!user){
            throw new Error("User not found");
        }

        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){

        const token = await user.getJWT();
        
        res.cookie("token", token, {expires: new Date(Date.now() +8*3600000)});

            res.send("Login successful");
        }else{
            throw new Error("Login failed");
        }

    }catch (error) {

        res.status(500).send("Error: "+ error.message);
    }
 })


 authRouter.post("/logout", (req,res)=>{
    res.cookie("token", null, {expires: new Date(Date.now())});

    res.send("Logout Successfully");
 })


module.exports = authRouter;