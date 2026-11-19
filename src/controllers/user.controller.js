const followModel=require("../models/follow.model")



/**
 * isme hum code likh rahe hain use ko follow 
 * and unfollow karne ke liye
 */
async function followUserController(req,res) {
    const followerUsername =req.user.username
    const followingUsername =req.user.username

    if(followerUsername===followingUsername){
        return res.status(200).json({
            msg:"You can't follow ypurself"
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







module.exports={
    followUserController,
}