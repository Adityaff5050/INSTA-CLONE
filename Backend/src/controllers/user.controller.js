const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

/**
 * isme hum code likh rahe hain use ko follow 
 * and unfollow karne ke liye
 */
async function followUserController(req,res) {
    const followerUsername =req.user.username
    const followingUsername =req.params.username

    if(followerUsername===followingUsername){
        return res.status(400).json({
            msg:"You can't follow yourself"
        })
    }
    const isUserExists = await userModel.findOne({ username: followingUsername })
if (!isUserExists) {
    return res.status(404).json({ msg: "User not found" })
}
        const isAlreadyFollowing=await followModel.findOne({
            follower:followerUsername,
            following:followingUsername
        })
        if(isAlreadyFollowing){
        if(isAlreadyFollowing.status === "pending"){
            return res.status(409).json({
                msg: `Request already sent to ${followingUsername}`,
                follow:isAlreadyFollowing
            })
        }
        if (isAlreadyFollowing.status === "accepted") {
    return res.status(409).json({
        msg: `You already follow ${followingUsername}`
    })
}
    // status "rejected" hai: purane record ko hi wapas pending karo
    isAlreadyFollowing.status = "pending"
    await isAlreadyFollowing.save()

    return res.status(200).json({
        msg: `You sent a request to ${followingUsername}`,
        followRecord: isAlreadyFollowing })



    }

    const followRecord=await followModel.create({
        follower:followerUsername,
        following:followingUsername
    })
res.status(201).json({
    msg:`You sent a request to ${followingUsername}`,
    followRecord
})

}
/**
 * unfollow logic implimented
 */
async function unfollowUserControlller(req,res){
const followerUsername=req.user.username
const followingUsername=req.params.username

const isUserFollowing=await followModel.findOne({
        follower:followerUsername,
        following:followingUsername
})
if (!isUserFollowing){
    return res.status(404).json({
    msg:`You are not following ${followingUsername} this person`
    })
}
await followModel.findByIdAndDelete(isUserFollowing._id)
res.status(200).json({
    msg:`You have now unfollow ${followingUsername}`
})
}

async function getFollowRequestController(req,res){
    const currentUser=req.user.username

const penRequest= await followModel.find({
    following:currentUser,
    status:"pending"
})
res.status(200).json({
    requests:penRequest
})




}



module.exports={
    followUserController,
    unfollowUserControlller,
     getFollowRequestController
}