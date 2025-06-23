import express from 'express';
import {  userMessage } from '../controllers/socket.controller.js';

const router=express.Router();


router.route("/:id/socket")
.get(userMessage)
// .post(storeChatData)
// router.get("/:id/socket",userMessage);



export default router;