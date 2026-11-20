const express=require("express")
const identifyUser=require("../middlewares/auth.middleware")
const likeCntroller=require("../controllers/like.controller")

const likeRouter=express.Router()
/**
 * like route created
 * POST/api/likes/liked/:postId
 */
likeRouter.post("/liked/:postId",identifyUser,likeCntroller.likePostController)


/**
 * unlike routesd created
 * POST/api/likes/unlike/:postId
 */
likeRouter.delete("/unlike/:postId",identifyUser,likeCntroller.unlikePostController)


module.exports=likeRouter