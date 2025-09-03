import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    reciever:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    text:{
        type:String,
        required:true,
    }
},{
    timestamps: true
})

export default mongoose.model("message",messageSchema)