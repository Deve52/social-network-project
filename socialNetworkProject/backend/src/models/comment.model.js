import mongoose from "mongoose";

let commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: true
    },
    comment:{
        type: String,
        required: true,
    },
    parentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comment",
        default: null
    }
}, {
    timestamps: true
})

export default mongoose.model("comment", commentSchema)