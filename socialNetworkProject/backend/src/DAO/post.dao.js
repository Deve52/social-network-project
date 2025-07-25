import postModel from '../models/post.model.js';

export const createPost = async (userId, caption, mentions, imageUrl) => {
   return await postModel.create({
        user: userId,
        caption,
        mentions,
        imageUrl
    });  
}

export const checkPost = async (postId) => {
    return await postModel.findOne({
        _id: postId
    })
}














export const findOnePost = async (post)=>{
 return await postModel.findOne({
          _id : post._id
     })
}

export const increementLike = async(id)=>{
   return await postModel.updateOne({_id: id},{ $inc: {likeCount:1}})
   //this format is better than likeCount: likeCount+1 something like that since here we are fetching the likeCount data before updating it
   //in new format we are updating it without fetching it.
}
export const decreementLike = async(id)=>{
   return await postModel.updateOne({_id: id},{$inc: {likeCount:-1}})
}