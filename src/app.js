const express = require("express");
const connectDB =require("./config/database");
const app = express();
const User = require("./models/user");
const validateSignUpData = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jsonwebtoken = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");
// app.use(express.json());

app.use(express.json());
app.use(cookieParser());
 

app.post("/signup", async (req,res)=>{

    try {
        validateSignUpData(req);
        const {firstName, lastName, email, password} = req.body;

        const bcryptPassword = await bcrypt.hash(password, 10);
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

 app.post("/login", async (req,res)=>{

    const {email, password} = req.body;

    try{

        const user = await User.findOne({email:email});
        if(!user){
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid){

        const token = jsonwebtoken.sign({_id:user._id},"Sattu01@A", {expiresIn:"1d"});

        
        res.cookie("token", token, {expires: new Date(Date.now() +8*3600000)});

            res.send("Login successful");
        }else{
            throw new Error("Login failed");
        }

    }catch (error) {

        res.status(500).send("Error: "+ error.message);
    }
 })

 app.post("/profile", userAuth, async (req,res)=>{

   try{ 
    const user = req.user;
    res.send(user);
}catch (error) {
       
        res.status(500).send("Error: "+ error.message);
    }
})


app.post("/sendConnectionRequest",userAuth, async (req, res)=>{
    console.log("Sending a connection request");

    const user = req.user;


    res.send(user.firstName+ " send the connection request");
})
 


app.get("/user", async (req,res)=>{

    const userEmail = req.body.email;

    try{
        const user = await User.findOne({email:userEmail});
        if(!user){
            res.status(404).send("User not found");
        }else{
            res.send(user);
        }
    }catch(error){
        console.error("Error finding user:", error);
        res.status(500).send("Error finding user");
    }
})


app.get("/feed", async (req,res)=>{
    try{
        const users = await User.find({});
        if(users.length === 0){
            res.status(404).send("No users found");
        }else{
            res.send(users);
        }
    }catch(error){
        res.status(500).send("Error finding users");
    }
})


app.delete("/user", async (req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }catch(error){
        res.status(500).send("Error deleting user");
    }
})


 
app.patch("/user:/userId", async (req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;
    try{
        const ALLOWED_UPDATES = ["photoUrl","about", "gender", "skills", "age"];
        const isUpdateAllowed = Object.keys(data).every((key)=>ALLOWED_UPDATES.includes(key));
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }
        if(data?.skills.length >10){
            throw new Error("Skills cannot be more than 10");
        }
        const user = await User.findByIdAndUpdate({_id:userId}, data);
        runValidators:true;
        res.send("User updated successfully");
    }catch(error){
        res.status(500).send("Error updating user");
    }
})




connectDB().then(()=>{
    console.log("Connected to the database");
    app.listen(3000, ()=>{
        console.log("Server is running on port 3000");
        
    });
}).catch((err)=>{
    console.error("Error connecting to the database");
})

