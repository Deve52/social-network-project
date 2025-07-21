import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        
    },
    bio:{
        type: String,
        trim: true,
        limit: 50,
        default: '',
    },
    profilePic:{
        type: String,
        default: 'https://i.pinimg.com/736x/a3/31/a8/a331a8d0a8ff50827c6cb3437f336a30.jpg',
    },

})

export default mongoose.model("user",userSchema)