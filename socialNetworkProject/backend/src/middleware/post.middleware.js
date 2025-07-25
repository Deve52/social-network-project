import { config } from "../dotenv/config.js"
import jwt from "jsonwebtoken";

export const userMiddleware= (req, res, next) => {
   
    
    let token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access"
        });
    }
    try{
        let decoded = jwt.verify(token, config.JWT_SECRET)
        // console.log(decoded)
        req.user = decoded;// request object ma user naam ke field add krde // response object sirf data user ko dikhane ka kaam ata ha
        next();

      }catch(error){
        return res.status(401).json({
            message: "Invalid token, authenticate again",
            error
        });
      }

} 

