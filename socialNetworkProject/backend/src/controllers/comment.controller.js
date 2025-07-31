import { createCommentDao , findComments } from "../DAO/comment.dao.js"

export const createCommentController= async(req,res)=>{
    // console.log(req.params);
    
    let {postId} = req.params
    let userId = req.user._id
    let {comment} = req.body

    let postComment = await createCommentDao({postId,userId,comment})

    return res.status(201).json({
        message: "comment added",
        postComment
    })
}

export const getCommentsController = async (req ,res) => {
   
    let {postId} = req.params

    let allComments = await findComments(postId);

    return res.status(200).json({
        message:"post comments are fetched",
        allComments
    })
}