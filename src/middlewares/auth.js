const jwt = require("jsonwebtoken");
const User = require("../models/user");
// const { cookie } = require("express/lib/response");


const userAuth = async (req,res, next)=>{
    try{
        // const cookie = req.cookie;
        const {token} = req.cookies;
        console.log(token);
        if(!token){
            throw Error("Token not found!!!!");
        }
        const decodedObj = await jwt.verify(token, "Sattu01@A");

        const {_id} = decodedObj;

        const user =  await User.findById(_id);

        if(!user){
            throw Error("User not found");
        }
        req.user = user;
        next();  
    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }
}


module.exports ={userAuth};