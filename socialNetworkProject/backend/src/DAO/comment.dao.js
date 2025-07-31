import mongoose from "mongoose";
import commentModel from "../models/comment.model.js";

export const createCommentDao = async ({postId,comment,userId}) => {

return await commentModel.create({
   postId,
   userId,
   comment
})

}

export const findComments = async ( postId)=>{
    return await commentModel.find({
        postId
    })
}