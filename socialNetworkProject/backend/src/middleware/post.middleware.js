import { config } from "../dotenv/config.js"
import jwt from "jsonwebtoken";
import { body, param, query, validationResult } from "express-validator";
import mongoose from "mongoose";

//middleware are used before authentication because authencation calls to a database and if validation is failed then authentication gets useless.

export const userMiddleware = (req, res, next) => {


    let token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access"
        });
    }
    try {
        let decoded = jwt.verify(token, config.JWT_SECRET)
        // console.log(decoded)
        req.user = decoded;// request object ma user naam ke field add krde // response object sirf data user ko dikhane ka kaam ata ha
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token, authenticate again",
            error
        });
    }

}

export const getPostsValidator = [

    query("limit")
        .notEmpty()
        .withMessage("empty field")
        .isInt()
        .withMessage("value isn't an integer")
        .custom((value) => {
            return value >= 1 && value <= 20
        })
        .withMessage("limit value exceeds the range"),

    (req, res, next) => {
        let error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({
                error: error.array()
            })
        }
        next()
    }

]

export const validatePost = [
    param("postId")
        .custom((value) => {
            return mongoose.Types.ObjectId.isValid(value)
        })
        .withMessage("not an post Id"),

    (req, res, next) => {
        let error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({
                error: error.array()
            })
        }
        next()
    }

]

// export const mentionValidator = [
    
    
//     //1. sanitize (stringfy to parse).
//     //2. check if it's an array.
//     //3. check the id's inside the array.

//     body('mentions')
//         .custom((data) => {
//             console.log(data);
//             console.log(typeof data)
            
//              let parsedData = data
//             while(typeof parsedData === "string") {
//                 try {
//                      parsedData = JSON.parse(parsedData);
//                 } catch (e) {
//                     break;//if it's not a string type anymore
//                 }
//             }            
//             return parsedData
            
//         })
//         .isArray()
//         .withMessage(" Mentions must be an array ")
//         .custom((parsedData)=>{

//            let check= parsedData.every(id=>mongoose.Types.ObjectId.isValid(id))
//            if(!check){
//             throw new Error("Id in mention is not valid")
//            }
//            return true //if check is true
//         }),

//         (req,res,next)=>{
//             let error = validationResult(req)
//             if(!error.isEmpty()){
//                 return res.status(400).json({
//                     error:error.array()
//                 })
                
         
//             }
//             next()
//         }

// ]

export const commentValidator = [
  param("postId")
  .notEmpty()
  .withMessage("Post ID is not given")
  .custom(id=>mongoose.Types.ObjectId.isValid(id))
  .withMessage("Post Id is not a valid Id"),

  body("parentId")
  .optional()
  .custom(value=>mongoose.Types.ObjectId.isValid(value))
  .withMessage("Given parent ID is invalid."),
  
  body("comment")
  .trim()
  .isLength({min: 1, max:500})
  .withMessage("comment exceeds the length [1-500]")
  .notEmpty()
  .withMessage("comment section is empty"),

  (req,res,next)=>{
    let error = validationResult(req)

    if(!error.isEmpty()){
        return res.status(400).json({
            error: error.array()
        })
    }
    next()
  }
]

export const allCommentsValidator= [
    param("postId")
    .notEmpty()
    .withMessage("post ID is not given")
    .custom(id=>mongoose.Types.ObjectId.isValid(id))
    .withMessage("Post Id is not a valid Id"),

    (req,res,next)=>{
    let error = validationResult(req)

    if(!error.isEmpty()){
        return res.status(400).json({
            error: error.array()
        })
    }
    next()
  }
]

export const repliesCommentsValidator =[
    param("commentId")
    .notEmpty()
    .withMessage("enter the comment id")
    .custom(id=>mongoose.Types.ObjectId.isValid(id))
    .withMessage("The ID is invalid"),

    (req,res,next)=>{
       let error= validationResult(req)
       if(!error.isEmpty()){
        return res.status(400).json({
            error: error.array()
        })
       }
       next()
    }
]
