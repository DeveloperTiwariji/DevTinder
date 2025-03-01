const mongoose = require("mongoose");


const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://Srish01:xkJ3P884fg3k93TF@cluster0.jhme4.mongodb.net/devTinder");
};



module.exports = connectDB;