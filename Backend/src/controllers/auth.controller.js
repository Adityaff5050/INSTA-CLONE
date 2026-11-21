const userModel=require("../models/user.model")
const cryoto=require("crypto")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")


//registration//
async function registerController(req,res){
const {email,username,password,bio,profileImage}=req.body


const isUserAlreadyExists=await userModel.findOne({
    $or:[
        {username},
        {email}
    ]
})
if(isUserAlreadyExists) {
    return res.status(409).json({
        msg:"user already exists" + (isUserAlreadyExists.email===email? 
            "email already exists" :"username already exists")
    })
}
console.log("REGISTER BODY:", req.body)
const hash = await bcrypt.hash(password,10)

const user =await userModel.create({
    username,
    email,
    bio,
    profileImage,
    password:hash
})
const token =jwt.sign({
    id:user._id,
    username:user.username
},process.env.JWT_SECRET)
res.cookie("token",token)

res.status(201).json({
msg:"user registered succesfully",
username:user.username,
email:user.email,
bio:user.bio,
profileImage:user.profileImage
})
}
//login//

async function loginController(req,res){
    const {username,email,password}=req.body

    const user=await userModel.findOne({
       $or: [{
            username:username
        },
    {
        email:email
    }]
})
console.log("BODY:", req.body)
    console.log("USER:", user?.username, user?.email)

if(!user){
    return res.status(409).json({
        msg:"User not found" 
    })
}

console.log("HASH:", user.password)
const isPasswordValid= await bcrypt.compare(password,user.password)

if(!isPasswordValid){
    return res.status(401).json({
        msg:"invalid password"
    })
}
const token=jwt.sign({
    id:user._id,username:user.username
},process.env.JWT_SECRET)

res.cookie("token",token)

res.status(200).json({
    msg:"User LoggedIn Successfully",
    username:user.username,
    email:user.email,
    bio:user.bio,
    profileImage:user.profileImage
})

}


module.exports={
    registerController,
    loginController
}



