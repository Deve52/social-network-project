import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
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
    }]

})

export default mongoose.model("post", postSchema)