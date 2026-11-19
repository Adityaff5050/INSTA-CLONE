const followModel=require("../models/follow.model")



/**
 * isme hum code likh rahe hain use ko follow 
 * and unfollow karne ke liye
 */
async function followUserController(req,res) {
    const followerUsername =req.user.username
    const followingUsername =req.params.username

    if(followerUsername===followingUsername){
        return res.status(200).json({
            msg:"You can't follow ypurself"
        })
    }
        const isAlreadyFollowing=await followModel.findOne({
            follower:followerUsername,
            following:followingUsername
        })
        if(isAlreadyFollowing){
            return res.status(409).json({
                msg:`You already following ${followerUsername}`,
                follow:isAlreadyFollowing
            })
        }

    const followRecord=await followModel.create({
        follower:followerUsername,
        following:followingUsername
    })
res.status(200).json({
    msg:`You are now following ${followingUsername}`,
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
    return res.status(200).json({
    msg:`You are not following ${followingUsername} this person`
    })
}
await followModel.findByIdAndDelete(isUserFollowing._id)
res.status(200).json({
    msg:`You have now unfollow ${followingUsername}`
})
}





module.exports={
    followUserController,
    unfollowUserControlller
}