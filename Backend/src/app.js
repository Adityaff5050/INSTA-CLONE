const express=require("express")
const cookieParser=require("cookie-parser")
const cors=require("cors")

/**require routes */
const authRouter=require("./routes/auth.routes")
const postRouter=require("./routes/post.route.js")
const userRouter = require("./routes/user.routes.js")
const likeRouter=require("./routes/like.routes.js")


const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    /**
     * jab humne withCredential true frontend siede bola hain 
     * to cookie set karne ke humein backend side per
     * credentials:true and origin:"http://localhost:5173" bhi 
     * batana padta hain"
     */
    credentials:true ,
     origin:"http://localhost:5174"
}))


/** using routes*/
app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
app.use('/api/users',userRouter)
app.use('/api/likes',likeRouter)



module.exports=app