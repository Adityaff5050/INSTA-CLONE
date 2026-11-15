const postModel=require("../models/posts.model")
const Imagekit=require("@imagekit/nodejs")
const {toFile}=require("@imagekit/nodejs")
const jwt=require("jsonwebtoken")

const imagekit=new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){

console.log(req.body,req.file);

const file=await imagekit.files.upload({
file:await Imagekit.toFile(Buffer.from(req.file.buffer),'file'),
fileName:"test",
folder:"insta-clone"
})

//how to check who created post ln 15 to ln 33 //
const token=req.cookies.token

if(!token){
    return res.status(401).json({
        msg:"You have not Token , Unsthorized access"
    })
}
let decoded
try{
decoded=await jwt.verify(token,process.env.JWT_SECRET)
}catch(err){
return res.status(401).json({
    msg:"user not authorized"
})
}
const post =await postModel.create({
    caption :req.body.caption,
    imgUrl:file.url,
    user:decoded.id
})

res.status(201).json({
    msg:"post created successfully",
    post
})

}
/**
 *  fetching a posts
 */

async function getPostController(req,res) {
    
    const token =req.cookies.token
    
     if(!token){
        return res.status(404).json({
            msg:"Unauthorized access"
        })
    }

    let decoded
    try{
    decoded=jwt.verify(token,process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            msg:"Token invalid"
        })
    }

    const UserId=decoded.id

    const posts=await postModel.find({
        user:UserId
    })
    res.status(200).json({
        msg:"post fetched successfully",
        posts
    })


}


/**
 *  finding a posts details
 */
async function getPostDetails(req,res) {
    const token=req.cookies.token
    if(!token){
        return res.status(404).json({
            msg:"Unauthorized access"
        })
    }

    let decoded
    try {
        decoded=jwt.verify(token,process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            msg:"invalid token"
        })
    }

    const userId=decoded.id
    const postId=req.params.postId

const post=await postModel.findById(postId)

if(!post){
    return res.status(404).json({
        msg:"post not found"
    })
}
const isValidUser=post.user===userId

if(!isValidUser){
    res.status(403).json({
        msg:"Forbidden content"
    })
}

return res.status(200).json({
    msg:"Post Fetched Successfully",
    post
})


}

module.exports={
    createPostController,
    getPostController,
    getPostDetails
}