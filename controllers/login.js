import { genrateToken, getUserLogin } from "../services/auth.user.service.js";
import * as argon2 from "argon2";

export const login=(req,res)=>{
    res.render("signup-login.ejs");
}

export const postLogin=async(req,res)=>{
    try {
        // res.setHeader("set-cookie","isLoggedIn=true;path=/;");
        const{email,password}=req.body;
        
        if(!req.body){
            
            return res.redirect("/login")
        }
               
              const userExists=await getUserLogin(email);
            //   console.log(userExists);
              
              const comparePassowrd=await argon2.verify(userExists.password,password)
            //   console.log(comparePassowrd);
              
              
             if(!userExists) return res.redirect("/login");
        
              if(!comparePassowrd) return res.redirect("/login");
              

              const token=genrateToken({
                name:userExists.name,
                email:userExists.email,
                id:userExists.id
            });

              res.cookie("token",token);

            //   res.cookie("isLoggedIn", true);
             res.redirect("/profile");
       
           
    } catch (error) {
        console.log(error.message);
        
    }
}

//* logout the user

export const logoutUser=async(req,res)=>{
  res.clearCookie('token');
 return res.redirect("/")
}