const express=require("express")
const postRouter=express.Router()
const multer=require("multer")
const postController =require("../controllers/post.controller")

const upload=multer({storage:multer.memoryStorage()})
/**
 * post /spi/posts [protected]
 * req.body={caption,image-file}
 */
postRouter.post("/",upload.single("image"),postController.createPostController)

//GET /api/posts/ [protected]
postRouter.get("/",postController.getPostController)

/**
 * GET /api/posts/details/:postid  
 * return the detail about specific post with the id. also check whether 
 * post is brlong to the user that the request come from
 */
postRouter.get("/details/:postId",postController.getPostDetails)


module.exports=postRouter