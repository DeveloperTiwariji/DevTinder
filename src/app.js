const express = require("express");

const app = express();

app.use((err,req,res,next)=>{
    if(err){
    console.log(err);
    res.status(500).send("Something went worng");
    }else{
        next();
    }
})

app.get("/getuserData", (req,res)=>{
    //throw new Error("ksoehfjs");
    res.send("This is a get request");
})


app.use((err,req,res,next)=>{
    if(err){
    console.log(err);
    res.status(500).send("Something went worng");
    }
})



app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
    
})
