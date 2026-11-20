const mongoose=require("mongoose")

const likeSchema = new mongoose.Schema({
    user:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    post:{
        ref:"posts",
        type:mongoose.Schema.Types.ObjectId,
        required: true
    }
},{timestamps:true})
likeSchema.index({post:1})
const likeModel=mongoose.model("likes",likeSchema)


module.exports=likeModel
