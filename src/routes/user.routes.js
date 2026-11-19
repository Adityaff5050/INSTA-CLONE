const express =require("express")
const userController=require("../controllers/user.controller")
const identifyUser=require("../middlewares/auth.middleware")
const userRouter=express.Router()


/**
 * POST/api/users/follow/:username   follow a user 
 */

userRouter.post("/follow/:username",identifyUser,userController.followUserController)





module.exports=userRouter