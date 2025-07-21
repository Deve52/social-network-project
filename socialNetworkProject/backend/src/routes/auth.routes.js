import express from 'express';
import {loginController, registerController} from '../controllers/auth.controller.js';

let router = express.Router();


router.post("/register",registerController);
router.post("/login", loginController);



export default router;