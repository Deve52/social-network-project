import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import userRoutes from "./routes/user.route.js"

let app = express();

app.use(express.json());
app.use(cookieParser())
app.use("/auth", authRoutes)
app.use("/post", postRoutes)
app.use("/user", userRoutes)





export default app;