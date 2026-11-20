const mongoose=require("mongoose")

const likeSchema = new mongoose.Schema({
    userId:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    postId:{
        ref:"posts",
        type:mongoose.Schema.Types.ObjectId,
        required: true
    }
},{timestamps:true})
likeSchema.index({post:1})
const likeModel=mongoose.model("likes",likeSchema)


module.exports=likeModel
