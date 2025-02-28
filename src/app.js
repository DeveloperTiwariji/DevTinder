const express = require("express");

const app = express();


app.use("/user", (req,res, next)=>{
    console.log("Handling the route user!!");
    next();
}, (req,res,next)=>{
    console.log("Handling the route user 2!!!");
    // res.send("User page");
    next();
},(req,res, next)=>{
    console.log("Handling the route user3!!");
    res.send("User page");
    // next();
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
    
})
