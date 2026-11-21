const mongoose=require("mongoose")

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"user already exists"],
        required:[true,"User name is required"]
    },
    email:{
    type:String,
    unique:[true,"email already exists"],
    required:[true,"email is required"]
    },
    password:{
    type:String,
    required:[true,"password is required"]
    },
    bio:String,
    profileImage:{
    type:String,
    default:"https://ik.imagekit.io/papatiwari007/default_user.jpg",
    },
    
 
},{timestamps:true})
    
const userModel=mongoose.model("users",userSchema)

module.exports=userModel