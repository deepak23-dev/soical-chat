import { createSession, deletePreviousSeesion, genrateAccessToken, getUserLogin } from "../services/auth.user.service.js";
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
              // console.log(userExists);
              
              const comparePassowrd=await argon2.verify(userExists.password,password)
            //   console.log(comparePassowrd);
              
              
             if(!userExists) return res.redirect("/login");
        
              if(!comparePassowrd) return res.redirect("/login");
              
               await deletePreviousSeesion(userExists.id);

              const [session]=await createSession(userExists.id,{
                ip:req.clientIp,
                userAgent:req.headers["user-agent"]
              })

              // console.log(session);
              
              const token=genrateAccessToken({
                name:userExists.name,
                email:userExists.email,
                id:userExists.id,
                sessionId:session
            });

            const baseConfig={httpOnly:true,secure:true};

              res.cookie("token",token,{
                ...baseConfig
              });
              res.cookie("access_token",session,{
                ...baseConfig
              })
            //   res.cookie("isLoggedIn", true);
             res.redirect("/profile");
       
           
    } catch (error) {
        console.log(error.message);
        
    }
}

//* logout the user

export const logoutUser=async(req,res)=>{
   
   res.clearCookie('access_token');
  res.clearCookie('token');
  await deletePreviousSeesion(req.user.id)
 return res.redirect("/")
}