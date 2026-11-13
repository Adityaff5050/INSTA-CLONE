const userModel=require("../models/user.model")
const cryoto=require("crypto")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")



async function registerController(req,res){
const {email,username,password,bio,profileImage}=req.body

/* const isuserExistByEmail=await userModel.findOne({email})
if(isuserExistByEmail){
    return res.status(409).json({
        msg:"email already exist plz try diff. email"
    })
}
const isUserExistsByUsername=await userModel.findOne({username})
if(isUserExistsByUsername){
    return res.status(409).json({
        msg:"this user name already  exists plz make diff. user name"
    })
}*/

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
const hash = await bcrypt.hash(password,10)

const user =await userModel.create({
    username,
    email,
    bio,
    profileImage,
    password:hash
})
const token =jwt.sign({
    id:user._id
},process.env.JWT_SECRET)
res.cookie("token",token)

res.status(201).json({
msg:"ser registered succesfully",
username:user.username,
email:user.email,
bio:user.bio,
profileImage:user.profileImage
})
}

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

if(!user){
    return res.status(409).json({
        msg:"User not found" 
    })
}


const isPasswordValid= await bcrypt.compare(password,user.password)

if(!isPasswordValid){
    return res.status(401).json({
        msg:"invalid password"
    })
}
const token=jwt.sign({
    id:user._id
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



