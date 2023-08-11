const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profileimage:{
        type:String
    },
    bio:{
        type:String,
        default: "Hi👋 Welcome To My Profile"
    },
    website:{
        type:String,
        trim:true
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }],
    saved:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }],
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
},{timestamps:true})

const User = mongoose.model("User",userSchema)
module.exports = User