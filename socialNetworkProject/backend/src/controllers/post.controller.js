import uploadImage from "../services/storage.service.js";
import { createPost } from "../DAO/post.dao.js";
import {v4 as v4Id } from "uuid";


export const uploadPost = async ( req , res )=>{
 
let {mentions,caption}= req.body;

let file = await uploadImage(req.file.buffer,v4Id())

 if(!file) {
    return res.status(500).json({
         message: "Image upload failed"
         });
    }
    // console.log(req.user.id)
    let userId= req.user.id;// middleware se token ke through jo user mila usma uki id "id" ma save ha na ke "_id".
    
    let post = await createPost(userId,caption,mentions,file.url)

 res.status(201).json({
    message:"post created",
    post
 })



    
 

    
    
}