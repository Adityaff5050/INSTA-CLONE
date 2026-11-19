const express=require("express")
const cookieParser=require("cookie-parser")


/**require routes */
const authRouter=require("./routes/auth.routes")
const postRouter=require("./routes/post.route.js")
const userRouter = require("./routes/user.routes.js")

const app=express()
app.use(express.json())
app.use(cookieParser())


/** using routes*/
app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
app.use('/api/users',userRouter)

module.exports=app