import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    //_id
    imageUrl:{
        type: String,
        required: true,
    },
    caption:{
        type: String,
        required: true,

    },
    user:{
        type : mongoose.Schema.Types.ObjectId,//this is the id of user who posted this post//token se nikal lenge.
        ref:"user",//model name ha ye
        required: true,
    },
    mentions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    
    likeCount: {
        type: Number,
        default : 0

    }

},{
    timestamps:true
})

export default mongoose.model("post", postSchema)