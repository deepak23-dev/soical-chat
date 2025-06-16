import { createSession, createUser, genrateAccessToken, getUserByEmail } from "../services/auth.user.service.js";

export const register=(req,res)=>{
    res.render("signup-login.ejs");
}

export const postRegister=async(req,res)=>{
    try {
       const{name,email,password}=req.body;
        
       const userExists=await getUserByEmail(email);

       if(userExists) return res.redirect("/register");

     const [user]=  await createUser({name,email,password});
        
console.log(user);

       const [session]=await createSession(user.id,{
                     ip:req.clientIp,
                     userAgent:req.headers["user-agent"]
                   })
     
                   // console.log(session);
                   
                   const token=genrateAccessToken({
                     name,
                     email,
                     id:user.id,
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

        // res.redirect("/profile");
       
    } catch (error) {
        console.log(error.message);
        
    }
}