import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';

import './Listeners/like.listener.js'  // this tells our application that there is somithing known as  eventlisteners and it has it's own emits and ons, when you see any calls please direct it to this file
import "./Listeners/comment.listner.js"

let app = express();

app.use(express.json());
app.use(cookieParser())
app.use("/auth", authRoutes)
app.use("/post", postRoutes)


export default app;