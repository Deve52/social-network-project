import likesModel from "../models/likes.model.js";


export const createLike = async (data) => {
    let { userId, postId } = data;

    return await likesModel.create({
        userId,
        postId
    })
}




export const alreadyLikeOrNot = async (userId, postId)=>{

    return await likesModel.findOne({
      userId,postId
    })
}

export const delteLikeObject = async (id)=>{

    return await likesModel.deleteOne({
        _id: id
    })

}