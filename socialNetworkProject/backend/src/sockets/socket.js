import { Server } from "socket.io";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import {config } from "../dotenv/config.js";
import { createMessage } from "../DAO/message.dao.js";


let setupSocket =(server)=>{
    
    let userSocketMap = {};
    let io = new Server(server,{})
    

    io.use((socket,next)=>{
         let cookies = socket.request.headers.cookie;
        //  console.log(token);
         
         let {token}= cookie.parse(cookies || "")// if cookie is undefined then it will parse empty string
         
        if(!token){
            return next(new Error("Authentication error"))
        }

        try{
            let decoded = jwt.verify(token,config.JWT_SECRET);
            socket.user = decoded
           next()

        }catch(err){
            return next(new Error("Authentication error"))
        }         
        
    })
    


    io.on("connection",(socket)=>{
        

        userSocketMap[socket.user._id] = socket.id;// this will store the user id and socket id in the map
        console.log("a user connected", userSocketMap);

        socket.on("message",(msg)=>{

            console.log(msg);

          let {reciever,text} = msg;
          let sender = socket.user._id;

          //   console.log("hey",userSocketMap["6882b56253ca39e47f6c6df4"]);
          
          socket.to(userSocketMap[reciever]).emit("message",text)
          
          createMessage(reciever,sender,text);// store message in db and after that emit to reciever
          
          
        })

        
        socket.on("disconnect",()=>{
            console.log("user disconnected from socket server",socket.id);
        })
    })

}

export default setupSocket;