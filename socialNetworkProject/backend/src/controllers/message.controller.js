import { getMessages } from "../DAO/message.DAO.js"
export const getMessagesController = async (req,res)=>{
    let {id} = req.params;
    console.log(id);
    
    let userId = req.user._id;
    let {limit , skip} = req.query;

    let data = await getMessages(userId,id,limit,skip)

    return res.status(200).json({
        message: "the messages are fetched",
        data
    })
    
}