const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    userEmail:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
},{
    timestamps:true
})
const userModel=mongoose.model("users",UserSchema)
module.exports={userModel}