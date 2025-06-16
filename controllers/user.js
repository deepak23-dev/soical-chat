import { getAllUserPost, getProfilesPost } from "../services/auth.post.service.js";

export const homePage=async(req,res)=>{
    try {
        const data=await getProfilesPost();
        let a=Math.floor(Math.random()*10)+1;
        // console.log("a",a);
        
      
        
       const filterData= data.slice(a>=data.length?0:a,data.length);
       res.render("home.ejs",{filterData});
        //  console.log(filterData);
        
    } catch (error) {
        console.log(error.message);
        
    }
}

export const userProfile=async(req,res)=>{
    try {  
        if(!req.user) return res.redirect("/login");
        // console.log(req.user);
        
        const data=await getAllUserPost({id:req.user.id});
        // console.log("post of all ",data);
        
         res.render("userProfile.ejs",{data});
    } catch (error) {
        console.log(error.message);
        
    }
}