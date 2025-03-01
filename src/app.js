const express = require("express");
const connectDB =require("./config/database");
const app = express();
const User = require("./models/user");

// app.use(express.json());


app.post("/signup", async (req,res)=>{
    // const { firstName, lastName, email, password, age } = req.body;
    
    const user = new User({
        firstName:"Satyam",
        lastName:"Tiwari",
        email:"tiwarisittu@gmail.com",
        password:"satyam123",
        age:20,
    });
    try {
        await user.save();
        res.send("User created successfully");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
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

