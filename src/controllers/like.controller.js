const likeModel=require("../models/like.model")
const postModel=require("../models/posts.model")




async function likePostController(req,res){
const userId=req.user.id
const postId=req.params.postId

const post= await postModel.findById(postId)
if(!post){
    return res.status(404).json({
        msg:"post not found"
    })
}
const ispostLikesAlreadyExists=await likeModel.findOne({
    userId:userId,
    postId:postId
})
if(ispostLikesAlreadyExists){
            return res.status(409).json({
                msg:`You already like this post ${postId}`,
                
            })
        }
await likeModel.create({
    userId,
    postId
})
res.status(201).json({
    msg:`You liked this post ${postId}`
})
}

async function unlikePostController(req,res){

  const  userId=req.user.id
   const postId=req.params.postId

    const isdeletedLike=await likeModel.findOneAndDelete({
postId:postId,
userId:userId
    })
    if(!isdeletedLike){
        return res.status(404).json({
            msg:"you have not liked this post"
        })
    }
res.status(200).json({
    msg:`You have now unLike ${postId}`
})
}












module.exports={
    likePostController,
    unlikePostController
}