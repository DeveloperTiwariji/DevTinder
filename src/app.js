const express = require("express");

const app = express();


app.get("/user/:userId", (req,res) =>{
    console.log(req.params);
    res.send({name: "Satyam", age: 21});
})

app.post("/user", (req,res) =>{
    console.log(req.query);
    res.send("Data is add to database successfully");
})


app.delete("/user", (req,res) =>{
    res.send("Data is deleted from database successfully");
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})
