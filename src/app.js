const express = require("express");

const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth");


app.use("/admine", adminAuth);

app.get("/user", userAuth, (req, res)=>{
    res.send("User page");
} )


app.get("/admine/getAlldata", (req,res)=>{
    res.send("Home page");
})

app.get("/admine/deleteUser", (req,res) =>{
    res.send("User deleted");
})



app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
    
})
