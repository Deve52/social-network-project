import likesModel from "../models/likes.model.js";
import { createLike, alreadyLikeOrNot, delteLikeObject } from "../DAO/like.dao.js";
import { findOnePost, increementLike, decreementLike, checkPost } from "../DAO/post.dao.js";
import eventEmitter from "../utils/listener.js";

export const likeController = async (req, res) => {

  let { postId } = req.params;
  let userId = req.user._id;

  console.log(postId);
  //checks if post present in db
  let isPostPresent = await checkPost(postId);
  console.log(isPostPresent);

  if (!isPostPresent) {
    return res.status(404).json({
      message: "post not found",
    });
  }





  //like deletion --- > already liked then dislike (delete object of like)

  //like wala schema ma post pr koi like hua ke nahi 
  let isLiked = await alreadyLikeOrNot(userId, postId);// isLiked is an object // it means liked already



  //likeCount increement and decreement !!!

  let post = await findOnePost(isPostPresent)//post found


  // if(isLiked){

  //   // await decreementLike(post._id)

  // }else{
  //   // await increementLike(post._id)
  // }





  if (isLiked) {
    eventEmitter.emit("disliked", post._id)// it takes name and argument

    let dislikedObject = await delteLikeObject(isLiked._id)

    return res.status(200).json({
      message: "post is disliked",
      isLiked,

    })
  }

  eventEmitter.emit("liked", post._id)
  //like creation 
  let like = await createLike({ userId, postId });

  return res.status(201).json({
    message: "you liked this post!",
    like,

  });
};
