import express from 'express';
import { login, logoutUser, postLogin } from '../controllers/login.js';
import { postRegister, register } from '../controllers/register.js';
import { homePage, userProfile } from '../controllers/user.js';


const router=express.Router();

router.get("/",homePage);

router.route("/login")
.get(login)
.post(postLogin);

router.route("/register")
.get(register)
.post(postRegister);

router.get("/logout",logoutUser)

router.get("/profile",userProfile)

export default router;