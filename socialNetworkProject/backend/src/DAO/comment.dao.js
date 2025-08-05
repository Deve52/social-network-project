import mongoose from "mongoose";
import commentModel from "../models/comment.model.js";

export const createCommentDao = async ({postId,comment,userId,parentId=null}) => {

return await commentModel.create({
   postId,
   userId,
   comment,
   parentId
})
}

export const findComments = async ({postId})=>{
    return await commentModel.find({
        postId,
        parentId: null
    })
    .skip()
    .limit(5)
    
}

export const findReplies = async ({commentId})=>{
    return await commentModel.find({
       parentId:commentId  
    }).
    limit(5)
}
