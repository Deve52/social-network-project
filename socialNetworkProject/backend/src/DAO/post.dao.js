import postModel from '../models/post.model.js';

export const createPost = async (userId, caption, mentions, imageUrl) => {
   return await postModel.create({
        user: userId,
        caption,
        mentions,
        imageUrl
    });  
}