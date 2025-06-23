import { getAllUserPost, getAllUsersdata, getProfilesPost, postlikedata } from "../services/auth.post.service.js";

export const homePage=async(req,res)=>{
    try {
        const data=await getProfilesPost();
        // const postLikeData=await postlikedata()
        // let a=Math.floor(Math.random()*10)+1;
        // console.log("a",data);
        
    
      
        
       const filterData= data
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

export const getAllUsers=async(req,res)=>{
    try {
        
        if(!req.user) return res.redirect("/login");
        const data=await getAllUsersdata(req.user.id);
        // console.log(data);
        res.render("allusers.ejs",{data})
        
    } catch (error) {
        console.log(error.message);
    }
}