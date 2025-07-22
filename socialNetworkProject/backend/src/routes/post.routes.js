import express from 'express';
import multer from 'multer';
import { userMiddleware } from "../middleware/post.middleware.js";
import { uploadPost } from '../controllers/post.controller.js';

let upload = multer({storage: multer.memoryStorage()});


const router = express.Router();


// router.post("/upload-post").then(UserMiddleware,upload.single("image"),uploadPost)// this is wrong since .then is only used to write async code not controller or middleware
router.route("/upload-post").post([userMiddleware,upload.single("image")],uploadPost)


export default router;