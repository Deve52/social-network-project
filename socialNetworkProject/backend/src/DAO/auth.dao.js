import userModel from "../models/user.model.js";

export const findIfUserIsRegistered = async (username, email) => {
    
    return await userModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    });
}

export const createUser = async (username, email, password) => {
    return await userModel.create({
        username,
        email,
        password // Hashing the password with a salt rounds of 10
    })
}