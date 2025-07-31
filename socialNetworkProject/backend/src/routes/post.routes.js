import express from 'express';
import multer from 'multer';
import { userMiddleware,getPostsValidator, validatePost, mentionValidator, commentValidator, allCommentsValidator } from "../middleware/post.middleware.js";
import { getposts, uploadPost } from '../controllers/post.controller.js';
import { likeController, allLikeController } from "../controllers/like.controller.js";
import { createCommentController, getCommentsController } from '../controllers/comment.controller.js';


let upload = multer({storage: multer.memoryStorage()});


const router = express.Router();


// router.post("/upload-post").then(UserMiddleware,upload.single("image"),uploadPost)// this is wrong since .then is only used to write async code not controller or middleware
router.route("/upload-post").post([mentionValidator, userMiddleware,upload.single("image")],uploadPost)

router.post("/:postId/like",[userMiddleware,validatePost],likeController)// in this route we are creating some resource with taking post id and it seems we are creating like of any specific post

router.get("/:postId/likes",[userMiddleware,validatePost],allLikeController)//in this we are fetching all likes(userInfo) of any specific post

router.get("/" ,[getPostsValidator, userMiddleware],getposts)

router.post("/:postId/comment",[commentValidator, userMiddleware], createCommentController)

router.get("/:postId/Comments",[allCommentsValidator,userMiddleware],getCommentsController)





export default router;