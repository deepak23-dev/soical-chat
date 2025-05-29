import { createUser, getUserByEmail } from "../services/auth.user.service.js";

export const register=(req,res)=>{
    res.render("signup-login.ejs");
}

export const postRegister=async(req,res)=>{
    try {
       const{name,email,password}=req.body;
        
       const userExists=await getUserByEmail(email);

       if(userExists) return res.redirect("/register");

     const [user]=  await createUser({name,email,password});
        
        res.redirect("/profile");
       
    } catch (error) {
        console.log(error.message);
        
    }
}