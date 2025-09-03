import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import messageRoutes from "./routes/message.route.js"
import {rateLimit} from 'express-rate-limit';
import helmet from 'helmet';

import './Listeners/like.listener.js'  // this tells our application that there is somithing known as  eventlisteners and it has it's own emits(event fire) and ons(event), when you see any calls please direct it to this file
import "./Listeners/comment.listner.js"

let app = express();

let rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    httpStatus: 429,//too many requests
    message: "Too many requests from this IP, please try again after 15 minutes"
})
let authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 30 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: "Too many login attempts from this IP, please try again after 15 minutes"
})

app.use(rateLimiter)  // <-------------- it should be ont the top of middlewares and routes stack so that it can limit the requests before they reach to any route or middleware
app.use(helmet())// it sets some secure headers to protect our app from some well known web vulnerabilities by setting HTTP headers appropriately.
app.use(express.json());
app.use(cookieParser())
app.use("/auth",authLimiter, authRoutes)
app.use("/post", postRoutes)
app.use("/message",messageRoutes)


export default app;