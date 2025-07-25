import mongoose from "mongoose";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../dotenv/config.js";
import { createUser, findIfUserIsRegistered } from "../DAO/auth.dao.js";

export const registerController = async(req, res) => {

    let {username,email,password }=req.body;

    let user = await findIfUserIsRegistered(username, email); // Check if the user is already registered
    if(user){
        return res.status(400).json({// 400 is for bad request
            message: "User already exists"
        })
    }
    let hashpassword = await bcrypt.hash(password, 10); // Hashing the password with a salt rounds of 10
    let userData = await createUser(username, email, hashpassword); // Create a new user with the hashed password

    let token = jwt.sign({_id:userData._id},config.JWT_SECRET ,{expiresIn: '1h'}); // Creating a JWT token with the user ID and secret key
     res.cookie("token",token,{
        httpOnly:true, // Making the cookie HTTP only to prevent client-side access
        samesite:true, // Preventing CSRF attacks

     })


    return res.status(201).json({
        message: "User registered successfully",
        user: {
            id: userData._id,
            username: userData.username,
            email: userData.email,
            bio: userData.bio,
            profilePic: userData.profilePic
        } ,
        token  
    })

}

export const loginController= async(req, res) => {
     let {username, password} = req.body;

     let user = await findIfUserIsRegistered(username); // Check if the user is registered
        if(!user){
            return res.status(400).json({
                message: "User not found"
            })
        }

        let isPasswordMatch= await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password 
         if(!isPasswordMatch){
            return res.status(400).json({//400 is for bad request
                message: "Invalid credentials",
            })
         }
         
        let token = jwt.sign({_id:user._id},config.JWT_SECRET ,{expiresIn: '1h'}); // Creating a JWT token with the user ID and secret key
        res.cookie("token",token,{
            httpOnly:true, // Making the cookie HTTP only to prevent client-side access
            samesite:true, // Preventing CSRF attacks
        })

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                bio: user.bio,
                profilePic: user.profilePic
            },
            token
        })


}