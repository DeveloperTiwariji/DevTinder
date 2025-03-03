const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:4,
        maxlength:20,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,

    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:128,
        
    },
    age:{
        type:Number,
        min:18,
        max:100,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender Data is not valid");
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://www.google.com",

    },
    about:{
        type:String,
        maxlength:500,
    },
    skills:{
        type:[String],
    }
}, {timestamps:true});



const User = mongoose.model("User", userSchema);
module.exports  =User;