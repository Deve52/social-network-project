import mongoose from "mongoose";

let likeSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true,

    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"post",
        required: true,
    }
},
    { timestamp: true }// this will note the time of creation !
)


export default mongoose.model("like",likeSchema)


