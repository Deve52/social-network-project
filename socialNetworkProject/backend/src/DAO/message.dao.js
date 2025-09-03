import messageModel from "../models/message.model.js";

export const createMessage = async (reciever, sender, text)=>{
    
    
    return await messageModel.create({
        reciever,
        sender,
        text
    })
} 

export const getMessages = async (senderId,recieverId,limit=10,skip=0)=>{
    return await messageModel.find({
        $or:[
            {
                sender: senderId,
                reciever: recieverId
            },{
                sender: recieverId,
                reciever: senderId
            }
        ]
    })
    .sort({createdAt: -1})//last sent chat pehle dekhaga
    .limit(limit)
    .skip(skip)
}
    