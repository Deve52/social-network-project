import uploadImage from "../services/storage.service.js";
import { createPost, getPostsDao } from "../DAO/post.dao.js";
import {stringify, v4 as v4Id } from "uuid";
import { generateCaption } from "../services/ai.service.js";
import mongoose from "mongoose";



export const uploadPost = async ( req , res )=>{
 
let {mentions}= req.body;

console.log(mentions);
console.log(Array.isArray(mentions));




// mention section validation

// // let mentionParse = JSON.parse(mentions);//doing this is wrong , we should check whether the input is not string or not , when the input is empty it will try to parse that too and the input which are in invalid format
// if(mentions && typeof mentions === "string"){// if mention exist then check if it is string type or not
//    try{
//       console.log(mentions);
//       mentions=  JSON.parse(mentions) // if string then convert it in object type
//       console.log(mentions);

//       // mentions.forEach((id)=>{
//       //   if( !mongoose.Type.ObjectId.isValid(id)){ 
//       //    // return res.status(400).json({
//       //    //    message:"invalid id is passed"
//       //    // })
//       //    console.log(id);
         
//       //   }
//       // })
      
      
//    }catch(err){// if it couldn't convert in object then err
//       return res.status(400).json({
//          message:"invalid mention input"
//       })
//    }
// }else{
//    return res.status(400).json({
//       message:"enter something in mention"
//    })
// }

// console.log("",typeof(""))
// if(mentions || mentions != ""){
//    console.log(mentions , typeof mentions)  //-- pura string format ma att aha 
// try{
//    // ye blank space ko empty string smjega aur parse ke time wo error throw kr dega
//    let mentionData = JSON.parse(mentions) 
// console.log(mentionData, typeof mentionData)  // string se js object format ma convert krta ha

// //input data's (id) verifications
// mentionData.forEach(element => {
//    let valid = mongoose.Types.ObjectId.isValid(element)
   
//    if(!valid ){
//       return res.status(400).json({
//          message:"invalid mention's input"
//       })
//    } 
// });
// }catch(error){
//    return res.status(400).json({
//       message: "mention's validation fail",
//       error:error
//    })
// }
// }



let [file , aiCaption]= await Promise.all([// these both will work simultaneously , saving our time
    uploadImage(req.file.buffer,v4Id())
   , generateCaption(req.file) 
])
   

 if(!file) {
    return res.status(500).json({
         message: "Image upload failed"
         });
    }
    // console.log(req.user.id)
    let userId= req.user._id;// middleware se token ke through jo user mila usma uki id "id" ma save ha na ke "_id" maine he id ma save kiya tha .
    
    let post = await createPost(userId,aiCaption,mentions,file.url)

 res.status(201).json({
    message:"post created",
    post
 })   
    
}

export const getposts = async (req, res)=>{
   let {skip, limit} = req.query;
   let posts = await getPostsDao(skip , limit && limit<=20 ? limit : 20 )

   return res.status(200).json({
      message:"fetched post",
      posts
   })
}