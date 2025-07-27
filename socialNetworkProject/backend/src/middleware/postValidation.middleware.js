//it is used to validate the data that i get in params (specificlly postId)
import mongoose from "mongoose"
export const validatePost = (req,res,next)=>{
   
        let {postId} = req.params
        console.log(postId);
        
    if(!mongoose.Types.ObjectId.isValid(postId))
       { 
        return res.status(400).json({
            message: "Invalid parameter passed in url",
            
        })}
    
    next()    



    //RIDICULOUS
}