import express from "express";
import { userMiddleware } from "../middleware/post.middleware.js";
import { getMessagesController } from "../controllers/message.controller.js";

let router = express.Router();



router.get("/get-messages/:id",userMiddleware, getMessagesController)






export default router