import eventEmitter from "../utils/listener.js";
import { increementPostReplyCount } from "../DAO/post.dao.js";
import { increementCommentReplyCount } from "../DAO/comment.dao.js";

eventEmitter.on("increementPostReplyCount", async (id)=>{
    return await increementPostReplyCount(id)
})

eventEmitter.on("increementCommentReplyCount", async (id)=>{
        return await increementCommentReplyCount(id)
})