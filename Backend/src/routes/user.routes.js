const express =require("express")
const userController=require("../controllers/user.controller")
const identifyUser=require("../middlewares/auth.middleware")
const userRouter=express.Router()


/**
 * POST/api/users/follow/:username   follow a user 
 */

userRouter.post("/follow/:username",identifyUser,userController.followUserController)

/**
 * user unfollow feature
 * POST /api/users/unfollow/username
 */

userRouter.post("/unfollow/:username",identifyUser,userController.unfollowUserControlller)


/**
 * handle status pending ,accept,reject
 */
/**GET /api/users/follow-req */
userRouter.get("/follow-req",identifyUser,userController.followUserController)





module.exports=userRouter