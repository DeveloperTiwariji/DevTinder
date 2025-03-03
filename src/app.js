const express = require("express");
const connectDB =require("./config/database");
const app = express();
const User = require("./models/user");

// app.use(express.json());

app.use(express.json());


app.post("/signup", async (req,res)=>{
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User created successfully");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }
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

